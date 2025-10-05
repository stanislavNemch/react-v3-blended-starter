'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { fetchPostById, fetchUserById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './PostPreview.module.css';

export default function PostPreviewClient() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const handleClose = () => {
    router.back();
  };

  // Запит для отримання даних поста
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
    enabled: !!id,
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
    enabled: !!post?.userId,
    refetchOnMount: false,
  });

  const isLoading = isPostLoading || isUserLoading;
  const isError = isPostError || isUserError;

  return (
    <Modal onClose={handleClose}>
      <button onClick={handleClose} className={css.backBtn}>
        &larr; Back
      </button>
      {isLoading && <p className={css.message}>Loading, please wait....</p>}
      {isError && <p className={css.message}>Something went wrong.</p>}
      {post && user && (
        <div className={css.post}>
          <div className={css.wrapper}>
            <div className={css.header}>
              <h2>{post.title}</h2>
            </div>
            <p className={css.content}>{post.body}</p>
          </div>
          <p className={css.user}>Author: {user.name}</p>
        </div>
      )}
    </Modal>
  );
}
