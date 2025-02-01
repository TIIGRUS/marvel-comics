class MarvelService {
    #apiBase = 'https://gateway.marvel.com/v1/public/';
    #apiKey = `${process.env.REACT_APP_MARVEL_API_KEY}`;

    getResource = async (url) => {
        url = `${this.#apiBase}${url}apikey=${this.#apiKey}`;

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource('characters?limit=9&offset=210&');

        return res.data.results.map(this.#transformCharacter);
    }

    getCharacter = async (id) => {
        const { data } = await this.getResource(`characters/${id}?`);

        return this.#transformCharacter(data.results[0]);
    }

    #transformCharacter = (char) => {
        const { name, description, thumbnail, urls } = char;

        const getUrl = (typeLink) => (urls.find(({ type }) => type === typeLink))?.url || "#";

        return {
            name,
            description: description ? `${description.slice(0, 210)}...` : "There is no description for this character",
            thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
            homepage: getUrl("detail"),
            wiki: getUrl("wiki")
        }
    }
}

export default MarvelService;