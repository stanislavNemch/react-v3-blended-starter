import { fetchUsers } from '@/lib/api';
import ActiveLink from '@/components/ActiveLink/ActiveLink';
import css from './layout.module.css';

type LayoutPostsProps = {
  children: React.ReactNode;
};

export default async function LayoutPosts({ children }: LayoutPostsProps) {
  // Отримуємо список користувачів на сервері
  const users = await fetchUsers();

  return (
    <main className={css.container}>
      {/* Бічна панель для навігації/фільтрації */}
      <aside className={css.sidebar}>
        <h2 className={css.sidebarTitle}>Filter by Author</h2>
        <nav>
          <ul>
            <li>
              <ActiveLink href="/posts/filter/All">All Users</ActiveLink>
            </li>
            {users.map((user) => (
              <li key={user.id}>
                <ActiveLink href={`/posts/filter/${user.id}`}>{user.name}</ActiveLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className={css.postsWrapper}>{children}</div>
    </main>
  );
}
