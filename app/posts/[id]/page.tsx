import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { fetchPostById } from '@/lib/api';
import PostDetailsClient from './PostDetails.client';

type Props = {
  params: Promise<{ id: string }>;
};

// Функція для генерації динамічних метаданих (SEO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  // Отримуємо пост на сервері, щоб взяти з нього дані для метатегів
  const post = await fetchPostById(id);

  return {
    // Встановлюємо заголовок сторінки рівним заголовку поста
    title: post.title,
    // Встановлюємо опис сторінки - перші 30 символів тіла поста
    description: post.body.substring(0, 30) + '...',
  };
}

// Серверний компонент сторінки
export default async function PostPage({ params }: Props) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  const queryClient = new QueryClient();

  // Робимо попереднє завантаження даних поста
  await queryClient.prefetchQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailsClient />
    </HydrationBoundary>
  );
}
