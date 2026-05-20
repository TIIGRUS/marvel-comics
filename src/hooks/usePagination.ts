import { useCallback, useEffect, useState } from 'react';

interface UsePaginationOptions<T> {
    fetchFn: ({ limit, offset }: { limit: number; offset: number }) => Promise<T[]>;
    limit: number;
    initialOffset?: number;
    enableAutoLoad?: boolean;
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
    enableAutoLoad = true,
}: UsePaginationOptions<T>): UsePaginationResult<T> => {
    const [items, setItems] = useState<T[]>([]);
    const [offset, setOffset] = useState(initialOffset);
    const [isNewLoading, setIsNewLoading] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const checkIsEnd = useCallback((data: T[], currentLimit: number) => {
        if (data.length < currentLimit) setIsEnded(true);
    }, []);

    // Initial load
    useEffect(() => {
        // Запускаем ТОЛЬКО если enabled===true и мы еще не загружали данные (не путать с loadMore)
        if (!enableAutoLoad || hasFetched) return;

        fetchFn({ limit, offset: initialOffset }).then(data => {
            setItems(data);
            checkIsEnd(data, limit);
            setHasFetched(true);
        })
    }, [fetchFn, initialOffset, limit, checkIsEnd, enableAutoLoad, hasFetched]);

    const loadMore = useCallback(() => {
        const nextOffset = offset + limit;
        setIsNewLoading(true);
        setOffset(nextOffset);

        fetchFn({ limit, offset: nextOffset }).then(newItems => {
            setItems(prevItems => [...prevItems, ...newItems]);
            checkIsEnd(newItems, limit);
            setIsNewLoading(false);
        });
    }, [offset, limit, fetchFn, checkIsEnd]);

    return {
        items,
        isNewLoading,
        isEnded,
        loadMore,
    };
}