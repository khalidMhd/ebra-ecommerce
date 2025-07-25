'use client';

import { fetchProducts } from '@/lib/api';
import { useFilterStore } from '@/store/filter';
import { Product } from '@/types/product';
import { Filter, Search, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

const priceOptions = [
  { label: 'All Price', value: 'all' },
  { label: '$0 - 99.99', value: '0-99' },
  { label: '$100 - 199.99', value: '100-199' },
  { label: '$200 - 299.99', value: '200-299' },
  { label: '$300 - 399.99', value: '300-399' },
  { label: '$400+', value: '400+' },
];

const categories = ['Electronics', 'Jewelery', "Men's Clothing", "Women's Clothing"];


export default function FilterSidebar() {
  const setSelectedCategory = useFilterStore((state) => state.setSelectedCategory);
  const selectedPriceRanges = useFilterStore((state) => state.selectedPriceRanges);
  const setSelectedPriceRanges = useFilterStore((state) => state.setSelectedPriceRanges);
  const selectedCategory = useFilterStore((state) => state.selectedCategory);

  // Toggle price range selection
  function togglePriceRange(value: string) {
    if (value === 'all') {
      // If "All Price" selected, reset all others
      setSelectedPriceRanges([]);
      return;
    }
    if (selectedPriceRanges.includes(value)) {
      setSelectedPriceRanges(selectedPriceRanges.filter((r) => r !== value));
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, value]);
    }
  }


  return (
    <aside className="w-1/4 pr-4">
      <div className="flex items-center text-2xl mb-6">
        <Filter className='mr-2 w-5 h-5 font-bold' />
        <h2 className="font-semibold">Filter</h2>
      </div>
      <h2 className="text-xl font-semibold mb-4">CATEGORIES</h2>
      <ul className="space-y-2 mb-6">
        {categories.map((category) => (
          <li
            key={category}
            className={` cursor-pointer px-4 py-1 rounded ${selectedCategory === category ? 'text-black font-bold' : ' text-gray-700 font-semibold hover:gray-300'
              }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-4">PRICE</h2>
      <ul className="space-y-2">
        {priceOptions.map(({ label, value }) => {
          const isSelected = value === 'all'
            ? selectedPriceRanges.length === 0
            : selectedPriceRanges.includes(value);

          return (
            <li key={value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`price-${value}`}
                checked={isSelected}
                onChange={() => togglePriceRange(value)}
                className="w-5 h-5 cursor-pointer accent-black"
              />
              <label
                htmlFor={`price-${value}`}
                className={`cursor-pointer select-none ${isSelected ? 'text-black font-semibold' : ' text-gray-700 font-semibold'}`}
              >
                {label}
              </label>
            </li>
          );
        })}
      </ul>

    </aside>
  );
}
