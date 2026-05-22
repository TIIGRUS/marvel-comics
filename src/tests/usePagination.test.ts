import { renderHook, waitFor, act } from '@testing-library/react';
import { usePagination } from '../hooks';


const makeItems = (count: number, startId = 1) =>
    Array.from({ length: count }, (_, i) => ({ id: startId + i }));

describe('usePagination', () => {
    afterEach(() => vi.clearAllMocks());

    it('загружает начальные элементы при монтировании', async () => {
        const fetchFn = vi.fn().mockResolvedValue(makeItems(9));

        const { result } = renderHook(() => usePagination({ fetchFn, limit: 9 }));

        await waitFor(() => expect(result.current.items).toHaveLength(9));

        expect(fetchFn).toHaveBeenCalledWith({ limit: 9, offset: 0 });
    });

    it('isEnded=false когда количество элементов равно limit', async () => {
        const fetchFn = vi.fn().mockResolvedValue(makeItems(9));

        const { result } = renderHook(() => usePagination({ fetchFn, limit: 9 }));

        await waitFor(() => expect(result.current.items).toHaveLength(9));

        expect(result.current.isEnded).toBe(false);
    });

    it('isEnded=true когда количество элементов меньше limit', async () => {
        const fetchFn = vi.fn().mockResolvedValue(makeItems(5));

        const { result } = renderHook(() => usePagination({ fetchFn, limit: 9 }));

        await waitFor(() => expect(result.current.items).toHaveLength(5));
        expect(result.current.isEnded).toBe(true);
    });

    it('loadMore добавляет новые элементы и увеличивает offset', async () => {
        const fetchFn = vi.fn().mockResolvedValueOnce(makeItems(9)) // первая загрузка: id 1-9
            .mockResolvedValueOnce(makeItems(3, 10)); // loadMore: id 10-12

        const { result } = renderHook(() => usePagination({ fetchFn, limit: 9 }));

        await waitFor(() => expect(result.current.items).toHaveLength(9));

        act(() => result.current.loadMore());

        await waitFor(() => expect(result.current.items).toHaveLength(12));
        expect(fetchFn).toHaveBeenCalledWith({ limit: 9, offset: 9 });
        expect(result.current.isEnded).toBe(true); // 3 < 9
    });

    it('isNewLoading=true во время loadMore, false после завершения', async () => {
        let resolveLoadMore: (value: { id: number }[]) => void;

        const fetchFn = vi.fn()
            .mockResolvedValueOnce(makeItems(9)) // 1й вызов: обычный, мгновенный
            .mockImplementationOnce( // 2й вызов (loadMore): зависший Promise
                () => new Promise(resolve => {
                    resolveLoadMore = resolve; // сохраняем resolve — вызовем его сами позже
                })
            );

        const { result } = renderHook(() => usePagination({ fetchFn, limit: 9 }));

        // 1. Ждём первую загрузку (мгновенная)
        await waitFor(() => expect(result.current.items).toHaveLength(9));
        // 2. Вызываем loadMore — запрос "завис", Promise не resolved
        act(() => result.current.loadMore());
        // 3. Сразу проверяем — загрузка идёт, isNewLoading должен быть true
        expect(result.current.isNewLoading).toBe(true);
        // 4. Вручную завершаем Promise — передаём данные
        act(() => resolveLoadMore(makeItems(3, 10)));
        // 5. Ждём пока isNewLoading станет false
        await waitFor(() => expect(result.current.isNewLoading).toBe(false));
    });

    it('использует initialOffset при первой загрузке', async () => {
        const fetchFn = vi.fn().mockResolvedValue(makeItems(9, 11)); // возвращаем элементы с id 11-19

        const { result } = renderHook(() =>
            usePagination({ fetchFn, limit: 9, initialOffset: 10 })
        );

        await waitFor(() => expect(result.current.items).toHaveLength(9));
        expect(fetchFn).toHaveBeenCalledWith({ limit: 9, offset: 10 });
    });

    it('не загружает данные при монтировании, если enableAutoLoad=false', async () => {
        const fetchFn = vi.fn().mockResolvedValue(makeItems(9));

        const { result } = renderHook(() =>
            usePagination({ fetchFn, limit: 9, enableAutoLoad: false })
        );

        await waitFor(() => expect(result.current.items).toHaveLength(0));
        expect(fetchFn).not.toHaveBeenCalled();
    });
});