import Link from 'next/link';
import { Product } from '@/types/product';
import { RenderStars } from '../common/RenderStars';
import Image from 'next/image';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { id, image, title, price, rating } = product;
  const truncatedTitle = title.length > 35 ? `${title.slice(0, 35)}...` : title;

  return (
    <Link href={`/product/${id}`} aria-label={`View details for ${title}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg cursor-pointer transition">
        <Image
          src={image}
          alt={title}
          width={300} 
          height={192} 
          className="w-full h-48 object-contain rounded mb-2"
          style={{ objectFit: 'contain' }}
        />

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
          <div className="flex">{RenderStars(rating?.rate ?? 0)}</div>
          <span>({rating?.count ?? 0} reviews)</span>
        </div>

        <h3 className="text-md font-semibold">{truncatedTitle}</h3>
        <p className="text-blue-700 font-medium">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
