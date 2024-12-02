// src/app/layout.tsx
'use client';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import MoodNav from '@/components/layout/MoodNav';
import './globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-primary-dark text-white">
        <Sidebar />
        <div className="ml-60">
          <Header />
          <MoodNav />
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;