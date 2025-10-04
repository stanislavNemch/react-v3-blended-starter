import { redirect } from 'next/navigation';

export default function PostsPage() {
  // Робимо перенаправлення на сторінку з усіма постами
  // щоб уникнути дублювання логіки
  redirect('/posts/filter/All');
}
