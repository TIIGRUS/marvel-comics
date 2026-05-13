import { useCallback, useEffect, useRef } from "react";

interface UseFocusOnNewItemsProps {
    currentLength: number;
    limit: number;
    status: string;
}

export const useFocusOnNewItems = ({
    currentLength,
    limit,
    status,
}: UseFocusOnNewItemsProps) => {
    const itemRefs = useRef<(HTMLLIElement | HTMLAnchorElement | null)[]>([]);
    const prevLength = useRef(currentLength);

    const setFocusRef = useCallback(
        (index: number) => (el: HTMLLIElement | HTMLAnchorElement | null) => {
            itemRefs.current[index] = el;
        },
        [],
    );

    useEffect(() => {
        if (
            currentLength > limit &&
            currentLength > prevLength.current &&
            status !== "loading"
        ) {
            const firstNewItem = itemRefs.current[prevLength.current];
            if (firstNewItem) {
                firstNewItem.scrollIntoView({ behavior: "smooth", block: "center" });
                firstNewItem.focus();
            }
        }
        prevLength.current = currentLength;
    }, [currentLength, limit, status]);

    return { setFocusRef, itemRefs };
};