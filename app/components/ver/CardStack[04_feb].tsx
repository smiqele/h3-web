'use client';

import { useEffect, useRef, useState } from 'react';
import { cardsData } from './CardStackData';

const CARD_COUNT = cardsData.length;
const CARD_HEIGHT = 400;
const STACK_OFFSET = 100;
const TRIGGER_OFFSET = 800;

export default function CardStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const getCardTransform = (index: number) => {
    if (!containerRef.current) return STACK_OFFSET * index;

    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;

    const triggerPoint = containerTop - (TRIGGER_OFFSET + CARD_HEIGHT);

    const progress = scrollY - triggerPoint;

    if (progress <= 0) return STACK_OFFSET * index;

    const STEP = CARD_HEIGHT - STACK_OFFSET;
    const cardStart = index * STEP;
    const cardEnd = cardStart + STEP;

    if (progress >= cardEnd) return STACK_OFFSET * index - STEP;
    if (progress <= cardStart) return STACK_OFFSET * index;

    const localProgress = progress - cardStart;
    return STACK_OFFSET * index - localProgress;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${CARD_COUNT * (CARD_HEIGHT - STACK_OFFSET)}px` }}
    >
      {/* Sticky window */}
      <div
        className="sticky w-full flex items-start justify-center"
        style={{
          top: `${CARD_HEIGHT - STACK_OFFSET + 40}px`,
          height: `${CARD_HEIGHT - STACK_OFFSET + TRIGGER_OFFSET}px`,
        }}
      >
        {/* Cards */}
        <div className="relative w-full max-w-5xl">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className={`absolute w-full h-full flex flex-col justify-between p-10 bg-white rounded-md border-gray-200 ${
                index === cardsData.length - 1 ? 'border' : 'border-t border-l border-r'
              }`}
              style={{
                transform: `translateY(${getCardTransform(index)}px)`,
                height: `${CARD_HEIGHT}px`,
                zIndex: index,
              }}
            >
              {/* Image */}
              <img
                className="w-96 h-64 object-cover absolute left-[580px] top-[60px]"
                src={card.image}
                alt={card.title}
              />

              <div className="flex flex-col gap-8">
                <div className="headline-sm-text">{card.title}</div>
                <div className="max-w-[500px] body-mono-lg">{card.description}</div>
              </div>

              {/* list */}
              <div className="flex flex-wrap gap-3 max-w-[640px]">
                {card.tags.map((tag, idx) => (
                  <div key={idx} className="h-7 px-3 flex items-center body-mono-sm bg-gray-100">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
