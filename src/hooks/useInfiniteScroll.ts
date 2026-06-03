import { useRef, useEffect } from "react"

type UseInfiniteScrollOptions = {
    ref: React.RefObject<HTMLElement | null>,
    loadMore: () => void,
    isLoading: boolean,
    isEnded: boolean,
    enabled: boolean,
    rootMargin?: string,
}

export const useInfiniteScroll = ({
    ref,
    loadMore,
    isLoading,
    isEnded,
    enabled,
    rootMargin = "0px",
}: UseInfiniteScrollOptions) => {

    // Используем useRef для отслеживания времени последнего вызова (дебоунс)
    const lastCallTimeRef = useRef<number>(0);

    useEffect(() => {
        // Если infinite scroll отключён, не создаём observer
        if (!enabled) return;

        // Если нет ref на элемент, нечего наблюдать
        if (!ref.current) return;

        const handleIntersection: IntersectionObserverCallback = (entries) => {
            const entry = entries[0];

            // Проверяем, виден ли элемент, и не происходит ли уже загрузка, и не достигнут ли конец
            if (entry.isIntersecting && !isLoading && !isEnded) {
                const now = Date.now();
                // Проверяем, прошло ли достаточно времени с последнего вызова
                if (now - lastCallTimeRef.current >= 300) { // 300ms дебоунс
                    loadMore();
                    lastCallTimeRef.current = now; // Обновляем время последнего вызова
                }
            }
        }

        // Создаём Intersection Observer
        const observer = new IntersectionObserver(handleIntersection, { rootMargin });

        // Начинаем наблюдение за элементом
        observer.observe(ref.current);

        // Чистим observer при размонтировании или изменении зависимостей
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
            observer.disconnect();
        }

    }, [ref, loadMore, isLoading, enabled, rootMargin]);
}