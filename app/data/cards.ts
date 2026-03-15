export interface CardDiscountTier {
  condition: string;
  amount: number;
}

export interface CardBenefit {
  id: string;
  name: string;
  company: string;
  discounts: CardDiscountTier[];
  brands: string[];
  image: string;
  link: string;
}

export const cardBenefits: CardBenefit[] = [
  {
    id: "card-1",
    name: "코웨이 렌탈 제휴카드",
    company: "롯데카드",
    discounts: [
      { condition: "전월 실적 30만원 이상", amount: 13000 },
      { condition: "전월 실적 70만원 이상", amount: 17000 },
      { condition: "전월 실적 120만원 이상", amount: 20000 },
    ],
    brands: ["coway"],
    image: "/images/cards/coway-card.png",
    link: "#",
  },
  {
    id: "card-2",
    name: "쿠쿠 렌탈 제휴카드",
    company: "하나카드",
    discounts: [
      { condition: "전월 실적 30만원 이상", amount: 12000 },
      { condition: "전월 실적 70만원 이상", amount: 15000 },
      { condition: "전월 실적 120만원 이상", amount: 17000 },
    ],
    brands: ["cuckoo"],
    image: "/images/cards/cuckoo-card.png",
    link: "#",
  },
  {
    id: "card-3",
    name: "LG 렌탈 제휴카드",
    company: "우리카드",
    discounts: [
      { condition: "전월 실적 30만원 이상", amount: 10000 },
      { condition: "전월 실적 70만원 이상", amount: 13000 },
      { condition: "전월 실적 120만원 이상", amount: 15000 },
    ],
    brands: ["lg"],
    image: "/images/cards/lg-card.png",
    link: "#",
  },
];