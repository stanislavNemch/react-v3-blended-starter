# Проєкт "Галерея Зображень" (Photo Gallery)

Це односторінковий веб-застосунок (SPA) для пошуку та перегляду зображень. Користувачі можуть вводити пошуковий запит, отримувати сітку зображень у відповідь та переглядати будь-яке зображення у модальному вікні. Проєкт використовує [Pexels API](https://www.pexels.com/api/) для отримання фото.

---

## 🇺🇦 Українська версія

### 🚀 Технології та інструменти

-   **React 19**: Бібліотека для створення користувацьких інтерфейсів.
-   **TypeScript**: Надає статичну типізацію для підвищення надійності коду.
-   **Vite**: Сучасний та швидкий інструмент для збірки проєкту.
-   **Axios**: Клієнт для виконання HTTP-запитів до Pexels API.
-   **React Hot Toast**: Для відображення сповіщень (наприклад, про помилки або порожній результат пошуку).
-   **React Icons**: Для іконок у застосунку (наприклад, іконка пошуку).
-   **React Spinners**: Для відображення індикатора завантаження.
-   **CSS Modules**: Для локалізації стилів компонентів.

### 📂 Структура проєкту

```
photo-gallery/
├── public/               # Папка для статичних файлів (напр., favicon)
├── src/                  # Основна папка з вихідним кодом проєкту
│   ├── components/       # Папка з усіма React-компонентами
│   │   ├── App/          # Головний компонент, який керує станом та логікою застосунку
│   │   ├── Container/    # Компонент-обгортка для центрування контенту
│   │   ├── Form/         # Компонент форми пошуку
│   │   ├── Grid/         # Компонент для відображення сітки
│   │   ├── GridItem/     # Елемент сітки
│   │   ├── Loader/       # Компонент індикатора завантаження
│   │   ├── Modal/        # Компонент модального вікна для перегляду зображень
│   │   ├── PhotosGallery/      # Компонент галереї, що рендерить список зображень
│   │   ├── PhotosGalleryItem/  # Компонент одного зображення в галереї
│   │   ├── Section/      # Компонент для секціонування сторінки
│   │   └── Text/         # Компонент для відображення тексту
│   ├── services/         # Функції для взаємодії з Pexels API
│   │   └── photos.ts
│   ├── types/            # Опис типів TypeScript
│   │   └── photo.ts
│   ├── global.css        # Глобальні стилі
│   └── main.tsx          # Вхідна точка застосунку
├── .env.example          # Приклад файлу змінних середовища
├── index.html            # Головний HTML-файл
├── package.json          # Файл з метаданими проєкту та залежностями
└── README.md             # Інформація про проєкт
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

4.  **Створіть файл `.env`:**
    Створіть файл `.env` у кореневій папці проєкту та додайте до нього ваш ключ доступу до Pexels API. Отримати ключ можна на [сайті Pexels](https://www.google.com/search?q=https://www.pexels.com/api/new/).

    ```
    VITE_API_KEY_PEXELS="ВАШ_API_КЛЮЧ"
    ```

5.  **Запустіть проєкт:**

    ```bash
    npm run dev
    ```

    Відкрийте у браузері адресу, вказану в терміналі (зазвичай `http://localhost:5173`).

<br>

---

<br>

## 🇬🇧 English version

### Project "Photo Gallery"

This is a single-page application (SPA) for searching and viewing images. Users can enter a search query, receive a grid of images in response, and view any image in a modal window. The project utilizes the [Pexels API](https://www.pexels.com/api/) to fetch photos.

### 🚀 Technologies and Tools

-   **React 19**: A library for building user interfaces.
-   **TypeScript**: Provides static typing to enhance code reliability.
-   **Vite**: A modern and fast build tool for web development.
-   **Axios**: A client for making HTTP requests to the Pexels API.
-   **React Hot Toast**: For displaying notifications (e.g., for errors or empty search results).
-   **React Icons**: For icons used in the application (e.g., search icon).
-   **React Spinners**: For displaying a loading indicator.
-   **CSS Modules**: For localizing component styles.

### 📂 Project Structure

```
photo-gallery/
├── public/               # Folder for static assets (e.g., favicon)
├── src/                  # Main folder with the project's source code
│   ├── components/       # Folder with all React components
│   │   ├── App/          # Main component that manages the application's state and logic
│   │   ├── Container/    # Wrapper component for content centering
│   │   ├── Form/         # Search form component
│   │   ├── Grid/         # Component for displaying a grid layout
│   │   ├── GridItem/     # A single item within the grid
│   │   ├── Loader/       # Loading indicator component
│   │   ├── Modal/        # Modal window component for viewing images
│   │   ├── PhotosGallery/      # Gallery component that renders a list of images
│   │   ├── PhotosGalleryItem/  # Component for a single photo in the gallery
│   │   ├── Section/      # Component for sectioning the page
│   │   └── Text/         # Component for displaying text
│   ├── services/         # Functions for interacting with the Pexels API
│   │   └── photos.ts
│   ├── types/            # TypeScript type definitions
│   │   └── photo.ts
│   ├── global.css        # Global styles
│   └── main.tsx          # Application entry point
├── .env.example          # Example environment variables file
├── index.html            # Main HTML file
├── package.json          # File with project metadata and dependencies
└── README.md             # Project information
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

4.  **Create a `.env` file:**
    Create a `.env` file in the root of the project and add your Pexels API access key. You can obtain a key from the [Pexels website](https://www.google.com/search?q=https://www.pexels.com/api/new/).

    ```
    VITE_API_KEY_PEXELS="YOUR_API_KEY"
    ```

5.  **Run the project:**

    ```bash
    npm run dev
    ```

    Open the address provided in your terminal (usually `http://localhost:5173`) in your browser.
