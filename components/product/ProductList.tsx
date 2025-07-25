'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/api';
import { Product } from '../../types/product';
import ProductCard from './ProductCard';
import { useFilterStore } from '@/store/filter';
import SortDropdown from '.././SortDropdown';

const SORT_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating', value: 'rating' },
];

export default function ProductList() {
  const selectedCategory = useFilterStore((state) => state.selectedCategory);
  const selectedPriceRanges = useFilterStore((state) => state.selectedPriceRanges);

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');

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

    function priceInRanges(price: number) {
      if (selectedPriceRanges.length === 0) return true;
      return selectedPriceRanges.some((range) => {
        switch (range) {
          case '0-99': return price >= 0 && price <= 99.99;
          case '100-199': return price >= 100 && price <= 199.99;
          case '200-299': return price >= 200 && price <= 299.99;
          case '300-399': return price >= 300 && price <= 399.99;
          case '400+': return price >= 400;
          default: return false;
        }
      });
    }

    let filtered = allProducts.filter((product) => {
      const categoryMatch = selectedCategory ? product.category?.toLocaleLowerCase() === selectedCategory?.toLocaleLowerCase() : true;
      const priceMatch = priceInRanges(product.price);
      return categoryMatch && priceMatch;
    });

    // Sorting logic
    if (sortBy === 'price_asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered = filtered.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));

    }
    setFilteredProducts(filtered);
  }, [selectedCategory, selectedPriceRanges, allProducts, sortBy]);

  if (loading) return <div className="p-8">Loading products...</div>;

  return (
    <div className="w-3/4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{selectedCategory || 'All Products'}</h2>
        <SortDropdown
          sortBy={sortBy}
          setSortBy={setSortBy}
          options={SORT_OPTIONS}
        />

      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
