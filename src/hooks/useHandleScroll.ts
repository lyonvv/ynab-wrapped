import { useState, useRef, useCallback } from 'react';
import { usePagination } from './usePagination';

const SCROLL_THRESHOLD = 10000; // Define your scroll threshold here

export function useHandleScroll(totalPages: number) {
  const {
    pageIndex,
    nextPage,
    previousPage,
    onSpecificPageSelection,
    isNextPage,
    isPreviousPage,
  } = usePagination(totalPages);

  const [scrollProgress, setScrollProgress] = useState(0);
  const accumulatedScrollDeltaY = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const updateScrollState = useCallback(() => {
    setScrollProgress(accumulatedScrollDeltaY.current / SCROLL_THRESHOLD);

    if (accumulatedScrollDeltaY.current > SCROLL_THRESHOLD && isNextPage) {
      nextPage();
      accumulatedScrollDeltaY.current = 0;
      setScrollProgress(accumulatedScrollDeltaY.current / SCROLL_THRESHOLD);
    } else if (accumulatedScrollDeltaY.current < 0 && isPreviousPage) {
      previousPage();
      accumulatedScrollDeltaY.current = SCROLL_THRESHOLD;
      setScrollProgress(accumulatedScrollDeltaY.current / SCROLL_THRESHOLD);
    }
  }, [pageIndex, totalPages]);

  const handleScroll = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      accumulatedScrollDeltaY.current += e.deltaY;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(updateScrollState);
    },
    [updateScrollState]
  );

  const selectSpecificPage = useCallback(
    (index: number) => {
      onSpecificPageSelection(index);
      accumulatedScrollDeltaY.current = Math.round(SCROLL_THRESHOLD / 2);
    },
    [onSpecificPageSelection]
  );

  return {
    pageIndex,
    handleScroll,
    selectSpecificPage,
    scrollProgress,
  };
}
