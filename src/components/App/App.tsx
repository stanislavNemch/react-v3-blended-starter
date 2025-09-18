import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "../../services/postService";
import { Post } from "../../types/post";
import { useDebounce } from "../hooks/useDebounce";
import { Toaster } from "react-hot-toast"; // Импортируем Toaster
import PostList from "../PostList/PostList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import EditPostForm from "../EditPostForm/EditPostForm";
import css from "./App.module.css";

const POSTS_PER_PAGE = 8; // Количество постов на одной странице

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedPost, setEditedPost] = useState<Post | null>(null);

  // Применяем debounce к значению поискового запроса
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const queryClient = useQueryClient();

  // Основной запрос на получение постов с помощью React Query
  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ["posts", currentPage, debouncedSearchQuery],
    queryFn: () =>
      getPosts({ page: currentPage, limit: POSTS_PER_PAGE, query: debouncedSearchQuery }),
    placeholderData: (previousData) => previousData, // Для плавных переходов между страницами
  });

  const posts = data?.posts ?? [];
  const totalPosts = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Сбрасываем страницу на первую при изменении поискового запроса
  useEffect(() => {
    if (debouncedSearchQuery !== "") {
      setCurrentPage(1);
    }
  }, [debouncedSearchQuery]);

  // Предзагрузка данных для следующей страницы
  useEffect(() => {
    if (!isPlaceholderData && currentPage < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["posts", currentPage + 1, debouncedSearchQuery],
        queryFn: () =>
          getPosts({ page: currentPage + 1, limit: POSTS_PER_PAGE, query: debouncedSearchQuery }),
      });
    }
  }, [currentPage, debouncedSearchQuery, totalPages, isPlaceholderData, queryClient]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditedPost(null); // Очищаем состояние редактируемого поста при закрытии
  };

  const handleEdit = (post: Post) => {
    setEditedPost(post);
    handleOpenModal();
  };

  const handleCreate = () => {
    setEditedPost(null); // Убеждаемся, что форма откроется для создания, а не редактирования
    handleOpenModal();
  };

  return (
    <div className={css.app}>
      <Toaster position="top-right" /> {/* Место для отображения уведомлений */}
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={setSearchQuery} />
        <button onClick={handleCreate} className={css.button}>
          Create post
        </button>
      </header>
      <main>
        {isLoading && <p>Loading posts...</p>}
        {isError && <p>Error fetching posts. Please try again later.</p>}
        {posts.length > 0 && <PostList posts={posts} onEdit={handleEdit} />}
        {!isLoading && !isError && posts.length === 0 && <p>No posts found.</p>}
      </main>
      {totalPages > 1 && (
        <footer>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </footer>
      )}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          {editedPost ? (
            <EditPostForm post={editedPost} onClose={handleCloseModal} />
          ) : (
            <CreatePostForm onClose={handleCloseModal} />
          )}
        </Modal>
      )}
    </div>
  );
}
