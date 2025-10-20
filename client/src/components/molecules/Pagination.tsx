import type { ComponentPropsWithoutRef } from 'react';

// Define the props
interface PaginationPros extends ComponentPropsWithoutRef<'input'> {
  pageNumber: number;
  changePage: (newPage: number) => void;
  next: boolean;
  count: number;
  pageSize: number;
}

export default function Pagination({ pageNumber, changePage, next, count, pageSize }: PaginationPros) {
  const totalPages = Math.ceil(count / pageSize);
  return <div className="flex justify-between items-center mt-6">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded disabled:opacity-40"
            onClick={() => changePage(pageNumber - 1)}
            disabled={pageNumber === 0}
          >
            Previous
          </button>
          <span className="text-white mx-2">
            Page {pageNumber + 1} of {totalPages}
          </span>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded disabled:opacity-40"
            onClick={() => changePage(pageNumber + 1)}
            disabled={!next}
          >
            Next
          </button>
        </div>
}