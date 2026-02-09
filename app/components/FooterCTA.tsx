'use client';
import { motion } from 'framer-motion';

export default function PreFooter() {
  return (
    <section className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Видео-фон */}
      <video
        className="absolute inset-0 w-full max-w-[1400px] h-full object-cover mx-auto"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/anim/hand.mp4" type="video/mp4" />
      </video>

      {/* Оверлей */}
      <div className="absolute inset-0 bg-h3-black/30" />

      {/* Контент */}
      <motion.div
        className="relative z-10 flex flex-col items-center py-24 px-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          visible: {},
        }}
      >
        <motion.h1
          variants={{
            hidden: { y: 40, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center text-white headline-xl-text bg-h3-black px-8 py-4"
        >
          попробуй прямо сейчас
        </motion.h1>

        <motion.div
          variants={{
            hidden: { y: 40, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.35, delay: 0.25, ease: 'easeOut' }}
          className="flex w-full"
        >
          <div className="bg-h3-mint w-full text-h3-black body-mono-strong-sm px-4 py-4 flex items-center justify-center">
            запустить виртуальную машину
          </div>
          <div className="bg-h3-black w-full text-h3-white body-mono-strong-sm px-4 py-4 flex items-center justify-center">
            или встретить судьбу
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
