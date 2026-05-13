/* eslint-disable react-refresh/only-export-components */

import { createContext, ReactNode, useState } from "react";
import useMarvelService from "../services/MarvelService";
import { usePagination } from "../hooks";
import { Character } from "../types";

export const CHARS_LIMIT = 9;

// 1. Описываем форму контекста
interface CharactersContextType {
  arrayChars: Character[];
  isNewLoading: boolean;
  isEnded: boolean;
  loadMore: () => void;
  status: ReturnType<typeof useMarvelService>["status"];
  selectedCharId: number | null;
  setSelectedCharId: (id: number | null) => void;
}

// 2. Создаём контекст (undefined — чтобы поймать использование вне провайдера)
export const CharactersContext = createContext<
  CharactersContextType | undefined
>(undefined);

// 3. Провайдер — здесь живёт стейт
export const CharactersProvider = ({ children }: { children: ReactNode }) => {
  const { status, getAllCharacters } = useMarvelService();
  const {
    items: arrayChars,
    isNewLoading,
    isEnded,
    loadMore,
  } = usePagination<Character>({
    fetchFn: getAllCharacters,
    limit: CHARS_LIMIT,
  });
  const [selectedCharId, setSelectedCharId] = useState<number | null>(null);

  return (
    <CharactersContext.Provider
      value={{
        arrayChars,
        isNewLoading,
        isEnded,
        status,
        loadMore,
        selectedCharId,
        setSelectedCharId,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};

// 4. Хук для удобного доступа
// export const useCharactersContext = () => {
//   const context = useContext(CharactersContext);
//   if (!context) {
//     throw new Error(
//       "useCharactersContext must be used within CharactersProvider",
//     );
//   }
//   return context;
// };
