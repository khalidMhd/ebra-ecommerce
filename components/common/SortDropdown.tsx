'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SortOption {
  label: string;
  value: string;
}

interface SortDropdownProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  options: SortOption[];
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sortBy, setSortBy, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLabel = 'Sort By';

  return (
    <div className="relative inline-block text-left w-40">
      <div
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-1 cursor-pointer text-sm text-gray-800 hover:text-black"
      >
        <span className="font-medium">{currentLabel}</span>
        <ChevronDown className="w-4 h-4" />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => {
                  setSortBy(value);
                  setIsOpen(false);
                }}
                className={`block w-full px-4 py-2 text-sm text-left ${sortBy === value
                    ? 'bg-gray-100 text-black font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
