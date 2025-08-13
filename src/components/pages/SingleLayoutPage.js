import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const SingleLayoutPage = ({ Component }) => {
    const [item, setItem] = useState(null);
    const [isMounted, setIsMounted] = useState(true);
    const { comicId, charId } = useParams();
    const { getComic, getCharacter, isLoading, error } = useMarvelService();

    useEffect(() => {
        const loadData = async () => {
            try {
                if (comicId) {
                    const comic = await getComic(comicId);
                    if (isMounted) {
                        setItem(comic);
                    }
                }
                if (charId) {
                    const character = await getCharacter(charId);
                    if (isMounted) {
                        setItem(character);
                    }
                }
            } catch (error) {
                console.error("Error loading data:", error);
            }
        }

        loadData();

        return () => {
            setIsMounted(false);
        }

    }, [comicId, charId]);

    const spinner = isLoading ? <Spinner /> : null;

    const errorMessage = error ? <ErrorMessage
        {...(comicId ? { textLink: "Go back to comics list", pathLink: "/comics" } : { textLink: "Go back to characters list", pathLink: "/" })}
    >
        <h1>Not found</h1>
        <p>We couldn't find the requested item.</p>
    </ErrorMessage> : null;

    const content = !(isLoading || error || !item) ? <Component data={item} /> : null;

    return (
        <>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

export default SingleLayoutPage;