import type { ReactNode } from 'react';
import { Header } from '../components/compounds/Header';

interface PageProps {
  children: ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-600 text-white">
      <header className="w-full z-50 shadow-md">
        <Header />
      </header>

      <main className="flex-grow flex-col items-center w-full overflow-auto px-4 py-6">
        <div className="w-full flex flex-col items-center mt-20">
          {children}
        </div>
      </main>
    </div>
  );
}
