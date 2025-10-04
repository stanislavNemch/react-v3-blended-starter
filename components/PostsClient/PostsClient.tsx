'use client'; // Позначаємо компонент як клієнтський

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { Post } from '@/types/post';
import { fetchPosts } from '@/lib/api';

import SearchBox from '../SearchBox/SearchBox';
import PostList from '../PostList/PostList';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import CreatePostForm from '../CreatePostForm/CreatePostForm';
import EditPostForm from '../EditPostForm/EditPostForm';

// Типи для пропсів компонента
type Props = {
  initialPosts: Post[];
  totalCount: number;
  userId: string;
};

export default function PostsClient({ initialPosts, totalCount, userId }: Props) {
  // Ініціалізуємо хуки для роботи з роутингом та параметрами URL
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Отримуємо початкові значення зі стану URL
  const initialSearch = searchParams.get('q') || '';
  const initialPage = Number(searchParams.get('page')) || 1;

  // Стейт для поля пошуку
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  // Стейт для поточної сторінки пагінації
  const [currentPage, setCurrentPage] = useState(initialPage);
  // Стейт для модального вікна
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Стейт для режиму модального вікна ('create' або 'edit')
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  // Стейт для збереження поста, який редагується
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Використовуємо debounce, щоб не відправляти запит на кожне натискання клавіші
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  // Синхронізуємо стан з URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearchQuery) {
      params.set('q', debouncedSearchQuery);
    } else {
      params.delete('q');
    }
    params.set('page', String(currentPage));
    // Оновлюємо URL без перезавантаження сторінки
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedSearchQuery, currentPage, pathname, router, searchParams]);

  // Запит на отримання постів за допомогою React Query
  const { data, isLoading, isError } = useQuery({
    // Ключ запиту: унікальний ідентифікатор для кешування
    queryKey: ['posts', debouncedSearchQuery, currentPage, userId],
    // Функція, яка виконує запит
    queryFn: () =>
      fetchPosts({
        searchText: debouncedSearchQuery,
        page: currentPage,
        userId: userId === 'All' ? undefined : userId,
      }),
    // Початкові дані, отримані на сервері (SSR)
    initialData: { posts: initialPosts, totalCount },
    // Показувати попередні дані під час завантаження нових (для плавної пагінації)
    placeholderData: keepPreviousData,
  });

  // Обробники для відкриття модальних вікон
  const handleOpenCreateModal = () => {
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (post: Post) => {
    setModalMode('edit');
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const posts = data?.posts || [];
  const postsTotalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(postsTotalCount / 8); // 8 - це наш _limit

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SearchBox value={searchQuery} onSearch={setSearchQuery} />
        <button
          onClick={handleOpenCreateModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Post
        </button>
      </div>

      {isLoading && <p>Loading posts...</p>}
      {isError && <p>Error fetching posts.</p>}

      {!isLoading && !isError && (
        <PostList
          posts={posts}
          toggleModal={handleOpenEditModal}
          toggleEditPost={setSelectedPost}
        />
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {modalMode === 'create' ? (
            <CreatePostForm onClose={() => setIsModalOpen(false)} />
          ) : (
            selectedPost && (
              <EditPostForm onClose={() => setIsModalOpen(false)} initialValues={selectedPost} />
            )
          )}
        </Modal>
      )}
    </div>
  );
}
