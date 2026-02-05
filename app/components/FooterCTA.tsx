'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

export default function PreFooter() {
  return (
    <section className="w-full h-full flex justify-center items-center overflow-hidden">
      {/* Контент */}
      <div className="flex flex-col justify-center items-center py-24 px-5">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center text-white headline-xl-text"
        >
          попробуй прямо сейчас
        </motion.h1>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.3, ease: 'easeOut' }}
          className="mt-12 flex flex-col gap-4 items-center"
        >
          <Button size="md" color="mint">
            запустить виртуальную машину
          </Button>
          <Button size="xs" color="black">
            или встретить судьбу
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
