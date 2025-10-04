# Blended Next.js Posts Project

Цей проєкт є практичним застосунком, створеним для вивчення та демонстрації сучасних можливостей Next.js 15, включаючи App Router, Server-Side Rendering (SSR), React Query та розширені патерни маршрутизації.

---

This project is a hands-on application built to learn and demonstrate the modern capabilities of Next.js 15, including the App Router, Server-Side Rendering (SSR), React Query, and advanced routing patterns.

## 🚀 Реалізований функціонал (Features)

1.  **Сторінка зі списком постів (`/posts/filter/[userId]`)**:

    - **Фільтрація за автором**: Бічна панель дозволяє фільтрувати пости за конкретним автором або переглядати всі.
    - **Пошук**: Поле для повнотекстового пошуку по заголовку та вмісту постів з дебаунсом у 300 мс.
    - **Пагінація**: Плавна навігація по сторінках без перезавантаження.
    - **Створення та редагування**: Модальні вікна для створення нових та редагування існуючих постів з валідацією форм.
    - **Видалення**: Можливість видаляти пости зі списку.

2.  **Сторінка деталей поста (`/posts/[id]`)**:

    - **SSR та Гідратація**: Сторінка генерується на сервері, а дані (пост та автор) попередньо завантажуються за допомогою React Query та "гідруються" на клієнті.
    - **Динамічне SEO**: Метадані (`<title>`, `<description>`) генеруються на сервері на основі вмісту поста.

3.  **Перехоплення маршруту для перегляду (`@modal/(.)posts/[id]`)**:
    - При кліку на пост у списку, він відкривається у модальному вікні замість переходу на окрему сторінку.
    - Прямий перехід за URL або оновлення сторінки відкриває повну сторінку деталей поста.

## 🛠️ Вивчені концепції та технології (Concepts & Technologies)

- **Next.js 15**:
  - **App Router**: Організація структури проєкту.
  - **Server & Client Components**: Розділення логіки між сервером та клієнтом.
  - **Server-Side Rendering (SSR)**: Попередній рендеринг сторінок на сервері.
  - **Layouts**: Створення спільних UI-компонентів для маршрутів.
  - **Dynamic Routes**: Динамічні сегменти URL (`[id]`, `[...slug]`).
  - **Parallel & Intercepting Routes**: Рендеринг модальних вікон без зміни основного контенту.
  - **`generateMetadata`**: Динамічна генерація SEO-тегів.
- **TanStack Query (React Query) v5**:
  - **`useQuery`**: Клієнтське кешування, отримання та синхронізація даних.
  - **`useMutation`**: Зміна даних на сервері (створення, редагування, видалення).
  - **`queryClient.invalidateQueries`**: Оновлення застарілих даних.
  - **SSR Integration**: Попереднє завантаження (`prefetchQuery`) та гідратація (`HydrationBoundary`).
- **React 18**:
  - Хуки (`useState`, `useEffect`).
- **TypeScript**: Типізація всього застосунку.
- **Axios**: HTTP-клієнт для запитів до API.
- **Formik & Yup**: Керування формами та валідація даних.
- **CSS Modules**: Локальна стилізація компонентів.

## 📂 Структура проєкту (Project Structure)

Основна логіка маршрутизації зосереджена в директорії `app/`.

```
app/
├── @modal/
│   └── (.)posts/
│       └── [id]/
│           └── page.tsx         // Перехоплений маршрут: рендерить пост у модальному вікні.
│
├── posts/
│   ├── [id]/
│   │   └── page.tsx             // Динамічна сторінка для перегляду одного поста.
│   │
│   ├── filter/
│   │   └── [...slug]/
│   │       └── page.tsx         // Сторінка зі списком постів (фільтр 'All' або за ID автора).
│   │
│   ├── layout.tsx               // Спільний layout для розділу /posts з бічною панеллю фільтрації.
│   │
│   └── page.tsx                 // Головна сторінка розділу, редиректить на /posts/filter/All.
│
└── layout.tsx                   // Кореневий layout застосунку.
```

## ⚙️ Встановлення та запуск (Installation & Startup)

1.  **Клонуйте репозиторій:**

    ```bash
    git clone <repository-url>
    cd react-v3-blended-starter
    ```

2.  **Встановіть залежності:**

    ```bash
    npm install
    ```

3.  **Запустіть проєкт у режимі розробки:**

    ```bash
    npm run dev
    ```

4.  **Відкрийте браузер** і перейдіть за адресою http://localhost:3000/posts.

---

## English Version

### 🚀 Implemented Features

1.  **Post List Page (`/posts/filter/[userId]`)**:

    - **Filter by Author**: A sidebar allows filtering posts by a specific author or viewing all posts.
    - **Search**: A full-text search field for post titles and content with a 300ms debounce.
    - **Pagination**: Smooth page navigation without full reloads.
    - **Create & Edit**: Modal windows for creating new and editing existing posts with form validation.
    - **Delete**: Ability to delete posts from the list.

2.  **Post Detail Page (`/posts/[id]`)**:

    - **SSR & Hydration**: The page is server-side rendered, and data (post and author) is pre-fetched using React Query and hydrated on the client.
    - **Dynamic SEO**: Metadata (`<title>`, `<description>`) is generated on the server based on the post's content.

3.  **Intercepted Route for Preview (`@modal/(.)posts/[id]`)**:
    - When a post is clicked in the list, it opens in a modal window instead of navigating to a separate page.
    - A direct URL visit or page refresh opens the full post detail page.

### 🛠️ Learned Concepts & Technologies

- **Next.js 15**:
  - **App Router**: Project structure organization.
  - **Server & Client Components**: Separating logic between the server and the client.
  - **Server-Side Rendering (SSR)**: Pre-rendering pages on the server.
  - **Layouts**: Creating shared UI components for routes.
  - **Dynamic Routes**: Dynamic URL segments (`[id]`, `[...slug]`).
  - **Parallel & Intercepting Routes**: Rendering modals without changing the main content.
  - **`generateMetadata`**: Dynamic generation of SEO tags.
- **TanStack Query (React Query) v5**:
  - **`useQuery`**: Client-side caching, fetching, and data synchronization.
  - **`useMutation`**: Modifying data on the server (create, edit, delete).
  - **`queryClient.invalidateQueries`**: Updating stale data.
  - **SSR Integration**: Pre-fetching (`prefetchQuery`) and hydration (`HydrationBoundary`).
- **React 18**:
  - Hooks (`useState`, `useEffect`).
- **TypeScript**: Type safety across the entire application.
- **Axios**: HTTP client for API requests.
- **Formik & Yup**: Form management and data validation.
- **CSS Modules**: Scoped styling for components.

### ⚙️ Installation & Startup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd react-v3-blended-starter
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the project in development mode:**

    ```bash
    npm run dev
    ```

4.  **Open your browser** and navigate to http://localhost:3000/posts.
