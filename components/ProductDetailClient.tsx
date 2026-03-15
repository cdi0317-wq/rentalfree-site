"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Product,
  ProductOptionGroup,
  ProductPriceRule,
} from "@/app/data/products";
import { brandLabels, categoryLabels } from "@/app/data/site";
import ProductGrid from "@/components/ProductGrid";
import { cardBenefits } from "@/app/data/cards";
import { formatPrice, parsePriceToNumber } from "@/lib/price";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

type SelectedOptions = Record<string, string>;

function getDefaultSelections(product: Product): SelectedOptions {
  const defaults: SelectedOptions = {};

  if (product.functionOptions?.length) {
    defaults.functionType = product.functionOptions[0].code;
  }

  product.optionGroups?.forEach((group) => {
    if (group.values.length > 0) {
      defaults[group.key] = group.values[0].code;
    }
  });

  return defaults;
}

function getRuleSpecificity(rule: ProductPriceRule) {
  return Object.entries(rule).filter(
    ([key, value]) => key !== "price" && value !== undefined
  ).length;
}

function ruleMatches(rule: ProductPriceRule, selections: SelectedOptions) {
  return Object.entries(rule).every(([key, value]) => {
    if (key === "price" || value === undefined) return true;
    return selections[key] === value;
  });
}

function getSelectedLabel(
  optionGroups: ProductOptionGroup[] | undefined,
  key: string,
  code: string | undefined
) {
  if (!code) return "";
  const group = optionGroups?.find((item) => item.key === key);
  const value = group?.values.find((item) => item.code === code);
  return value?.label ?? code;
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(
    getDefaultSelections(product)
  );

  const selectedFunction = useMemo(() => {
    if (!product.functionOptions?.length) return null;

    return (
      product.functionOptions.find(
        (option) => option.code === selectedOptions.functionType
      ) ?? product.functionOptions[0]
    );
  }, [product.functionOptions, selectedOptions.functionType]);

  const colorGroup = product.optionGroups?.find((group) => group.key === "color");

  const availableColorCodes = selectedFunction?.colors ?? product.colors ?? [];
  const availableColorValues =
    colorGroup?.values.filter((value) => availableColorCodes.includes(value.code)) ??
    [];

  useEffect(() => {
    if (!colorGroup) return;

    const currentColor = selectedOptions.color;
    const isValid = availableColorValues.some((item) => item.code === currentColor);

    if (!isValid && availableColorValues.length > 0) {
      setSelectedOptions((prev) => ({
        ...prev,
        color: availableColorValues[0].code,
      }));
    }
  }, [colorGroup, availableColorValues, selectedOptions.color]);

  const currentModelCode = selectedFunction?.modelCode ?? product.modelCode;
  const currentFunctionTags = selectedFunction?.functionTags ?? product.features ?? [];

  const currentImage = useMemo(() => {
  const selectedColor = selectedOptions.color;
  const imageCode = product.imageModelCode;

  if (product.baseImagePath && imageCode && selectedColor) {
    return `${product.baseImagePath}/${imageCode}_${selectedColor}1.png`;
  }

  return product.image;
}, [
  product.baseImagePath,
  product.image,
  product.imageModelCode,
  selectedOptions.color,
]);

  const matchedRule = useMemo(() => {
    if (!product.priceRules?.length) return null;

    const candidates = product.priceRules
      .filter((rule) => ruleMatches(rule, selectedOptions))
      .sort((a, b) => getRuleSpecificity(b) - getRuleSpecificity(a));

    return candidates[0] ?? null;
  }, [product.priceRules, selectedOptions]);

  const currentPrice = matchedRule?.price ?? product.price;

  const matchedCards = cardBenefits.filter((card) =>
    card.brands.includes(product.brand)
  );

  const basePrice = parsePriceToNumber(currentPrice);
  const bestCard = matchedCards[0];
  const minimumTier = bestCard?.discounts[0];

  const discountedPrice =
    basePrice !== null && minimumTier
      ? Math.max(basePrice - minimumTier.amount, 0)
      : null;

  const selectedColorLabel = getSelectedLabel(
    product.optionGroups,
    "color",
    selectedOptions.color
  );

  const selectedManagementLabel = getSelectedLabel(
    product.optionGroups,
    "managementType",
    selectedOptions.managementType
  );

  const selectedContractLabel = getSelectedLabel(
    product.optionGroups,
    "contractYears",
    selectedOptions.contractYears
  );

  const selectedPromotionLabel = getSelectedLabel(
    product.optionGroups,
    "promotion",
    selectedOptions.promotion
  );

  const selectedSizeLabel = getSelectedLabel(
    product.optionGroups,
    "size",
    selectedOptions.size
  );

  const inquiryParts = [
    product.name,
    selectedFunction?.label,
    selectedSizeLabel,
    selectedColorLabel,
    selectedManagementLabel,
    selectedContractLabel,
    selectedPromotionLabel && selectedPromotionLabel !== "프로모션 없음"
      ? selectedPromotionLabel
      : "",
  ].filter(Boolean);

  const inquiryProductName = inquiryParts.join(" / ");

  const functionBadgeColors: Record<string, string> = {
    온수: "bg-pink-500 text-white",
    냉수: "bg-sky-500 text-white",
    정수: "bg-gray-500 text-white",
  };

  const renderOptionGroup = (group: ProductOptionGroup) => {
    if (group.key === "color") return null;

    return (
      <div
        key={group.key}
        className="mt-6 rounded-2xl border border-gray-800 bg-neutral-900 p-5"
      >
        <h2 className="mb-3 font-semibold text-white">{group.label}</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {group.values.map((value) => {
            const isActive = selectedOptions[group.key] === value.code;

            return (
              <button
                key={`${group.key}-${value.code}`}
                type="button"
                onClick={() =>
                  setSelectedOptions((prev) => ({
                    ...prev,
                    [group.key]: value.code,
                  }))
                }
                className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-blue-500 bg-blue-600 text-white"
                    : "border-gray-600 bg-neutral-950 text-gray-200 hover:bg-neutral-800"
                }`}
              >
                {value.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <div className="relative aspect-square rounded-2xl bg-white">
            <Image
              src={currentImage}
              alt={product.name}
              fill
              className="object-contain p-8"
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-300">
            {categoryLabels[product.category]} / {brandLabels[product.brand]}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">{product.name}</h1>

          <p className="mt-4 text-gray-300">
            모델명 : {currentModelCode ?? "-"}
          </p>

          {currentPrice && (
            <p className="mt-4 text-xl font-semibold text-blue-400">
              {currentPrice}
            </p>
          )}

          {discountedPrice !== null && minimumTier && bestCard && (
            <div className="mt-4 rounded-2xl border border-blue-700 bg-blue-950/40 p-4">
              <p className="text-sm text-blue-200">제휴카드 사용 시</p>
              <p className="mt-1 text-2xl font-bold text-white">
                월 {formatPrice(discountedPrice)}
              </p>
              <p className="mt-2 text-sm text-gray-300">
                {bestCard.name} · {minimumTier.condition}
              </p>
            </div>
          )}

          {product.description && (
            <p className="mt-4 text-gray-200">{product.description}</p>
          )}

          {product.functionOptions && product.functionOptions.length > 0 && (
            <div className="mt-8 rounded-2xl border border-gray-800 bg-neutral-900 p-5">
              <h2 className="mb-3 font-semibold text-white">기능 선택</h2>

              <div className="flex flex-wrap gap-3">
                {product.functionOptions.map((option) => {
                  const isActive = selectedOptions.functionType === option.code;

                  return (
                    <button
                      key={option.code}
                      type="button"
                      onClick={() =>
                        setSelectedOptions((prev) => ({
                          ...prev,
                          functionType: option.code,
                        }))
                      }
                      className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                        isActive
                          ? "border-blue-500 bg-blue-600 text-white"
                          : "border-gray-600 bg-neutral-950 text-gray-200 hover:bg-neutral-800"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              {currentFunctionTags.length > 0 && (
                <div className="mt-5">
                  <p className="mb-3 text-sm text-gray-400">기능</p>
                  <div className="flex flex-wrap gap-2">
                    {currentFunctionTags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${
                          functionBadgeColors[tag] ?? "bg-neutral-700 text-white"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {colorGroup && availableColorValues.length > 0 && (
            <div className="mt-6 rounded-2xl border border-gray-800 bg-neutral-900 p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="font-semibold text-white">색상</h2>
                <span className="text-sm font-medium text-white">
                  {selectedColorLabel}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {availableColorValues.map((color) => {
                  const isActive = selectedOptions.color === color.code;

                  return (
                    <button
                      key={color.code}
                      type="button"
                      onClick={() =>
                        setSelectedOptions((prev) => ({
                          ...prev,
                          color: color.code,
                        }))
                      }
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                        isActive ? "border-sky-400" : "border-gray-500"
                      }`}
                      title={color.label}
                    >
                      <span
                        className="h-7 w-7 rounded-full"
                        style={{ backgroundColor: color.colorHex ?? "#ddd" }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {product.optionGroups
            ?.filter((group) => group.key !== "color")
            .map(renderOptionGroup)}

          {(product.size || product.managementType || product.installType) && (
            <div className="mt-6 rounded-2xl border border-gray-800 bg-neutral-900 p-5">
              <h2 className="mb-4 font-semibold text-white">제품 정보</h2>

              <div className="space-y-3">
                {product.size && (
                  <div className="flex items-start justify-between gap-4 border-b border-gray-800 pb-3">
                    <span className="text-sm text-gray-400">크기</span>
                    <span className="text-right text-sm font-medium text-white">
                      {product.size}
                    </span>
                  </div>
                )}

                {product.managementType && (
                  <div className="flex items-start justify-between gap-4 border-b border-gray-800 pb-3">
                    <span className="text-sm text-gray-400">관리방식</span>
                    <span className="text-right text-sm font-medium text-white">
                      {product.managementType}
                    </span>
                  </div>
                )}

                {product.installType && (
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm text-gray-400">설치형태</span>
                    <span className="text-right text-sm font-medium text-white">
                      {product.installType}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedPromotionLabel && selectedPromotionLabel !== "프로모션 없음" && (
            <div className="mt-6 rounded-2xl border border-pink-500/40 bg-pink-500/10 p-4">
              <p className="text-sm text-pink-200">선택한 프로모션</p>
              <p className="mt-1 text-lg font-bold text-white">
                {selectedPromotionLabel}
              </p>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <Link
              href={`/contact?product=${encodeURIComponent(inquiryProductName)}`}
              className="flex-1 rounded-xl bg-blue-600 px-6 py-3 text-center font-medium text-white hover:bg-blue-700"
            >
              상담 문의
            </Link>

            <Link
              href={`/${product.category}`}
              className="flex-1 rounded-xl border border-gray-500 px-6 py-3 text-center font-medium text-white hover:bg-white/10"
            >
              제품 목록
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-20 border-t border-gray-800 pt-10">
        <h2 className="mb-6 text-2xl font-bold text-white">제품 상세 정보</h2>

        <div className="space-y-4 leading-relaxed text-gray-300">
          <p>
            {product.name}는 세련된 디자인과 편리한 사용성을 갖춘 렌탈 제품입니다.
          </p>
          <p>
            렌탈프리를 통해 상담을 신청하시면 제품 특징, 렌탈 조건, 혜택 등을
            빠르게 안내받으실 수 있습니다.
          </p>
        </div>
      </section>

      {product.detailImage && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-white">제품 상세 설명</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-800 bg-white">
            <img
              src={product.detailImage}
              alt={`${product.name} 상세 설명`}
              className="w-full"
            />
          </div>
        </section>
      )}

      {product.specImage && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-white">상세 스펙</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-800 bg-white">
            <img
              src={product.specImage}
              alt={`${product.name} 상세 스펙`}
              className="w-full"
            />
          </div>
        </section>
      )}

      {matchedCards.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-white">제휴카드 혜택</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {matchedCards.map((card) => (
              <div
                key={card.id}
                className="rounded-2xl border border-gray-800 bg-neutral-900 p-5"
              >
                <p className="text-sm text-gray-400">{card.company}</p>
                <h3 className="mt-2 text-xl font-bold text-white">
                  {card.name}
                </h3>

                <div className="mt-4 space-y-2">
                  {card.discounts.map((discount) => (
                    <div
                      key={`${card.id}-${discount.condition}`}
                      className="rounded-xl bg-black/30 px-4 py-3"
                    >
                      <p className="text-sm text-gray-300">
                        {discount.condition}
                      </p>
                      <p className="mt-1 text-base font-semibold text-blue-400">
                        월 {formatPrice(discount.amount)} 할인
                      </p>

                      {basePrice !== null && (
                        <p className="mt-1 text-sm text-gray-400">
                          적용 시 예상 월요금:{" "}
                          <span className="font-semibold text-white">
                            {formatPrice(
                              Math.max(basePrice - discount.amount, 0)
                            )}
                          </span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <a
                  href={card.link}
                  className="mt-4 inline-block rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  카드 보기
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-white">추천 제품</h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </main>
  );
}