// Async state type used in useHTTP
export type AsyncStatus = 'waiting' | 'loading' | 'confirmed' | 'error';

// Domain types (output of transform functions): Character and Comic
export interface Character {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
    homepage: string;
    wiki: string;
    comics: string[];
}

export interface Comic {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    price: number | string;
    pageCount: number;
    language: string;
}

// Raw Marvel API response shapes
export interface MarvelApiThumbnail {
    path: string;
    extension: string;
}

export interface MarvelApiUrl {
    url: string;
    type: string;
}

export interface MarvelApiCharacter {
    id: number;
    name: string;
    description: string;
    thumbnail: MarvelApiThumbnail;
    urls: MarvelApiUrl[];
    comics: {
        items: string[];
    }
}

export interface MarvelApiComic {
    id: number;
    title: string;
    description: string | null;
    thumbnail: MarvelApiThumbnail;
    prices: {
        price: number | string;
    }[];
    pageCount: number;
    language: {
        textObjects: {
            language: string;
        };
    }
}

export interface MarvelApiResponse<T> {
    data: {
        results: T[];
    };
}