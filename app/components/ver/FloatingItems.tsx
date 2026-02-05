'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type FloatingItemProps = {
  label: string;
  imageSrc: string;
  x: number;
  y: number;
};

export default function FloatingItems() {
  const [items, setItems] = useState<FloatingItemProps[]>([]);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const blockSize = 100; // ширина и высота блока

    // Центры элементов
    const centers = [
      {
        label: 'Продукты',
        imageSrc: '/img/kiss.gif',
        cx: screenWidth / 2 - 500,
        cy: screenHeight / 2 - 350,
      },
      {
        label: 'Блог',
        imageSrc: '/img/cloud.gif',
        cx: screenWidth / 2 + 500,
        cy: screenHeight / 2 - 250,
      },
      {
        label: 'Консоль',
        imageSrc: '/img/kiss.gif',
        cx: screenWidth / 2 - 200,
        cy: screenHeight / 2 + 300,
      },
    ];

    const spreadX = 25;
    const spreadY = 25;

    const newItems: FloatingItemProps[] = centers.map(({ label, imageSrc, cx, cy }) => {
      const x = cx - blockSize / 2 + (Math.random() - 0.5) * spreadX;
      const y = cy - blockSize / 2 + (Math.random() - 0.5) * spreadY;

      return { label, imageSrc, x, y };
    });

    setItems(newItems);
  }, []);

  return (
    <>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 + index * 0.1, duration: 0.5, ease: 'easeOut' }}
          className="fixed flex flex-col items-center text-center"
          style={{ left: item.x, top: item.y, width: 100 }}
        >
          <div className="h-20 w-20 overflow-hidden flex items-center justify-center bg-gray-100">
            <img src={item.imageSrc} alt={item.label} className="h-full object-cover" />
          </div>
          <span className="text-sm leading-tight text-brand-black mt-2">{item.label}</span>
        </motion.div>
      ))}
    </>
  );
}
