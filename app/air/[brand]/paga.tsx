import { products } from "../../data/products";

const brandNameMap: Record<string, string> = {
  coway: "코웨이",
  cuckoo: "쿠쿠",
  lg: "LG",
  skmagic: "SK매직",
  chungho: "청호",
  hyundai: "현대",
};

function getDefaultImage(product: (typeof products)[0]) {
const colors = product.colors ?? {};

const colorOrder = ["화이트", "그레이", "핑크", "블루", "베이지", "실버", "브라운", "기본"];

const firstColor =
  colorOrder.find((color) => colors[color as keyof typeof colors]) ||
  Object.keys(colors)[0];

const images = colors[firstColor as keyof typeof colors];  return images?.[0] || "";
}

function getDefaultPrice(product: (typeof products)[0]) {
  const pricing = product.pricing;

  if (!pricing) return "상담문의";

  const functionKeys = Object.keys(pricing);
  const firstFunction = functionKeys[0];
  if (!firstFunction) return "상담문의";

  const careTypes = pricing[firstFunction];
  const firstCare = Object.keys(careTypes)[0];
  if (!firstCare) return "상담문의";

  const contracts = careTypes[firstCare];
  const contractOrder = ["84개월", "72개월", "60개월", "48개월", "36개월", "6년", "5년", "3년"];

  const firstContract =
    contractOrder.find((item) => contracts[item as keyof typeof contracts] != null) ||
    Object.keys(contracts)[0];

  if (!firstContract) return "상담문의";

  const priceData = contracts[firstContract as keyof typeof contracts];
  if (!priceData) return "상담문의";

  const price =
    typeof priceData === "number"
      ? priceData
      : "price" in priceData
      ? priceData.price
      : 0;

  return price ? `월 ${price.toLocaleString()}원` : "상담문의";
}
export default async function AirBrandPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;
  const brandName = brandNameMap[brand] || "";

  const filteredProducts = products.filter(
    (product) => product.category === "공기청정기" && product.brand === brandName
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-3xl border bg-white p-10 shadow-sm">
        <p className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          AIR BRAND
        </p>

        <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">
          {brandName} 공기청정기
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          {brandName} 공기청정기 제품 목록입니다. 모델별 렌탈료와 상세 내용을 확인하세요.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <div className="absolute left-4 top-4 z-10 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
                  {product.brand}
                </div>
                <img
                  src={getDefaultImage(product)}
                  alt={product.name}
                  className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <p className="text-sm text-slate-500">{product.category}</p>
                <h3 className="mt-2 line-clamp-2 min-h-[56px] text-xl font-bold">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-slate-500">{product.model}</p>

                <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">기본 렌탈료</p>
                  <p className="mt-1 text-2xl font-extrabold text-green-600">
                    {getDefaultPrice(product)}
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <a
                    href={`/products/${product.slug}`}
                    className="rounded-xl border px-4 py-3 text-center text-sm font-semibold"
                  >
                    상세보기
                  </a>
                  <a
                    href="/support"
                    className="rounded-xl bg-green-500 px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    상담문의
                  </a>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-2xl border bg-white p-8 text-slate-600">
            현재 등록된 {brandName} 공기청정기 제품이 없습니다.
          </div>
        )}
      </div>
    </main>
  );
}
