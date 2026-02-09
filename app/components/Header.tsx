'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

type HeaderTheme = 'light' | 'dark';

const navLinks = [
  { href: '/products', label: 'продукты' },
  {
    href: 'https://business.h3llo.cloud',
    label: 'для бизнеса',
    external: true,
  },
  { href: 'https://docs.h3llo.cloud', label: 'дока', external: true },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<HeaderTheme>('light');

  /* scroll → blur */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* sections → theme */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);

      const elements = document.querySelectorAll<HTMLElement>('[data-header-theme]');
      let nextTheme: HeaderTheme = 'light';

      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 40 && rect.bottom > 40) {
          nextTheme = el.dataset.headerTheme === 'dark' ? 'dark' : 'light';
          break;
        }
      }

      setTheme(nextTheme);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isDark = theme === 'dark';

  return (
    <motion.header
      className="sticky top-0 z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: scrolled ? 0 : 10 }}
      transition={{ duration: 0.35, delay: 0.15, ease: 'easeOut' }}
    >
      <div
        className={`
          w-full h-12 px-6
          flex items-center justify-between
          max-w-[1512px] mx-auto
          border-x border-b rounded-b-lg
          transition-all duration-300
          ${
            scrolled
              ? isDark
                ? 'bg-h3-black/40 backdrop-blur-md border-white/10'
                : 'bg-h3-white/60 backdrop-blur-md border-gray-200'
              : 'bg-transparent border-transparent'
          }
        `}
      >
        {/* Logo */}
        <Image
          src={isDark ? '/img/h3-logo-white.svg' : '/img/h3-logo.svg'}
          alt="H3"
          width={125}
          height={20}
          priority
        />

        {/* Navigation */}
        <nav
          className={`
            flex items-center gap-6 body-mono-sm
            ${isDark ? 'text-white' : 'text-h3-black'}
          `}
        >
          {navLinks.map(({ href, label, external }) => (
            <Link
              key={href}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-0.5 hover:text-h3-roti transition-colors"
            >
              {label}
              {external && <ArrowUpRight size={16} strokeWidth={2} className="opacity-50" />}
            </Link>
          ))}

          <Link
            href="/login"
            className={`ml-4 transition-colors ${
              isDark ? 'text-white/80' : 'text-h3-black/80'
            } hover:text-h3-roti`}
          >
            войти
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
