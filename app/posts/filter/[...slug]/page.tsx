// Імпортуємо необхідні типи та функції
import { Metadata } from 'next';
import { fetchPosts } from '@/lib/api';
import PostsClient from '../../Posts.client';

// Визначаємо типи для пропсів, які отримує наша сторінка
type Props = {
  params: Promise<{ slug: string[] }>; // Динамічні параметри з URL, наприклад ['5'] або ['All']
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>; // Параметри запиту, наприклад ?page=2
};

// Функція для генерації динамічних метаданих (SEO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const userId = resolvedParams.slug[0];

  const title = userId === 'All' ? 'Posts - All Users' : `Posts - User ${userId}`;

  return {
    title,
  };
}

// Це наш головний компонент сторінки (Серверний Компонент)
export default async function FilteredPostsPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const userId = resolvedParams.slug[0] === 'All' ? undefined : resolvedParams.slug[0];
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const searchText = (resolvedSearchParams?.q as string) || '';

  // Робимо запит на сервер для отримання постів (SSR).
  // Next.js дочекається виконання цього запиту перед відправкою сторінки клієнту.
  const { posts, totalCount } = await fetchPosts({
    page: currentPage,
    searchText,
    userId,
  });

  // Рендеримо клієнтський компонент і передаємо йому отримані дані як пропси.
  return <PostsClient initialData={{ posts, totalCount }} userId={resolvedParams.slug[0]} />;
}
