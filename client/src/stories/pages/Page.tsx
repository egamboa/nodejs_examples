import type { ReactNode } from 'react';
import { Header } from '../components/compounds/Header';

interface PageProps {
  children: ReactNode;
}

/**
 * Page Component
 * A responsive layout with full-width header and flexible main content area.
 */
export default function Page({ children }: PageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-600 text-white">
      {/* Sticky full-width header */}
      <header className="w-full z-50 shadow-md">
        <Header />
      </header>

      {/* Scrollable page content */}
      <main className="flex-grow w-full overflow-auto px-4 py-6">
        {children}
      </main>

      {/* Optional: future footer goes here */}
    </div>
  );
}
