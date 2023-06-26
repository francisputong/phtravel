import { useEffect } from 'react';

const useDebounce = (
    value: string,
    delay: number,
    callback: (value: string) => void
): void => {
    useEffect(() => {
        const debounceFn = setTimeout(() => {
            callback(value);
        }, delay);

        return () => {
            clearTimeout(debounceFn);
        };
    }, [value]);
};

export default useDebounce;
