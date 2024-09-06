import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mb-20">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={handlePrevPage}
        >
          Previous
        </div>
        <div
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={handleNextPage}
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between lg:flex  md:flex">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(currentPage * 10, totalPages * 10)}
            </span>{" "}
            of <span className="font-medium">{totalPages * 10}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <div
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
              onClick={handlePrevPage}
            >
              <span className="sr-only">Previous</span>
              <FaChevronLeft
                aria-hidden="true"
                className="h-4 w-4 text-blue-950"
              />
            </div>
            {generatePageNumbers().map((pageNumber) => (
              <div
                key={pageNumber}
                className={`relative cursor-pointer inline-flex items-center px-3 py-1 text-sm font-semibold focus:z-20 focus:outline-offset-0 ${
                  pageNumber === currentPage
                    ? "bg-blue-950 text-white"
                    : "text-gray-900"
                }`}
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </div>
            ))}
            <div
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400  hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
              onClick={handleNextPage}
            >
              <span className="sr-only">Next</span>
              <FaChevronRight
                aria-hidden="true"
                className="h-4 w-4 text-blue-950"
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
