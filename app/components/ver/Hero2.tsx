'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="w-full flex flex-col justify-center items-center bg-white">
      <motion.header
        className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 h-20 px-10 flex justify-between items-center"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
      >
        <Image src="/h3-logo.svg" alt="H3" width={160} height={20} priority />
      </motion.header>

      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center headline-xl-text"
      >
        сделали облако
      </motion.h1>

      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.15, ease: 'easeOut' }}
        className="text-center headline-xl-text"
      >
        для тебя
      </motion.h1>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.3, ease: 'easeOut' }}
        className="mt-12 h-8 px-3 bg-black rounded-md inline-flex justify-start items-center gap-2.5 cursor-pointer"
      >
        <div className="text-white body-mono-sm">войти в консоль</div>
      </motion.div>
    </section>
  );
}
