import { useState, useRef, useCallback } from 'react';

const SCROLL_THRESHOLD = 1000; // Define your scroll threshold here

export function useHandleScroll(totalPages: number) {
  const [pageIndex, setPageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const accumulatedScrollDeltaY = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const updateScrollState = () => {
    setScrollProgress(accumulatedScrollDeltaY.current / SCROLL_THRESHOLD);

    if (
      accumulatedScrollDeltaY.current > SCROLL_THRESHOLD &&
      pageIndex < totalPages - 1
    ) {
      setPageIndex(pageIndex + 1);
      accumulatedScrollDeltaY.current = 0;
      setScrollProgress(accumulatedScrollDeltaY.current / SCROLL_THRESHOLD);
    } else if (accumulatedScrollDeltaY.current < 0 && pageIndex > 0) {
      setPageIndex(pageIndex - 1);
      accumulatedScrollDeltaY.current = SCROLL_THRESHOLD - 1;
      setScrollProgress(accumulatedScrollDeltaY.current / SCROLL_THRESHOLD);
    }
  };

  const handleScroll = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      accumulatedScrollDeltaY.current += e.deltaY;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(updateScrollState);
    },
    [pageIndex, totalPages]
  );

  const onSpecificPageSelection = useCallback(
    (index: number) => {
      setPageIndex(index);
      accumulatedScrollDeltaY.current = Math.round(SCROLL_THRESHOLD / 2);
    },
    [setPageIndex]
  );

  return {
    pageIndex,
    handleScroll,
    onSpecificPageSelection,
    scrollProgress,
  };
}
