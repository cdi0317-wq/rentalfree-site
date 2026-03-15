import { notFound } from "next/navigation";
import { products } from "@/app/data/products";
import { brandLabels, categoryBrandMap, categoryLabels } from "@/app/data/site";
import BrandTabs from "@/components/BrandTabs";
import ProductGrid from "@/components/ProductGrid";

export default async function WaterBrandPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;

  const validBrands = categoryBrandMap.water;

  if (!validBrands.includes(brand as (typeof validBrands)[number])) {
    return notFound();
  }

  const filteredProducts = products.filter(
    (product) => product.category === "water" && product.brand === brand
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-3 text-3xl font-bold text-white">
        {categoryLabels.water} / {brandLabels[brand as keyof typeof brandLabels]}
      </h1>

      <p className="mb-8 text-gray-300">
        {brandLabels[brand as keyof typeof brandLabels]} 브랜드 제품 목록입니다.
      </p>

      <BrandTabs
        category="water"
        brands={categoryBrandMap.water}
        currentBrand={brand}
      />

      <ProductGrid products={filteredProducts} />
    </main>
  );
}