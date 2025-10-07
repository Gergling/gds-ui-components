import { RefObject, useCallback, useLayoutEffect, useState } from "react";

export const useElementHeight = <
  T extends HTMLElement = HTMLDivElement
>(
  elementRef: RefObject<T | null>
) => {
  const [height, setHeight] = useState(0);

  // Function to calculate and set the height
  const calculateHeight = useCallback(() => {
    if (elementRef.current) {
      // Use offsetHeight to get the element's height including padding and border.
      setHeight(elementRef.current.offsetHeight);
    }
  }, [elementRef]);

  // 1. Initial measurement and listener setup
  useLayoutEffect(() => {
    calculateHeight();

    // Set up a resize listener to recalculate height whenever the window size changes.
    window.addEventListener('resize', calculateHeight);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('resize', calculateHeight);
    };
  }, [calculateHeight]);

  // 2. Observer for content changes (e.g., text wrapping)
  useLayoutEffect(() => {
    if (elementRef.current && typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(calculateHeight);
      observer.observe(elementRef.current);
      
      return () => {
        observer.disconnect();
      };
    }
  }, [calculateHeight, elementRef]);

  return height;
};
