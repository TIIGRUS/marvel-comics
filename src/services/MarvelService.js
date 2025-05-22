class MarvelService {
    // #apiBase = 'https://gateway.marvel.com/v1/public/';
    #apiBase = 'https://marvel-server-zeta.vercel.app/';
    #apiKey = `${process.env.REACT_APP_MARVEL_API_KEY}`;
    #initialOffset = 210;
    #initialLimit = 9;
    // _baseOffset = 210;
    // _initialLimit = 9;

    getResource = async (url) => {
        url = `${this.#apiBase}${url}apikey=${this.#apiKey}`;

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (limit = this.#initialLimit, offset = this.#initialOffset) => {
        const res = await this.getResource(`characters?limit=${limit}&offset=${offset}&`);

        return res.data.results.map(this.#transformCharacter);
    }

    getCharacter = async (id) => {
        const { data } = await this.getResource(`characters/${id}?`);

        return this.#transformCharacter(data.results[0]);
    }

    #transformCharacter = (char) => {
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
}

export default MarvelService;