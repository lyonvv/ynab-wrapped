import { useState } from 'react';

export function usePagination(totalPages: number) {
  const [pageIndex, setPageIndex] = useState(0);

  const isNextPage = pageIndex < totalPages - 1;

  const nextPage = () => {
    if (isNextPage) {
      setPageIndex(pageIndex + 1);
    }
  };

  const isPreviousPage = pageIndex > 0;

  const previousPage = () => {
    if (isPreviousPage) {
      setPageIndex(pageIndex - 1);
    }
  };

  const onSpecificPageSelection = (index: number) => {
    if (index < 0 || index >= totalPages) return;
    setPageIndex(index);
  };

  return {
    pageIndex,
    nextPage,
    previousPage,
    onSpecificPageSelection,
    isNextPage,
    isPreviousPage,
  };
}
