import axios from "axios";
import { Post } from "../types/post";

// Создаем экземпляр axios с базовым URL
const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Интерфейс для параметров запроса getPosts
interface GetPostsParams {
  page: number;
  limit: number;
  query: string;
}

// Тип для ответа от getPosts, который включает посты и общее количество
interface GetPostsResponse {
  posts: Post[];
  totalCount: number;
}

export const getPosts = async ({
  page,
  limit,
  query,
}: GetPostsParams): Promise<GetPostsResponse> => {
  const response = await apiClient.get<Post[]>("/posts", {
    params: {
      _page: page,
      _limit: limit,
      q: query || undefined, // Отправляем параметр q, только если он не пустой
    },
  });

  // API возвращает общее количество постов в заголовке 'x-total-count'
  const totalCount = Number(response.headers["x-total-count"]) || 0;

  return { posts: response.data, totalCount };
};

export const createPost = async (postData: Omit<Post, "id" | "userId">): Promise<Post> => {
  const response = await apiClient.post("/posts", postData);
  return response.data;
};

export const editPost = async (postData: Post): Promise<Post> => {
  // Отделяем id от остальных данных для PATCH запроса
  const { id, ...data } = postData;
  const response = await apiClient.patch(`/posts/${id}`, data);
  return response.data;
};

export const deletePost = async (postId: number): Promise<void> => {
  await apiClient.delete(`/posts/${postId}`);
};
