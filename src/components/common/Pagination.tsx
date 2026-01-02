import type React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    if (page < 1) return;
    if (page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1.5 text-sm rounded min-w-[32px] ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};
