import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../services/postService";
import { Post } from "../../types/post";
import toast from "react-hot-toast";
import css from "./PostList.module.css";

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
}

export default function PostList({ posts, onEdit }: PostListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Deletion failed: ${error.message}`);
    },
  });

  const handleDelete = (postId: number) => {
    // Используем confirm для подтверждения удаления
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(postId);
    }
  };

  return (
    <ul className={css.list}>
      {posts.map((post) => (
        <li key={post.id} className={css.listItem}>
          <h2 className={css.title}>{post.title}</h2>
          <p className={css.content}>{post.body}</p>
          <div className={css.footer}>
            <button className={css.edit} onClick={() => onEdit(post)}>
              Edit
            </button>
            <button
              className={css.delete}
              onClick={() => handleDelete(post.id)}
              disabled={deleteMutation.isPending && deleteMutation.variables === post.id}
            >
              {deleteMutation.isPending && deleteMutation.variables === post.id
                ? "Deleting..."
                : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
