import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { fetchPostById } from '@/lib/api';
import PostPreviewClient from './PostPreview.client';

type Props = {
  params: { id: string };
};

export default async function PostModalPage({ params }: Props) {
  // Await params before accessing its properties
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  const queryClient = new QueryClient();

  // Попередньо завантажуємо дані поста на сервері
  await queryClient.prefetchQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostPreviewClient />
    </HydrationBoundary>
  );
}
