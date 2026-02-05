'use client';

import { useEffect, useState } from 'react';

const CARD_COUNT = 8;
const CARD_WIDTH = 1000;
const CARD_HEIGHT = 500;
const STACK_OFFSET = 100;

const STEP = CARD_HEIGHT - STACK_OFFSET;

export default function CardStackFeature() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY - 500);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollSteps = scrollY / STEP;

  // 🔥 Параллакс всего блока (двигается медленнее скролла)
  const containerShift = scrollY * 0.3;

  return (
    <div
      className="relative w-full flex justify-center"
      style={{
        height: `${CARD_COUNT * STEP + 1000}px`,
        transform: `translateY(-${containerShift}px)`,
        willChange: 'transform',
      }}
    >
      {Array.from({ length: CARD_COUNT }).map((_, index) => {
        const activeSteps = Math.max(0, scrollSteps - index);
        const y = activeSteps * STEP;

        return (
          <div
            key={index}
            className="absolute bg-white border border-gray-300"
            style={{
              width: `${CARD_WIDTH}px`,
              height: `${CARD_HEIGHT}px`,
              top: `${CARD_HEIGHT * index}px`,
              transform: `translateY(${y}px)`,
              zIndex: CARD_COUNT + index,
              transition: 'transform 0.05s linear',
              willChange: 'transform',
            }}
          />
        );
      })}
    </div>
  );
}
