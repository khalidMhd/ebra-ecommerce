import { fetchProductById } from "@/lib/api";
import ProductDetail from "@/components/product/ProductDetail";

type ProductDetailPageProps = {
  params: { id: string };
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  try {
    const product = await fetchProductById(params.id);

    if (!product) {
      return <div className="p-8">Product not found</div>;
    }

    console.log(product);
    

    return <ProductDetail product={product} />;
  } catch (error) {
    console.error("Error loading product details:", error);
    return (
      <div className="p-8 text-red-600">
        Failed to load product details.
      </div>
    );
  }
}
