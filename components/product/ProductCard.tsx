import Link from 'next/link';
import { Product } from '../../types/product';
import { RenderStars } from '../renderStars';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg cursor-pointer transition">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover rounded"
        />
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex">{RenderStars(product?.rating?.rate ?? 0)}</div>
          <div className="text-sm text-gray-600">({product?.rating?.count ?? 0} reviews)</div>
        </div>
        {product.title.length > 35 ? product.title.slice(0, 35) + '...' : product.title}
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
