[Read in English](README.md) | [Читать на русском](README.ru.md)

# Marvel Comics Portal

Современный браузер комиксов Marvel, построенный на React, TypeScript и Vite. Исследуйте персонажей, просматривайте детали и открывайте для себя комиксы вселенной Marvel.

![React](https://img.shields.io/badge/React-19.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1-green?logo=vite)
![Vitest](https://img.shields.io/badge/Vitest-4.1-green?logo=vitest)

🎨 **Макет дизайна:** [Marvel DB на Figma](https://www.figma.com/design/xiC1B6ZlHvbiUK6FO3caxN/Marvel-DB?node-id=1883-212&t=AzJ8LTDqg8Q8G9mv-1)

## Возможности

- 🔍 **Поиск персонажей** — Поиск персонажей Marvel по имени с валидацией через Formik
- 🎲 **Случайный персонаж** — Ежедневное открытие нового персонажа
- 📚 **Просмотр комиксов** — Список комиксов с пагинацией
- 🛡️ **Обработка ошибок** — Механизм повторных запросов при сбоях
- 🧪 **Полное покрытие тестами** — 28+ юнит-тестов на Vitest и React Testing Library
- ⚡ **Быстрая разработка** — HMR с Vite, строгий режим TypeScript
- 📱 **Адаптивный дизайн** — Мобильная верстка с адаптивной панелью информации о персонаже
- ⚙️ **Context API** — Общее состояние для предотвращения дублирования API-запросов при переключении страниц

## Ключевые улучшения

Лог основных улучшений, внесённых в ходе разработки:

- 🔷 **Миграция на TypeScript** — Весь проект переведён на TypeScript для типобезопасности и улучшения опыта разработки
- 🖼️ **Оптимизация изображений** — Настроен плагин Vite Image Optimizer для автоматического сжатия и оптимизации ресурсов при сборке
- 📱 **Адаптивная вёрстка** — Добавлено адаптивное поведение для разных размеров экранов; информация о персонаже отображается в оверлей-панели на мобильных устройствах при выборе персонажа
- 🎨 **Стилизация по БЭМ и рефакторинг** — Доработаны БЭМ-соглашения именования, удалены дубликаты CSS, консолидированы переиспользуемые блоки стилей
- ⚙️ **Интеграция Context API** — Реализован React Context для обмена данными о персонажах между страницами, что исключает дублирование API-запросов и обеспечивает более плавный пользовательский опыт

## Стек технологий

- **Фронтенд:** React 19.1 + TypeScript 6.0
- **Сборка:** Vite 7.1 + Vite Image Optimizer
- **Тестирование:** Vitest 4.1 + @testing-library/react + MSW
- **Стилизация:** SCSS с PostCSS
- **Роутинг:** React Router v6
- **Формы:** Formik
- **API:** Marvel API (через прокси marvel-server-zeta)

## Структура проекта

```
marvel-comics/
├── public/                          # Статические файлы
├── src/
│   ├── assets/
│   │   ├── images/                  # Изображения
│   │   └── styles/
│   │       ├── animation.scss       # Keyframe-анимации
│   │       ├── global.scss          # Глобальные стили
│   │       ├── index.scss           # Главная точка входа стилей
│   │       ├── variables.scss       # CSS-переменные и миксины
│   │       └── blocks/
│   │           └── button.scss      # Стили компонента кнопки
│   │
│   ├── components/
│   │   ├── App/                     # Корневой компонент
│   │   │   ├── App.tsx
│   │   │   └── app.scss
│   │   ├── AppBanner/               # Баннер в шапке
│   │   ├── CharInfo/                # Детальный просмотр персонажа
│   │   ├── CharList/                # Список персонажей с пагинацией
│   │   ├── CharSearchForm/          # Форма поиска (на Formik)
│   │   ├── ComicsList/              # Список комиксов с пагинацией
│   │   ├── ErrorBoundary/           # Обёртка обработки ошибок
│   │   ├── ErrorMessage/            # Отображение ошибки с повтором
│   │   ├── Header/                  # Навигационная шапка
│   │   ├── NavLink/                 # Пользовательский компонент ссылки
│   │   ├── RandomChar/              # Секция случайного персонажа
│   │   ├── SingleChar/              # Страница отдельного персонажа
│   │   ├── SingleComic/             # Страница отдельного комикса
│   │   ├── SingleItemLayout/        # Макет для отдельных элементов
│   │   ├── Skeleton/                # Скелетон загрузки
│   │   ├── Spinner/                 # Спиннер загрузки
│   │   └── pages/
│   │       ├── MainPage.tsx         # Главная страница
│   │       ├── ComicsPage.tsx       # Страница комиксов
│   │       ├── SingleLayoutPage.tsx # Обёртка детальной страницы
│   │       ├── NoMatch.tsx          # Страница 404
│   │       └── index.tsx            # Экспорты страниц
│   │
│   ├── hooks/
│   │   ├── useHTTP.ts               # Универсальный HTTP-хук с обработкой ошибок
│   │   ├── usePagination.ts         # Хук логики пагинации
│   │   ├── useFocusOnNewItems.ts    # Управление фокусом для новых элементов
│   │   ├── useCharactersContext.ts  # Контекст данных персонажей
│   │   └── index.ts                 # Экспорты хуков
│   │
│   ├── services/
│   │   └── MarvelService.ts         # Сервис Marvel API и вызовы эндпоинтов
│   │
│   ├── types/
│   │   └── index.ts                 # TypeScript-интерфейсы (Character, Comic и т.д.)
│   │
│   ├── utils/
│   │   └── setContent.tsx           # Логика рендера по асинхронному статусу
│   │
│   ├── tests/
│   │   ├── setup.ts                 # Настройка Vitest (MSW, RTL)
│   │   ├── mocks/
│   │   │   ├── handlers.ts          # MSW обработчики запросов
│   │   │   └── server.ts            # Инстанс MSW сервера
│   │   ├── useHTTP.test.ts          # Тесты HTTP-хука
│   │   ├── setContent.test.tsx      # Тесты рендерера контента
│   │   ├── ErrorBoundary.test.tsx   # Тесты обработки ошибок
│   │   ├── usePagination.test.ts    # Тесты хука пагинации
│   │   └── CharSearchForm.test.tsx  # Тесты формы поиска
│   │
│   ├── main.jsx                     # Точка входа приложения
│   └── vite-env.d.ts                # Объявления типов Vite
│
├── .env.example                     # Шаблон переменных окружения
├── .env.development                 # Переменные окружения для разработки (только локально)
├── .env.production                  # Переменные окружения для продакшена (только локально)
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
└── vite.config.ts

```

## Быстрый старт

### Требования

- Node.js 18+
- npm или yarn

### Установка

```bash
git clone https://github.com/TIIGRUS/marvel-comics.git
cd marvel-comics
npm install
```

### Настройка окружения

Скопируйте `.env.example` в `.env.development`:

```bash
cp .env.example .env.development
```

Затем добавьте свой API-ключ Marvel:

```
VITE_REACT_APP_MARVEL_API_KEY=ваш_публичный_ключ
```

### Команды

**Разработка:**

```bash
npm run dev
```

Запускает dev-сервер на http://localhost:5173

**Сборка:**

```bash
npm run build
```

Создаёт оптимизированную продакшен-сборку

**Тестирование:**

```bash
npm test
```

**Проверка типов:**

```bash
npm run types
```

Запускает проверку типов TypeScript

**Линтинг:**

```bash
npm run lint
```

Проверяет код с помощью ESLint

## Тестирование

- **Юнит-тесты** для хуков: `useHTTP`, `usePagination`
- **Компонентные тесты** для форм и состояний ошибок
- **Интеграционная настройка** с MSW для мокирования API
- **28+ тестов**, покрывающих основную функциональность

## Демо

🔗 [marvel-comics.vercel.app](https://marvel-comics-i7ia.vercel.app)

## Данные API

Данные о персонажах и комиксах получены из Marvel API через [marvel-server-zeta](https://marvel-server-zeta.vercel.app/)

## Лицензия

MIT
