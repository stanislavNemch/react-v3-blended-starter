// Імпортуємо необхідні типи та функції
import { Metadata } from 'next';
import { fetchPosts } from '@/lib/api';
import PostsClient from '@/components/PostsClient/PostsClient';

// Визначаємо типи для пропсів, які отримує наша сторінка
type Props = {
  params: { slug: string[] }; // Динамічні параметри з URL, наприклад ['5'] або ['All']
  searchParams: { [key: string]: string | string[] | undefined }; // Параметри запиту, наприклад ?page=2
};

// Функція для генерації динамічних метаданих (SEO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Отримуємо ID користувача з параметрів URL
  const userId = params.slug[0];

  // Формуємо заголовок сторінки в залежності від того, чи вибраний конкретний користувач
  const title = userId === 'All' ? 'Posts - All Users' : `Posts - User ${userId}`;

  return {
    title,
  };
}

// Це наш головний компонент сторінки (Серверний Компонент)
export default async function FilteredPostsPage({ params, searchParams }: Props) {
  // Визначаємо ID користувача. Якщо в URL 'All', то userId буде undefined,
  // і ми отримаємо пости всіх користувачів.
  const userId = params.slug[0] === 'All' ? undefined : params.slug[0];

  // Отримуємо поточну сторінку та текст пошуку з параметрів запиту.
  // Якщо їх немає, використовуємо значення за замовчуванням.
  const currentPage = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.q as string) || '';

  // Робимо запит на сервер для отримання постів (SSR).
  // Next.js дочекається виконання цього запиту перед відправкою сторінки клієнту.
  const { posts, totalCount } = await fetchPosts({
    page: currentPage,
    searchText,
    userId,
  });

  // Рендеримо клієнтський компонент і передаємо йому отримані дані як пропси.
  return <PostsClient initialPosts={posts} totalCount={totalCount} userId={params.slug[0]} />;
}
