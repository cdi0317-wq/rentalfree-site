import Link from "next/link";
import { brandLabels } from "@/app/data/site";

interface BrandTabsProps {
  category: string;
  brands: readonly string[];
  currentBrand?: string;
}

export default function BrandTabs({
  category,
  brands,
  currentBrand,
}: BrandTabsProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <Link
        href={`/${category}`}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          !currentBrand
            ? "bg-blue-600 text-white"
            : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
        }`}
      >
        전체
      </Link>

      {brands.map((brand) => (
        <Link
          key={brand}
          href={`/${category}/${brand}`}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            currentBrand === brand
              ? "bg-blue-600 text-white"
              : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
          }`}
        >
          {brandLabels[brand as keyof typeof brandLabels]}
        </Link>
      ))}
    </div>
  );
}