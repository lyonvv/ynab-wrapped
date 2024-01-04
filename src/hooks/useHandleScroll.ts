import { useState, useRef, useCallback } from 'react';

const SCROLL_THRESHOLD = 100; // Define your scroll threshold here
const TOTAL_PAGE_SECTIONS = 10; // Define the total number of page sections here

export function useHandleScroll(totalPages: number) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSectionIndex, setPageSectionIndex] = useState(0);
  const accumulatedScrollDeltaY = useRef(0);

  const handleScroll = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      accumulatedScrollDeltaY.current += e.deltaY;

      const currentPageSectionIndex = Math.round(
        (accumulatedScrollDeltaY.current / SCROLL_THRESHOLD) *
          TOTAL_PAGE_SECTIONS
      );

      if (currentPageSectionIndex !== pageSectionIndex) {
        setPageSectionIndex(currentPageSectionIndex);
      }

      if (
        accumulatedScrollDeltaY.current > SCROLL_THRESHOLD &&
        pageIndex < totalPages - 1
      ) {
        setPageIndex(pageIndex + 1);
        setPageSectionIndex(0);
        accumulatedScrollDeltaY.current = 0;
      } else if (accumulatedScrollDeltaY.current < 0 && pageIndex > 0) {
        setPageIndex(pageIndex - 1);
        setPageSectionIndex(TOTAL_PAGE_SECTIONS - 1);
        accumulatedScrollDeltaY.current = SCROLL_THRESHOLD - 1;
      }
    },
    [pageIndex, pageSectionIndex, totalPages]
  );

  const onSpecificPageSelection = useCallback(
    (index: number) => {
      setPageIndex(index);
      setPageSectionIndex(Math.round(TOTAL_PAGE_SECTIONS / 2));
      accumulatedScrollDeltaY.current = Math.round(SCROLL_THRESHOLD / 2);
    },
    [setPageIndex, setPageSectionIndex]
  );

  return {
    pageIndex,
    handleScroll,
    onSpecificPageSelection,
    pageSectionIndex,
  };
}
