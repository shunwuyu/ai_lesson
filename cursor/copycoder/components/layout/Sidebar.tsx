// src/components/layout/Sidebar.tsx
'use client';

import { Home, Search, Library, ArrowUpRight } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-60 bg-secondary-dark text-white h-screen fixed top-0 left-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Music App</h1>
      </div>
      <nav className="mt-10">
        <ul>
          <li className="mb-4">
            <a href="/" className="flex items-center text-lg">
              <Home className="mr-2" />
              Home
            </a>
          </li>
          <li className="mb-4">
            <a href="/explore" className="flex items-center text-lg">
              <Search className="mr-2" />
              Explore
            </a>
          </li>
          <li className="mb-4">
            <a href="/library" className="flex items-center text-lg">
              <Library className="mr-2" />
              Media Library
            </a>
          </li>
          <li className="mb-4">
            <a href="/upgrade" className="flex items-center text-lg">
              <ArrowUpRight className="mr-2" />
              Upgrade
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;