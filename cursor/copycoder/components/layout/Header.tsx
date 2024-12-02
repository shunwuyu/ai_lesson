// src/components/layout/Header.tsx
'use client';

import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-primary-dark text-white h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <Search className="mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-b border-white focus:outline-none"
        />
      </div>
      <div className="flex items-center">
        <button className="bg-accent-blue text-white px-4 py-2 rounded">Search</button>
      </div>
    </header>
  );
};

export default Header;