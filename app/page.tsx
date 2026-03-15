import Link from "next/link";
import { products } from "@/app/data/products";
import ProductGrid from "@/components/ProductGrid";

export default function HomePage() {
  const recommendedProducts = products.filter((product) => product.isRecommended);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="mb-12 rounded-3xl bg-neutral-900 px-6 py-12 text-white">
        <p className="text-sm text-blue-400">렌탈프리</p>
        <h1 className="mt-3 text-4xl font-bold">렌탈프리 추천 렌탈 제품</h1>
        <p className="mt-4 max-w-2xl text-gray-300">
          정수기, 공기청정기, 비데, 매트리스, 가전까지
          다양한 렌탈 제품을 쉽고 빠르게 비교해보세요.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/water"
            className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            정수기 보기
          </Link>

          <Link
            href="/contact"
            className="rounded-xl border border-gray-600 px-5 py-3 font-medium text-white hover:bg-white/10"
          >
            상담 문의
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">추천 제품</h2>
        </div>

        <ProductGrid products={recommendedProducts} />
      </section>
    </main>
  );
}