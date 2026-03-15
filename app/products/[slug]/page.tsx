import { products } from "@/app/data/products";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return notFound();
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item.slug !== product.slug &&
        (item.category === product.category || item.brand === product.brand)
    )
    .slice(0, 3);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}