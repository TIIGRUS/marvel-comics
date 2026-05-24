[Read in English](README.md) | [Читать на русском](README.ru.md)

# Marvel Comics Portal

A modern Marvel Comics browser built with React, TypeScript, and Vite. Explore characters, view details, and discover comics from the Marvel Universe.

![React](https://img.shields.io/badge/React-19.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1-green?logo=vite)
![Vitest](https://img.shields.io/badge/Vitest-4.1-green?logo=vitest)

🎨 **Design Mockup:** [Marvel DB on Figma](https://www.figma.com/design/xiC1B6ZlHvbiUK6FO3caxN/Marvel-DB?node-id=1883-212&t=AzJ8LTDqg8Q8G9mv-1)

## Features

- 🔍 **Search Characters** — Find Marvel characters by name with Formik validation
- 🎲 **Random Character** — Discover a new character daily
- 📚 **Browse Comics** — Pagination-based comic listing
- 🛡️ **Error Handling** — Retry mechanism for failed requests
- 🧪 **Full Test Coverage** — 28+ unit tests with Vitest & React Testing Library
- ⚡ **Fast Development** — HMR with Vite, TypeScript strict mode
- 📱 **Responsive Design** — Mobile-friendly layout with adaptive character info panel
- ⚙️ **Context API** — Shared state to avoid redundant API calls between page switches

## Key Enhancements

A log of notable improvements made during development:

- 🔷 **TypeScript Migration** — Entire project converted to TypeScript for type safety and improved developer experience
- 🖼️ **Image Optimization** — Configured Vite Image Optimizer plugin to automatically compress and optimize assets on build
- 📱 **Responsive / Adaptive Layout** — Added adaptive behavior across breakpoints; character info now displays in an overlay panel on mobile when a character is selected
- 🎨 **BEM Styling & Refactoring** — Refined BEM naming conventions, removed duplicate CSS, and consolidated reusable style blocks
- ⚙️ **Context API Integration** — Implemented React Context to share character data across pages, eliminating redundant API requests and creating a smoother user experience

## Tech Stack

- **Frontend:** React 19.1 + TypeScript 6.0
- **Build:** Vite 7.1 + Vite Image Optimizer
- **Testing:** Vitest 4.1 + @testing-library/react + MSW
- **Styling:** SCSS with PostCSS
- **Routing:** React Router v6
- **Forms:** Formik
- **API:** Marvel API (via marvel-server-zeta proxy)

## Project Structure

```
marvel-comics/
├── public/                          # Static assets
├── src/
│   ├── assets/
│   │   ├── images/                  # Image files
│   │   └── styles/
│   │       ├── animation.scss       # Keyframe animations
│   │       ├── global.scss          # Global styles
│   │       ├── index.scss           # Main style entry
│   │       ├── variables.scss       # CSS variables & mixins
│   │       └── blocks/
│   │           └── button.scss      # Button component styles
│   │
│   ├── components/
│   │   ├── App/                     # Root component
│   │   │   ├── App.tsx
│   │   │   └── app.scss
│   │   ├── AppBanner/               # Header banner
│   │   ├── CharInfo/                # Character detail view
│   │   ├── CharList/                # Character list with pagination
│   │   ├── CharSearchForm/          # Search form (Formik-based)
│   │   ├── ComicsList/              # Comics list with pagination
│   │   ├── ErrorBoundary/           # Error boundary wrapper
│   │   ├── ErrorMessage/            # Error display with retry
│   │   ├── Header/                  # Navigation header
│   │   ├── NavLink/                 # Custom link component
│   │   ├── RandomChar/              # Random character section
│   │   ├── SingleChar/              # Single character detail page
│   │   ├── SingleComic/             # Single comic detail page
│   │   ├── SingleItemLayout/        # Layout for single items
│   │   ├── Skeleton/                # Loading skeleton
│   │   ├── Spinner/                 # Loading spinner
│   │   └── pages/
│   │       ├── MainPage.tsx         # Home page
│   │       ├── ComicsPage.tsx       # Comics page
│   │       ├── SingleLayoutPage.tsx # Generic detail page wrapper
│   │       ├── NoMatch.tsx          # 404 page
│   │       └── index.tsx            # Page exports
│   │
│   ├── hooks/
│   │   ├── useHTTP.ts               # Generic HTTP hook with error handling
│   │   ├── usePagination.ts         # Pagination logic hook
│   │   ├── useFocusOnNewItems.ts    # Focus management for new items
│   │   ├── useCharactersContext.ts  # Characters data context
│   │   └── index.ts                 # Hook exports
│   │
│   ├── services/
│   │   └── MarvelService.ts         # Marvel API service & endpoint calls
│   │
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces (Character, Comic, etc)
│   │
│   ├── utils/
│   │   └── setContent.tsx           # Render logic by async status
│   │
│   ├── tests/
│   │   ├── setup.ts                 # Vitest setup (MSW, RTL)
│   │   ├── mocks/
│   │   │   ├── handlers.ts          # MSW request handlers
│   │   │   └── server.ts            # MSW server instance
│   │   ├── useHTTP.test.ts          # HTTP hook tests
│   │   ├── setContent.test.tsx      # Content renderer tests
│   │   ├── ErrorBoundary.test.tsx   # Error boundary tests
│   │   ├── usePagination.test.ts    # Pagination hook tests
│   │   └── CharSearchForm.test.tsx  # Search form tests
│   │
│   ├── main.jsx                     # App entry point
│   └── vite-env.d.ts                # Vite type declarations
│
├── .env.example                     # Environment template
├── .env.development                 # Dev env (local only)
├── .env.production                  # Prod env (local only)
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
└── vite.config.ts

```

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/TIIGRUS/marvel-comics.git
cd marvel-comics
npm install
```

### Environment Setup

Copy `.env.example` to `.env.development`:

```bash
cp .env.example .env.development
```

Then add your Marvel API key:

```
VITE_REACT_APP_MARVEL_API_KEY=your_public_key_here
```

### Commands

**Development:**

```bash
npm run dev
```

Starts dev server on http://localhost:5173

**Build:**

```bash
npm run build
```

Creates optimized production build

**Testing:**

```bash
npm test
```

**Type Check:**

```bash
npm run types
```

Runs TypeScript type checker

**Lint:**

```bash
npm run lint
```

Checks code with ESLint

## Testing

- **Unit tests** for hooks: `useHTTP`, `usePagination`
- **Component tests** for forms and error states
- **Integration setup** with MSW for API mocking
- **28+ tests** covering core functionality

## Live Demo

🔗 [marvel-comics.vercel.app](https://marvel-comics-i7ia.vercel.app)

## API Data

Characters and comics data sourced from Marvel API via [marvel-server-zeta](https://marvel-server-zeta.vercel.app/)

## License

MIT
