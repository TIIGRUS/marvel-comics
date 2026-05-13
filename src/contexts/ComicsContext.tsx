/* eslint-disable react-refresh/only-export-components */

import { createContext, ReactNode, useState } from "react";
import useMarvelService from "../services/MarvelService";
import { usePagination } from "../hooks";
import { Comic } from "../types";

export const COMICS_LIMIT = 8;

// 1. Описываем форму контекста
interface ComicsContextType {
  arrayComics: Comic[];
  isNewLoading: boolean;
  isEnded: boolean;
  loadMore: () => void;
  status: ReturnType<typeof useMarvelService>["status"];
  lastClickedIndex: number | null;
  setLastClickedIndex: (id: number | null) => void;
}

// 2. Создаём контекст (undefined — чтобы поймать использование вне провайдера)
export const ComicsContext = createContext<ComicsContextType | undefined>(
  undefined,
);

// 3. Провайдер — здесь живёт стейт
export const ComicsProvider = ({ children }: { children: ReactNode }) => {
  const { status, getAllComics } = useMarvelService();
  const {
    items: arrayComics,
    isNewLoading,
    isEnded,
    loadMore,
  } = usePagination<Comic>({
    fetchFn: getAllComics,
    limit: COMICS_LIMIT,
  });
  const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(null);

  return (
    <ComicsContext.Provider
      value={{
        arrayComics,
        isNewLoading,
        isEnded,
        loadMore,
        status,
        lastClickedIndex,
        setLastClickedIndex,
      }}
    >
      {children}
    </ComicsContext.Provider>
  );
};

// 4. Хук для удобного доступа
// export const useComicsContext = () => {
//   const context = useContext(ComicsContext);
//   if (!context) {
//     throw new Error(
//       "useComicsContext must be used within ComicsProvider",
//     );
//   }
//   return context;
// };
