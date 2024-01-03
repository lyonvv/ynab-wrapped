import { useState, useRef, useCallback } from 'react';

export function useHandleScroll(
  totalPages: number,
  totalPageSections: number,
  scrollThreshold: number
) {
  const [pageIndex, setPageIndex] = useState(0);
  const [currentPageSectionIndex, setCurrentPageSectionIndex] = useState(0);
  const accumulatedScrollDeltaY = useRef(0);

  const handleScroll = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      accumulatedScrollDeltaY.current += e.deltaY;

      const newPageSectionIndex = Math.min(
        totalPageSections - 1,
        Math.max(
          0,
          Math.floor(
            accumulatedScrollDeltaY.current /
              (scrollThreshold / totalPageSections)
          )
        )
      );

      if (newPageSectionIndex !== currentPageSectionIndex) {
        setCurrentPageSectionIndex(newPageSectionIndex);
      }

      if (
        accumulatedScrollDeltaY.current > scrollThreshold &&
        pageIndex < totalPages - 1
      ) {
        setPageIndex(pageIndex + 1);
        setCurrentPageSectionIndex(0);
        accumulatedScrollDeltaY.current = 0;
      } else if (accumulatedScrollDeltaY.current < 0 && pageIndex > 0) {
        setPageIndex(pageIndex - 1);
        setCurrentPageSectionIndex(totalPageSections - 1);
        accumulatedScrollDeltaY.current = scrollThreshold - 1;
      }
    },
    [
      pageIndex,
      currentPageSectionIndex,
      totalPages,
      totalPageSections,
      scrollThreshold,
    ]
  );

  const onSpecificPageSelection = useCallback(
    (index: number) => {
      setPageIndex(index);
      setCurrentPageSectionIndex(0);
      accumulatedScrollDeltaY.current = 0;
    },
    [setPageIndex, setCurrentPageSectionIndex]
  );

  return {
    pageIndex,
    currentPageSectionIndex,
    handleScroll,
    onSpecificPageSelection,
  };
}
