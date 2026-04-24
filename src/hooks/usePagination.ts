import { useCallback, useEffect, useState } from 'react';

interface UsePaginationOptions<T> {
    fetchFn: ({ limit, offset }: { limit: number; offset: number }) => Promise<T[]>;
    limit: number;
    initialOffset?: number;
}
interface UsePaginationResult<T> {
    items: T[];
    isNewLoading: boolean;
    isEnded: boolean;
    loadMore: () => void;
}

export const usePagination = <T>({
    fetchFn,
    limit,
    initialOffset = 0,
}: UsePaginationOptions<T>): UsePaginationResult<T> => {
    const [items, setItems] = useState<T[]>([]);
    const [offset, setOffset] = useState(initialOffset);
    const [isNewLoading, setIsNewLoading] = useState(false);
    const [isEnded, setIsEnded] = useState(false);

    const checkIsEnd = (data: T[], currentLimit: number) => {
        if (data.length < currentLimit) setIsEnded(true);
    }

    // Initial load
    useEffect(() => {
        fetchFn({ limit, offset: initialOffset }).then(data => {
            setItems(data);
            checkIsEnd(data, limit);
        })
    }, []);

    const loadMore = useCallback(() => {
        const nextOffset = offset + limit;
        setIsNewLoading(true);
        setOffset(nextOffset);

        fetchFn({ limit, offset: nextOffset }).then(newItems => {
            setItems(prevItems => [...prevItems, ...newItems]);
            checkIsEnd(newItems, limit);
            setIsNewLoading(false);
        });
    }, [offset, limit, fetchFn]);

    return {
        items,
        isNewLoading,
        isEnded,
        loadMore,
    };
}