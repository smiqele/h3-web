'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-10 h-20 px-10 flex justify-between items-center"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
    >
      <Image src="/h3-logo.svg" alt="H3" width={160} height={20} priority />
      <button className="h-8 px-3 body-mono-xs bg-[var(--brand-black)] text-white rounded-md inline-flex items-center justify-center gap-2.5 hover:bg-gray-800">
        войти в консоль
      </button>
    </motion.header>
  );
}
