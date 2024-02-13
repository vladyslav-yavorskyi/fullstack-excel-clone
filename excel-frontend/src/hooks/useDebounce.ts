import { useCallback, useRef } from 'react';

const useDebounce = (callback: Function, delay: number) => {
    // Create a mutable ref object where we can store a timer id
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Return a memoized version of the callback that clears the timer and starts a new one every time it's called
    return useCallback(
        (...args: any[]) => {
            // Clear the previous timer
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            // Start a new timer
            timerRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        // Only re-create the debounced function when the callback or delay changes
        [callback, delay]
    );
};

export default useDebounce;