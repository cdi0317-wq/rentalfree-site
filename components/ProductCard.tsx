import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/data/products";
import { brandLabels, categoryLabels } from "@/app/data/site";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-neutral-900 p-4 shadow-sm">
      <Link href={`/products/${product.slug}`}>
        <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-white">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        </div>
      </Link>

      <p className="text-sm text-gray-400">
        {categoryLabels[product.category]} / {brandLabels[product.brand]}
      </p>

      <h3 className="mt-2 text-lg font-bold text-white">{product.name}</h3>

      <p className="mt-1 text-sm text-gray-300">모델명: {product.modelCode}</p>

      {product.price && (
        <p className="mt-3 text-lg font-semibold text-blue-400">
          {product.price}
        </p>
      )}

      <div className="mt-5 flex gap-2">
        <Link
          href={`/products/${product.slug}`}
          className="flex-1 rounded-xl border border-gray-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-white/10"
        >
          제품 보기
        </Link>

        <Link
          href={`/contact?product=${encodeURIComponent(product.name)}`}
          className="flex-1 rounded-xl bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
        >
          상담문의
        </Link>
      </div>
    </div>
  );
}