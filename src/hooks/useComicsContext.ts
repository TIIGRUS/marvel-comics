import { useContext } from "react";
import { ComicsContext } from "../contexts/ComicsContext";

// 4. Хук для удобного доступа
export const useComicsContext = () => {
    const context = useContext(ComicsContext);
    if (!context) {
        throw new Error(
            "useComicsContext must be used within ComicsProvider",
        );
    }
    return context;
};
