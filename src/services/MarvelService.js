import { useState } from "react";
import { useHTTP } from "../hooks";

const useMarvelService = () => {
    // #apiBase = 'https://gateway.marvel.com/v1/public/';
    const _apiBase = 'https://marvel-server-zeta.vercel.app/';
    const _apiKey = `${process.env.REACT_APP_MARVEL_API_KEY}`;
    const _initialOffsetCharacters = 210;
    const _initialLimitCharacters = 9;
    const _initialLimitComics = 8;
    const _initialOffsetComics = 4;
    // _baseOffset = 210;
    // _initialLimit = 9;
    const { isLoading, error, request, clearError } = useHTTP();
    const [isEndOfList, setIsEndOfList] = useState(false);
    const [initialLimit, setInitialLimit] = useState(0);
    const [nextOffset, setNextOffset] = useState(0);
    const [isNewLoading, setIsNewLoading] = useState(false);

    const getResource = async (url) => {
        url = `${_apiBase}${url}apikey=${_apiKey}`;

        const res = await request({ url, headers: {} });

        return res;
    }

    const getAllCharacters = async (limit = _initialLimitCharacters, offset = _initialOffsetCharacters) => {
        const res = await getResource(`characters?limit=${limit}&offset=${offset}&`);

        return res.data.results.map(transformCharacter);
    }

    // const getAllCharacters = async ({ limit = initialLimit, offset = nextOffset, isInitialLoading = false } = { limit: _initialLimitCharacters, offset: _initialOffsetCharacters }) => {
    //     const res = await getResource(`characters?limit=${limit}&offset=${offset}&`);

    //     const dataArray = res.data.results.map(transformComic);

    //     handlePagination({
    //         limit,
    //         offset,
    //         isInitialLoading,
    //         dataArray
    //     })

    //     return dataArray;
    // }

    const getAllComics = async ({ limit = initialLimit, offset = nextOffset, isInitialLoading = false } = { limit: _initialLimitComics, offset: _initialOffsetComics }) => {

        const res = await getResource(`comics?limit=${limit}&offset=${offset}&`);
        const dataArray = res.data.results.map(transformComic);

        handlePagination({
            limit,
            offset,
            isInitialLoading,
            dataArray
        })

        return dataArray;
    }

    const handlePagination = ({ limit, offset, isInitialLoading, dataArray }) => {
        setInitialLimit(limit)
        setNextOffset(offset + limit)
        isInitialLoading ? setIsNewLoading(false) : setIsNewLoading(true)
        _checkIsEndOfList(dataArray, limit)
    }

    const getCharacter = async (id) => {
        const { data } = await getResource(`characters/${id}?`);

        return transformCharacter(data.results[0]);
    }

    const _checkIsEndOfList = (array, limit = initialLimit) => {
        if (array.length < limit) {
            setIsEndOfList(true);
            return true;
        } else {
            setIsEndOfList(false);
            return false;
        }
    }

    const transformComic = (comic) => {
        const { title, description, thumbnail, prices, id } = comic;

        return {
            id,
            title,
            description: description ? `${description.slice(0, 210)}...` : "There is no description for this comic",
            thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
            price: prices[0]?.price || "NOT AVAILABLE"
        }
    }

    const transformCharacter = (char) => {
        const { name, description, thumbnail, urls, id, comics } = char;

        const getUrl = (typeLink) => (urls.find(({ type }) => type === typeLink))?.url || "#";

        return {
            id,
            name,
            description: description ? `${description.slice(0, 210)}...` : "There is no description for this character",
            thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
            homepage: getUrl("detail"),
            wiki: getUrl("wiki"),
            comics: comics.items
        }
    }

    const _defaults = {
        characters: {
            limit: _initialLimitCharacters,
            offset: _initialOffsetCharacters,
            transform: transformCharacter,
        },
        comics: {
            limit: _initialLimitComics,
            offset: _initialOffsetComics,
            transform: transformComic,
        },
    };

    const getAll = async ({
        type = "characters",
        limit,
        offset,
        isInitialLoading = false,
    } = {}) => {
        const config = _defaults[type];

        const actualLimit = limit ?? config.limit;
        const actualOffset = typeof (offset) === "number" ? offset : nextOffset || config.offset;

        const res = await getResource(`${type}?limit=${actualLimit}&offset=${actualOffset}&`);
        const dataArray = res.data.results.map(config.transform);

        handlePagination({
            limit: actualLimit,
            offset: actualOffset,
            isInitialLoading,
            dataArray,
        });

        return dataArray;
    };


    return {
        isLoading,
        error,
        isEndOfList,
        isNewLoading,
        getAllCharacters,
        getAllComics,
        getCharacter,
        clearError,
        getAll,
    };
}

export default useMarvelService;