// Async state type used in useHTTP
export type AsyncStatus = 'waiting' | 'loading' | 'confirmed' | 'error';

// User authentication types
export interface User {
    id: string;
    email: string;
    user_name: string;
    first_name?: string;
    last_name?: string;
    age?: number;
    avatar_url?: string;
    created_at: string;
}

export interface UserProfileUpdates {
    user_name?: string;
    first_name?: string | null;
    last_name?: string | null;
    age?: number | null;
    avatar_url?: string | null;
}

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
