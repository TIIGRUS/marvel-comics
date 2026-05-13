import { useContext } from "react";
import { CharactersContext, CHARS_LIMIT } from "../contexts/CharactersContext";


// 4. Хук для удобного доступа
export const useCharactersContext = () => {
    const context = useContext(CharactersContext);
    if (!context) {
        throw new Error("useCharactersContext must be used within CharactersProvider");
    }
    return context;
};

export { CHARS_LIMIT };