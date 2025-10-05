'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchPostById, fetchUserById } from '@/lib/api';

import css from './PostDetails.module.css';

export default function PostDetailsClient() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  // Запит для отримання даних поста
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
    enabled: !!id, // Запускати запит тільки якщо id існує
    refetchOnMount: false,
  });

  // Запит для отримання даних автора
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ['user', post?.userId],
    queryFn: () => fetchUserById(post!.userId),
    enabled: !!post?.userId, // Запускати запит тільки коли отримали ID автора
    refetchOnMount: false,
  });

  if (isPostLoading) {
    return <p className={css.content}>Loading post...</p>;
  }

  if (isPostError || isUserError) {
    return <p className={css.content}>Something went wrong.</p>;
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <button className={css.backBtn} onClick={() => router.back()}>
            ← Back
          </button>

          {post && (
            <div className={css.post}>
              <div className={css.wrapper}>
                <div className={css.header}>
                  <h2>{post.title}</h2>
                </div>
                <p className={css.content}>{post.body}</p>
              </div>
              <p className={css.user}>Author: {isUserLoading ? 'Loading...' : user?.name}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
