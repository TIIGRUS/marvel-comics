import { useHTTP } from "../hooks";

const useMarvelService = () => {
    // #apiBase = 'https://gateway.marvel.com/v1/public/';
    const _apiBase = 'https://marvel-server-zeta.vercel.app/';
    const _apiKey = `${process.env.REACT_APP_MARVEL_API_KEY}`;
    const _initialOffset = 210;
    const _initialLimit = 9;
    // _baseOffset = 210;
    // _initialLimit = 9;
    const { isLoading, error, request, clearError } = useHTTP();

    const getResource = async (url) => {
        url = `${_apiBase}${url}apikey=${_apiKey}`;

        const res = await request({ url, headers: {} });

        return res;
    }

    const getAllCharacters = async (limit = _initialLimit, offset = _initialOffset) => {
        const res = await getResource(`characters?limit=${limit}&offset=${offset}&`);

        return res.data.results.map(transformCharacter);
    }

    const getCharacter = async (id) => {
        const { data } = await getResource(`characters/${id}?`);

        return transformCharacter(data.results[0]);
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

    return { isLoading, error, getAllCharacters, getCharacter, clearError };
}

export default useMarvelService;