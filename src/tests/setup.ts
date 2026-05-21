import '@testing-library/jest-dom';
import { server } from './mocks/server';

export const TEST_URL = 'https://marvel-server-zeta.vercel.app/characters?apikey=test';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());