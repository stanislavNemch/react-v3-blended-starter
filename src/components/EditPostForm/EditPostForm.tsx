// src/components/EditPostForm/EditPostForm.tsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../../services/postService";
import toast from "react-hot-toast";
import { Post } from "../../types/post";
import css from "./EditPostForm.module.css";

interface EditPostFormProps {
  onClose: () => void;
  post: Post;
}

// Та же схема валидации, что и при создании
const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title must be no more than 50 characters long")
    .required("Title is required"),
  body: Yup.string()
    .max(500, "Content must be no more than 500 characters long")
    .required("Content is required"),
});

export default function EditPostForm({ onClose, post }: EditPostFormProps) {
  const queryClient = useQueryClient();

  // Мутация для редактирования поста
  const mutation = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post edited successfully!");
      onClose();
    },
    onError: (error) => {
      toast.error(`An error occurred: ${error.message}`);
    },
  });

  return (
    <Formik
      initialValues={{ id: post.id, userId: post.userId, title: post.title, body: post.body }}
      validationSchema={PostSchema}
      onSubmit={(values) => {
        mutation.mutate(values);
      }}
    >
      <Form className={css.form}>
        <h2>Edit Post</h2>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onClose} className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Edit post"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
