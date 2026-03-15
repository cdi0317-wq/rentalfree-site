import { cardBenefits } from "@/app/data/cards";
import { formatPrice } from "@/lib/price";

export default function CardsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="mb-10">
        <p className="text-sm text-blue-400">렌탈프리</p>
        <h1 className="mt-2 text-3xl font-bold text-white">제휴카드 혜택</h1>
        <p className="mt-3 text-gray-300">
          브랜드별 제휴카드 할인 혜택을 확인해보세요. 실제 할인 금액은 카드사 정책,
          전월 실적, 프로모션 조건에 따라 달라질 수 있습니다.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cardBenefits.map((card) => (
          <div
            key={card.id}
            className="rounded-2xl border border-gray-800 bg-neutral-900 p-6"
          >
            <p className="text-sm text-gray-400">{card.company}</p>

            <h2 className="mt-2 text-xl font-bold text-white">
              {card.name}
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {card.brands.map((brand) => (
                <span
                  key={`${card.id}-${brand}`}
                  className="rounded-full bg-blue-600/20 px-3 py-1 text-xs font-medium text-blue-300"
                >
                  {brand}
                </span>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              {card.discounts.map((discount) => (
                <div
                  key={`${card.id}-${discount.condition}`}
                  className="rounded-xl bg-black/30 px-4 py-3"
                >
                  <p className="text-sm text-gray-300">{discount.condition}</p>
                  <p className="mt-1 text-base font-semibold text-blue-400">
                    월 {formatPrice(discount.amount)} 할인
                  </p>
                </div>
              ))}
            </div>

            <a
              href={card.link}
              className="mt-5 inline-block rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              카드 자세히 보기
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}