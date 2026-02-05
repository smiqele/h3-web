'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Offset = { x: number; y: number };

function useAdaptiveOffset(offset: Offset): Offset {
  const [value, setValue] = useState(offset);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      let factor = 1;
      if (w < 640)
        factor = 0.4; // mobile
      else if (w < 768)
        factor = 0.6; // sm
      else if (w < 1024) factor = 0.8; // md

      setValue({
        x: offset.x * factor,
        y: offset.y * factor,
      });
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [offset]);

  return value;
}

function FloatingBlock({
  imageSrc,
  label,
  offset,
  delay = 0,
  align = 'center',
}: {
  imageSrc: string;
  label: string;
  offset: Offset;
  delay?: number;
  align?: 'start' | 'center' | 'end';
}) {
  const adaptiveOffset = useAdaptiveOffset(offset);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{
          x: adaptiveOffset.x,
          y: adaptiveOffset.y,
          opacity: 0,
        }}
        animate={{
          x: adaptiveOffset.x,
          y: adaptiveOffset.y - 40,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
          delay,
        }}
        className={`flex flex-col items-${align}`}
      >
        <div className="h-20 w-20 flex items-center justify-center bg-gray-100">
          <img src={imageSrc} alt={label} className="h-20 w-20 object-cover" />
        </div>
        <span className="mt-2 body-mono-sm">{label}</span>
      </motion.div>
    </div>
  );
}

export default function HeroGridFloating() {
  return (
    <div className="w-full h-full grid grid-cols-2 grid-rows-[1fr_auto_1fr] items-center gap-4 p-4">
      {/* ───────────── Первая строка ───────────── */}
      <FloatingBlock
        label="аппаратная изоляция виртуальных машин с Intel TDX"
        imageSrc="/img/kiss.gif"
        offset={{ x: 0, y: 100 }}
        delay={0.1}
      />

      <FloatingBlock
        label="Аттестация по 152-ФЗ"
        imageSrc="/img/cloud.gif"
        offset={{ x: 80, y: 0 }}
        delay={0.2}
      />

      {/* ───────────── Hero ───────────── */}
      <div className="col-span-2 flex flex-col justify-center items-center gap-1 py-6">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center headline-xl-text"
        >
          драйв простых решений
        </motion.h1>

        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.15, ease: 'easeOut' }}
          className="text-center body-mono-lg"
        >
          Обеспечиваем полную защиту облака на всех уровнях, соблюдая индустриальные стандарты и
          законодательные требования.
        </motion.h1>
      </div>

      {/* ───────────── Третья строка ───────────── */}
      <FloatingBlock
        label="5 контуров  физической защиты"
        imageSrc="/img/kiss.gif"
        offset={{ x: 150, y: 0 }}
        delay={0.3}
      />

      <div />
    </div>
  );
}
