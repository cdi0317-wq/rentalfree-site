import { products } from "@/app/data/products";
import { categoryBrandMap, categoryLabels } from "@/app/data/site";
import BrandTabs from "@/components/BrandTabs";
import ProductGrid from "@/components/ProductGrid";

export default function WaterPage() {
  const waterProducts = products.filter((product) => product.category === "water");

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-3 text-3xl font-bold text-white">
        {categoryLabels.water}
      </h1>

      <p className="mb-8 text-gray-300">
        렌탈프리의 다양한 정수기 제품을 확인해보세요.
      </p>

      <BrandTabs category="water" brands={categoryBrandMap.water} />

      <ProductGrid products={waterProducts} />
    </main>
  );
}