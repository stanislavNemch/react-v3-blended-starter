'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import PostList from '@/components/PostList/PostList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import { fetchPosts } from '@/lib/api';

import css from './page.module.css';
import Modal from '@/components/Modal/Modal';
import { Post } from '@/types/post';
import EditPostForm from '@/components/EditPostForm/EditPostForm';
import CreatePostForm from '@/components/CreatePostForm/CreatePostForm';

interface PostsClientProps {
  initialData: { posts: Post[]; totalCount: number };
  userId: string;
}

export default function PostsClient({ initialData, userId }: PostsClientProps) {
  // Отримуємо початкові значення з URL для синхронізації стану
  const searchParams = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );
  const initialPage = Number(searchParams.get('page')) || 1;
  const initialSearch = searchParams.get('q') || '';

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedPost, setEditedPost] = useState<Post | null>(null);

  const { data } = useQuery({
    queryKey: ['posts', searchQuery, currentPage, userId], // Ключ для кешування
    queryFn: () =>
      fetchPosts({
        searchText: searchQuery,
        page: currentPage,
        ...(userId !== 'All' && { userId }),
      }),
    placeholderData: keepPreviousData,
    initialData,
  });

  const handleOpenModal = (post?: Post) => {
    if (post) {
      setEditedPost(post); // Якщо є пост - це режим редагування
    } else {
      setEditedPost(null); // Інакше - режим створення
    }
    setIsModalOpen(true); // Відкриваємо модалку
  };

  const changeSearchQuery = useDebouncedCallback((newQuery: string) => {
    setCurrentPage(1);
    setSearchQuery(newQuery);
  }, 300);

  const totalPages = Math.ceil(data.totalCount / 8);
  const posts = data?.posts ?? [];

  return (
    <div className={css.app}>
      <main className={css.main}>
        <section className={css.postsSection}>
          <header className={css.toolbar}>
            <SearchBox value={searchQuery} onSearch={changeSearchQuery} />
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}

            <button className={css.button} onClick={() => handleOpenModal()}>
              Create post +
            </button>
          </header>
          {isModalOpen && ( // Рендеримо модалку, якщо isModalOpen === true
            <Modal onClose={() => setIsModalOpen(false)}>
              {editedPost ? (
                <EditPostForm
                  initialValues={editedPost}
                  onClose={() => {
                    setIsModalOpen(false);
                    setEditedPost(null);
                  }}
                />
              ) : (
                <CreatePostForm onClose={() => setIsModalOpen(false)} />
              )}
            </Modal>
          )}
          {posts.length > 0 && <PostList posts={posts} onEdit={handleOpenModal} />}
        </section>
      </main>
    </div>
  );
}
