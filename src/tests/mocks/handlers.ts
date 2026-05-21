import { http, HttpResponse } from 'msw';

const API_URL = 'https://marvel-server-zeta.vercel.app';

export const mockCharacter = {
    id: 1,
    name: 'Spider-Man',
    description: 'A hero',
    thumbnail: 'http://image.jpg',
    homepage: 'http://marvel.com',
    wiki: 'http://wiki.com',
    comics: ['Comic 1', 'Comic 2'],
}

export const mockComic = {
    id: 1,
    title: 'Amazing Spider-Man',
    description: 'A comic about Spider-Man',
    thumbnail: 'http://comic.jpg',
    price: 3.99,
    pageCount: 32,
    language: 'en',
}


export const handlers = [
    http.get(`${API_URL}/characters`, () => {
        return HttpResponse.json({
            data: {
                results: [mockCharacter]
            }
        });
    }),
    http.get(`${API_URL}/comics`, () => {
        return HttpResponse.json({
            data: {
                results: [mockComic]
            }
        });
    }),
    http.get(`${API_URL}/characters/:id`, () => {
        return HttpResponse.json({
            data: {
                results: [mockCharacter]
            }
        });
    }),
    http.get(`${API_URL}/comics/:id`, () => {
        return HttpResponse.json({
            data: {
                results: [mockComic]
            }
        });
    }),
];