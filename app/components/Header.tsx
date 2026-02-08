"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/products", label: "продукты" },
  {
    href: "https://business.h3llo.cloud",
    label: "для бизнеса",
    external: true,
  },
  { href: "https://docs.h3llo.cloud", label: "дока", external: true },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll(); // важно: синхронизация при SSR → CSR
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className="sticky top-0 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: scrolled ? 0 : 10 }}
        transition={{
          duration: 0.35,
          delay: 0.15,
          ease: "easeOut",
        }}
      >
        <div
          className={`
            w-full h-12 px-6 border-b
            flex items-center justify-between
            max-w-[1512px] mx-auto
            transition-colors duration-300
            ${
              scrolled
                ? "bg-h3-white/20 backdrop-blur-xs border-b-gray-200"
                : "bg-transparent border-b-transparent"
            }
          `}
        >
          {/* Левая часть */}
          <div className="flex items-center gap-10">
            <Image
              src="/img/h3-logo.svg"
              alt="H3"
              width={125}
              height={20}
              priority
            />
          </div>

          {/* Навигация */}
          <nav className="flex items-center gap-6">
            {navLinks.map(({ href, label, external }) => (
              <Link
                key={href}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="body-mono-sm text-h3-black hover:text-h3-roti transition-colors inline-flex items-center gap-0.5"
              >
                {label}
                {external && (
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2}
                    className="opacity-50"
                  />
                )}
              </Link>
            ))}

            <Link
              href="/login"
              className="ml-4 body-mono-sm text-h3-black/80 hover:text-h3-roti transition-colors"
            >
              войти
            </Link>
          </nav>
        </div>
      </motion.header>
    </>
  );
}
