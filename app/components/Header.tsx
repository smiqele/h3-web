'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/products', label: 'Продукты' },
  {
    href: 'https://business.h3llo.cloud',
    label: 'Для бизнеса',
    external: true,
  },
  { href: 'https://docs.h3llo.cloud', label: 'Документация', external: true },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-5 left-0 right-0 z-20
        transition-all duration-300
      `}
    >
      <div
        className={`w-full h-14 rounded-md px-6 flex items-center max-w-[1512px] mx-auto flex items-center justify-between 
          ${scrolled ? 'bg-h3-white/10 backdrop-blur-xs' : 'bg-h3-white/0'}`}
      >
        {/* Левая часть */}
        <div className="flex items-center gap-10">
          <Image src="/img/h3-logo.svg" alt="H3" width={144} height={18} priority />
        </div>

        {/* Навигация */}
        <nav className="flex items-center gap-6">
          {navLinks.map(({ href, label, external }) => (
            <Link
              key={href}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="body-mono-strong-sm text-h3-black/80 hover:text-h3-roti transition-colors inline-flex items-center gap-1.5"
            >
              {label}
              {external && <ExternalLink size={14} strokeWidth={1.5} className="opacity-70" />}
            </Link>
          ))}

          {/* Вход */}
          <Link
            href="/login"
            className="ml-4 body-mono-strong-sm text-h3-black/80  hover:text-h3-roti transition-colors"
          >
            войти
          </Link>
        </nav>
      </div>
    </header>
  );
}
