'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './ActiveLink.module.css';

type ActiveLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function ActiveLink({ href, children }: ActiveLinkProps) {
  // Отримуємо поточний шлях URL
  const pathname = usePathname();
  // Перевіряємо, чи є посилання активним
  const isActive = pathname === href;

  // Застосовуємо активний клас, якщо посилання активне
  const className = isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
