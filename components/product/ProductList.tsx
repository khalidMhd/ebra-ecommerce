'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/api/fakeStore';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { useFilterStore } from '@/store/filter';
import SortDropdown from '../common/SortDropdown';
import { sortOptions } from '@/utils/helper';
import Loader from '../common/Loader';

export default function ProductList() {
  const { selectedCategory, selectedPriceRanges } = useFilterStore();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>('default');

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const products = await fetchProducts();
        setAllProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) return;

    const priceInRanges = (price: number): boolean => {
      if (!selectedPriceRanges.length) return true;

      return selectedPriceRanges.some((range) => {
        const [min, max] = range === '400+' ? [400, Infinity] : range.split('-').map(Number);
        return price >= min && price <= max;
      });
    };

    let filtered = allProducts.filter((product) => {
      const categoryMatch = selectedCategory
        ? product.category?.toLowerCase() === selectedCategory.toLowerCase()
        : true;
      const priceMatch = priceInRanges(product.price);
      return categoryMatch && priceMatch;
    });

    switch (sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedPriceRanges, allProducts, sortBy]);

  if (loading) return <Loader />;

  return (
    <div className="w-full md:w-3/4 px-4 sm:px-6 lg:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-2xl font-semibold capitalize">
          {selectedCategory || 'All Products'}
        </h2>
        <SortDropdown
          sortBy={sortBy}
          setSortBy={setSortBy}
          options={sortOptions}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
