# Marvel Comics — Portfolio Refactor Plan

## Phase 1 — TypeScript: Setup

- [ ] Install deps: `typescript`, `@types/react`, `@types/react-dom`, `@types/react-router-dom`, `@types/react-transition-group`
- [ ] Create `tsconfig.json` with `strict: true`
- [ ] Rename `vite.config.js` → `vite.config.ts`
- [ ] Create `src/types/index.ts` with shared interfaces:
  - `Character`, `Comic` — domain types
  - `AsyncStatus` — `'waiting' | 'loading' | 'confirmed' | 'error'`
  - `MarvelApiCharacter`, `MarvelApiComic` — raw API response types

## Phase 2 — Hooks & Services (bottom-up)

- [ ] `useHTTP.js` → `useHTTP.ts` with typed return values
- [ ] `MarvelService.js` → `MarvelService.ts`:
  - Type all transform functions
  - Fix inconsistency: `CharInfo` calls `MarvelService()` as a function, `CharList` uses `useMarvelService` as a hook — standardize to hook pattern
- [ ] `hooks/index.js` → `index.ts`
- [ ] `utils/setContent.jsx` → `setContent.tsx` with typed props

## Phase 3 — Component Migration

- [ ] Rename all `.jsx` → `.tsx`, add Props interfaces (can be done in parallel per component)
- [ ] Fix bugs during migration:
  - `CharInfo` — missing `useEffect` dependencies (`getCharacter`, `clearError`)
  - `SingleLayoutPage` — replace `isMounted` anti-pattern with `AbortController`
  - Remove unused `crypto-js` dependency

## Phase 4 — Refactor: `usePagination` Hook

- [ ] Create `src/hooks/usePagination.ts` — extract duplicated pagination logic from `CharList` and `ComicsList`
- [ ] Refactor `CharList` and `ComicsList` to use the new hook _(depends on step above)_

## Phase 5 — Tests (Vitest + RTL)

- [ ] Install: `vitest`, `@vitest/ui`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`, `msw`
- [ ] Configure `vitest.config.ts` with `jsdom` environment
- [ ] Write tests:
  - `useHTTP.test.ts` — loading/error/success states
  - `setContent.test.tsx` — renders correct component per status
  - `CharSearchForm.test.tsx` — validation, submit, results display
  - `ErrorBoundary.test.tsx` — catches errors, shows ErrorMessage
  - `CharList.test.tsx` — renders list, load more button, end of list state
  - `RandomChar.test.tsx` — character data, loading state

## Phase 6 — Polish

- [ ] Add "Try again" button to error states
- [ ] Create `.env.example` with `VITE_REACT_APP_MARVEL_API_KEY=your_key_here`
- [ ] Write professional `README.md`: description, stack badges, screenshots, setup instructions, live demo link
- [ ] Deploy to Vercel (connect GitHub repo)

## Verification Checklist

- [ ] `npx tsc --noEmit` — 0 errors
- [ ] `npm run test` — all tests pass
- [ ] `npm run dev` — app runs correctly
- [ ] `npm run lint` — 0 ESLint errors
- [ ] Deployed URL opens in browser
