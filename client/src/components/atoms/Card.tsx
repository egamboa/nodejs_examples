/**
 * Card Molecule
 * Displays a content block.
 */
export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 text-black bg-amber-50 border-2 border-black rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      {children}
    </div>
  );
}
