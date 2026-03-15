export type ProductCategory =
  | "water"
  | "air"
  | "bidet"
  | "mattress"
  | "appliance";

export type ProductBrand =
  | "coway"
  | "cuckoo"
  | "lg"
  | "skmagic"
  | "chungho"
  | "hyundai";

export interface ProductFunctionOption {
  code: string;
  label: string;
  modelCode: string;
  functionTags: string[];
  colors?: string[];
}

export interface ProductOptionValue {
  code: string;
  label: string;
  colorHex?: string;
}

export interface ProductOptionGroup {
  key: string;
  label: string;
  type: "button" | "color";
  values: ProductOptionValue[];
}

export interface ProductPriceRule {
  functionType?: string;
  color?: string;
  size?: string;
  managementType?: string;
  contractYears?: string;
  promotion?: string;
  price: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  brand: ProductBrand;

  image: string;
  baseImagePath?: string;
  imageModelCode?: string;

  // 목록/카드/기본 표시용
  modelCode?: string;
  price?: string;
  features?: string[];
  colors?: string[];

  description?: string;
  size?: string;
  managementType?: string;
  installType?: string;

  detailImage?: string;
  specImage?: string;

  functionOptions?: ProductFunctionOption[];
  optionGroups?: ProductOptionGroup[];
  priceRules?: ProductPriceRule[];

  isRecommended?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "코웨이 아이콘 정수기",
    slug: "coway-icon-water-1",
    category: "water",
    brand: "coway",

    image: "/images/coway/CHP-7211N_WT1.png",
    baseImagePath: "/images/coway",
    imageModelCode: "CHP-7211N",

    modelCode: "CHP-7211N",
    price: "월 31,900원",
    features: ["냉수", "온수", "정수"],
    colors: ["WT", "PK", "BU", "BG", "GR", "SL"],

    description: "슬림한 디자인과 편리한 사용성을 갖춘 코웨이 아이콘 정수기입니다.",
    size: "160 x 368 x 385 mm",
    managementType: "자가관리 / 방문관리",
    installType: "데스크탑",

    detailImage: "/images/products/coway-icon-water-1/CHP-7220N_01.jpg",
    specImage: "/images/products/coway-icon-water-1/CHP-7220N_spec.jpg",

    functionOptions: [
      {
        code: "cp7211",
        label: "냉정수기",
        modelCode: "CP-7211N",
        functionTags: ["냉수", "정수"],
        colors: ["WT", "PK", "BU", "BG", "GR", "SL"],
      },
      {
        code: "chp7211",
        label: "냉온정수기",
        modelCode: "CHP-7211N",
        functionTags: ["냉수", "온수", "정수"],
        colors: ["WT", "PK", "BU", "BG", "GR", "SL"],
      },
    ],

    optionGroups: [
      {
        key: "color",
        label: "색상",
        type: "color",
        values: [
          { code: "WT", label: "화이트", colorHex: "#f2f2f2" },
          { code: "PK", label: "블룸 핑크", colorHex: "#e7d3d1" },
          { code: "BU", label: "씨엘블루", colorHex: "#dce8ef" },
          { code: "BG", label: "크림 베이지", colorHex: "#d7c9bf" },
          { code: "GR", label: "그레이", colorHex: "#8e8e8e" },
          { code: "SL", label: "실버", colorHex: "#d9d9d9" },
        ],
      },
      {
        key: "managementType",
        label: "관리유형",
        type: "button",
        values: [
          { code: "self", label: "자가관리" },
          { code: "visit", label: "방문관리" },
        ],
      },
      {
        key: "contractYears",
        label: "약정기간",
        type: "button",
        values: [
          { code: "7", label: "7년 약정" },
          { code: "6", label: "6년 약정" },
          { code: "5", label: "5년 약정" },
          { code: "3", label: "3년 약정" },
        ],
      },
      {
        key: "promotion",
        label: "프로모션",
        type: "button",
        values: [
          { code: "none", label: "프로모션 없음" },
          { code: "half12", label: "12개월 반값" },
          { code: "gift", label: "사은품 증정" },
        ],
      },
    ],

    // 규칙은 "가장 구체적인 조건"이 우선 적용됩니다.
    // promotion 조건이 없는 기본 규칙도 같이 넣어두면, 프로모션을 선택해도
    // 해당 조합 전용 가격이 없을 때 기본 가격으로 fallback 됩니다.
    priceRules: [
      // 냉정수기 CP-7211N
      { functionType: "cp7211", managementType: "self", contractYears: "7", price: "월 28,900원" },
      { functionType: "cp7211", managementType: "visit", contractYears: "7", price: "월 30,900원" },
      { functionType: "cp7211", managementType: "self", contractYears: "6", price: "월 30,900원" },
      { functionType: "cp7211", managementType: "visit", contractYears: "6", price: "월 32,900원" },
      { functionType: "cp7211", managementType: "self", contractYears: "5", price: "월 33,900원" },
      { functionType: "cp7211", managementType: "visit", contractYears: "5", price: "월 35,900원" },
      { functionType: "cp7211", managementType: "self", contractYears: "3", price: "월 38,900원" },
      { functionType: "cp7211", managementType: "visit", contractYears: "3", price: "월 40,900원" },

      // 냉온정수기 CHP-7211N
      { functionType: "chp7211", managementType: "self", contractYears: "7", price: "월 31,900원" },
      { functionType: "chp7211", managementType: "visit", contractYears: "7", price: "월 33,900원" },
      { functionType: "chp7211", managementType: "self", contractYears: "6", price: "월 33,900원" },
      { functionType: "chp7211", managementType: "visit", contractYears: "6", price: "월 35,900원" },
      { functionType: "chp7211", managementType: "self", contractYears: "5", price: "월 36,900원" },
      { functionType: "chp7211", managementType: "visit", contractYears: "5", price: "월 38,900원" },
      { functionType: "chp7211", managementType: "self", contractYears: "3", price: "월 41,900원" },
      { functionType: "chp7211", managementType: "visit", contractYears: "3", price: "월 43,900원" },

      // 프로모션 예시: 12개월 반값
      { functionType: "cp7211", managementType: "self", contractYears: "7", promotion: "half12", price: "월 26,900원" },
      { functionType: "cp7211", managementType: "visit", contractYears: "7", promotion: "half12", price: "월 28,900원" },
      { functionType: "chp7211", managementType: "self", contractYears: "7", promotion: "half12", price: "월 29,900원" },
      { functionType: "chp7211", managementType: "visit", contractYears: "7", promotion: "half12", price: "월 31,900원" },
    ],

    isRecommended: true,
  },

  {
    id: "2",
    name: "코웨이 정수기 플러스",
    slug: "coway-water-plus",
    category: "water",
    brand: "coway",
    image: "/images/coway/CHP-7211N_WT1.png",
    modelCode: "CHP-8000",
    price: "월 29,900원",
    description: "코웨이 인기 정수기 모델",
    features: ["냉수", "온수", "정수"],
    size: "190 x 400 x 350 mm",
    managementType: "방문관리",
    installType: "스탠드형",
    isRecommended: true,
  },

  {
    id: "3",
    name: "코웨이 스마트 정수기",
    slug: "coway-smart-water",
    category: "water",
    brand: "coway",
    image: "/images/coway/CHP-7211N_WT1.png",
    modelCode: "CHP-9000",
    price: "월 27,900원",
    description: "스마트 기능이 추가된 정수기",
    features: ["냉수", "온수", "정수"],
    size: "175 x 370 x 330 mm",
    managementType: "자가관리",
    installType: "데스크형",
    isRecommended: true,
  },
];