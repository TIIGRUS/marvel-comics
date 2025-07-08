import { useEffect, useState } from "react";
import { redirect, useParams } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import SingleComic from "../SingleComic/SingleComic";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const SingleComicPage = () => {
    const [comic, setComic] = useState(null);
    const { comicId } = useParams();
    const { getComic, isLoading, error } = useMarvelService();

    useEffect(() => {
        loadComic();
    }, [comicId]);

    const loadComic = () => {
        getComic(comicId).then(setComic);
    }

    const spinner = isLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(isLoading || error || !comic) ? <SingleComic comic={comic} /> : null;

    return (
        <>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

export default SingleComicPage;