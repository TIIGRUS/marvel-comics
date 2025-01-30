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
        return this.getResource('characters?limit=9&offset=210&');
    }

    getCharacter = async (id) => {
        return this.getResource(`characters/${id}?`);
    }
}

export default MarvelService;