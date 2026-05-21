import { renderHook, act } from '@testing-library/react';
import { useHTTP } from '../hooks/useHTTP';
import { http, HttpResponse } from 'msw';
import { server } from './mocks/server';
import { TEST_URL } from './setup';

describe('useHTTP', () => {
    it('начальное состояние: status=waiting, error=null, isLoading=false', () => {

        const { result } = renderHook(() => useHTTP());

        expect(result.current.status).toBe('waiting');
        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBe(false);
    });

    it('во время запроса: status=loading, error=null, isLoading=true', async () => {
        const { result } = renderHook(() => useHTTP());

        act(() => {
            result.current.request({ url: TEST_URL });
        });

        expect(result.current.status).toBe('loading');
        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBe(true);
    });

    it("успешный запрос: status=confirmed, error=null, isLoading=false", async () => {
        const { result } = renderHook(() => useHTTP());

        await act(async () => {
            await result.current.request({ url: TEST_URL });
        });

        expect(result.current.status).toBe('confirmed');
        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBe(false);
    });

    it("неуспешный запрос (500): status=error, error не null, isLoading=false", async () => {
        server.use(
            http.get("https://marvel-server-zeta.vercel.app/characters", () => {
                return new HttpResponse(null, { status: 500 });
            })
        )

        const { result } = renderHook(() => useHTTP());

        await act(async () => {
            try {
                await result.current.request({ url: TEST_URL });
            } catch { }
        });

        expect(result.current.status).toBe('error');
        expect(result.current.error).not.toBeNull();
        expect(result.current.isLoading).toBe(false);
    });

    it("clearError сбрасывает error и устанавливает status в loading, isLoading=false", async () => {
        const { result } = renderHook(() => useHTTP());

        act(() => {
            result.current.setError("Some error");
            result.current.setStatus("error");
        });

        expect(result.current.error).toBe("Some error");

        act(() => {
            result.current.clearError();
        });

        expect(result.current.error).toBeNull();
        expect(result.current.status).toBe('loading');
        expect(result.current.isLoading).toBe(false);
    });
});