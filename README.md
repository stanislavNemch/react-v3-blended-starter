# Проєкт "ПОСТИ: ПОШУК, СТВОРЕННЯ, РЕДАГУВАННЯ"

Це односторінковий веб-застосунок (SPA) для управління постами, який дозволяє користувачам переглядати, шукати, створювати, редагувати та видаляти пости. Взаємодія з даними відбувається через публічний REST API [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

---

## 🇺🇦 Українська версія

### 🚀 Технології та інструменти

- **React 19**: Основа застосунку, використовується для побудови інтерфейсу користувача.
- **TypeScript**: Додає статичну типізацію для підвищення надійності та якості коду.
- **Vite**: Швидкий та сучасний збирач проєктів для веб-розробки.
- **TanStack Query (React Query) v5**: Для управління станом сервера, кешування, та синхронізації даних.
- **Axios**: Для виконання HTTP-запитів до API.
- **Formik**: Для зручного створення форм та управління їх станом.
- **Yup**: Для валідації даних у формах.
- **React Paginate**: Компонент для реалізації пагінації.
- **React Hot Toast**: Для відображення сповіщень.
- **CSS Modules**: Для інкапсуляції стилів на рівні компонентів.

### 📂 Структура проєкту

```
react-v3-blended-starter/
├── public/               # Папка для статичних файлів (іконки, зображення)
├── src/                  # Основна папка з вихідним кодом проєкту
│   ├── components/       # Папка з усіма React-компонентами
│   │   ├── App/          # Головний компонент-контейнер, що збирає всі частини застосунку
│   │   ├── CreatePostForm/ # Компонент форми для створення нового поста
│   │   ├── EditPostForm/ # Компонент форми для редагування існуючого поста
│   │   ├── Modal/        # Універсальний компонент модального вікна
│   │   ├── Pagination/   # Компонент для навігації по сторінках
│   │   ├── PostList/     # Компонент, що відображає список усіх постів
│   │   └── SearchBox/    # Компонент поля для пошуку постів
│   ├── hooks/            # Папка для кастомних React-хуків (напр., useDebounce)
│   ├── services/         # Функції для взаємодії з зовнішнім API (API Layer)
│   ├── types/            # Файли з описом типів TypeScript (напр., IPost)
│   ├── global.css        # Глобальні стилі
│   └── main.tsx          # Вхідна точка застосунку, де відбувається рендер App
├── .gitignore            # Файл для ігнорування файлів системою контролю версій Git
├── index.html            # Головний HTML-файл, куди монтується React-застосунок
├── package.json          # Файл з метаданими проєкту та списком залежностей
└── README.md             # Інформація про проєкт (цей файл)
```

### ⚙️ Встановлення та запуск

1.  **Клонуйте репозиторій:**

    ```bash
    git clone <URL вашого репозиторію>
    ```

2.  **Перейдіть у директорію проєкту:**

    ```bash
    cd <назва-папки-проєкту>
    ```

3.  **Встановіть залежності:**

    ```bash
    npm install
    ```

4.  **Запустіть проєкт у режимі розробки:**

    ```bash
    npm run dev
    ```

    Після цього відкрийте браузер і перейдіть за адресою, вказаною у терміналі (зазвичай `http://localhost:5173`).

<br>

---

<br>

## 🇬🇧 English version

### Project "POSTY: SEARCH, CREATE, EDITING"

This is a single-page application (SPA) for managing posts, allowing users to view, search, create, edit, and delete posts. Data interaction is handled through the public REST API [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

### 🚀 Technologies and Tools

- **React 19**: The core of the application, used for building the user interface.
- **TypeScript**: Adds static typing to enhance code reliability and quality.
- **Vite**: A fast and modern build tool for web development.
- **TanStack Query (React Query) v5**: For server state management, caching, and data synchronization.
- **Axios**: For making HTTP requests to the API.
- **Formik**: For convenient form creation and state management.
- **Yup**: For data validation in forms.
- **React Paginate**: A component for implementing pagination.
- **React Hot Toast**: For displaying notifications.
- **CSS Modules**: For encapsulating styles at the component level.

### 📂 Project Structure

```
react-v3-blended-starter/
├── public/               # Folder for static assets (icons, images)
├── src/                  # Main folder with the project's source code
│   ├── components/       # Folder with all React components
│   │   ├── App/          # The main container component that assembles all parts of the application
│   │   ├── CreatePostForm/ # Form component for creating a new post
│   │   ├── EditPostForm/ # Form component for editing an existing post
│   │   ├── Modal/        # Universal modal window component
│   │   ├── Pagination/   # Component for page navigation
│   │   ├── PostList/     # Component that displays the list of all posts
│   │   └── SearchBox/    # Search input field component
│   ├── hooks/            # Folder for custom React hooks (e.g., useDebounce)
│   ├── services/         # Functions for interacting with the external API (API Layer)
│   ├── types/            # Files with TypeScript type definitions (e.g., IPost)
│   ├── global.css        # Global styles
│   └── main.tsx          # The application's entry point where App is rendered
├── .gitignore            # File for ignoring files in the Git version control system
├── index.html            # The main HTML file where the React application is mounted
├── package.json          # File with project metadata and list of dependencies
└── README.md             # Project information (this file)
```

### ⚙️ Installation and Setup

1.  **Clone the repository:**

    ```bash
    git clone <your repository URL>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd <project-folder-name>
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Run the project in development mode:**

    ```bash
    npm run dev
    ```

    After this, open your browser and navigate to the address specified in the terminal (usually `http://localhost:5173`).
