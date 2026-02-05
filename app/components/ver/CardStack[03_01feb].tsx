'use client';

import { useEffect, useRef, useState } from 'react';
import { cardsData } from './CardStackData';

const CARD_COUNT = cardsData.length;
const CARD_HEIGHT = 400;
const STACK_OFFSET = 100;
const TRIGGER_OFFSET = 800;
const TOP_MARGIN = 40; // отступ от верхнего края окна

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

    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
    const STEP = CARD_HEIGHT - STACK_OFFSET;

    const totalShift = Math.min(
      scrollY - (containerTop - TRIGGER_OFFSET - CARD_HEIGHT),
      STEP * (CARD_COUNT - 1)
    );

    const accumulatedShift = Math.max(0, totalShift - index * STEP);

    const cardTranslate = STACK_OFFSET * index - accumulatedShift;

    const cardTopViewport = containerTop + STACK_OFFSET * index - accumulatedShift - scrollY;

    // фиксируем верх карточки на TOP_MARGIN
    if (cardTopViewport < TOP_MARGIN) {
      return STACK_OFFSET * index - (containerTop + STACK_OFFSET * index - scrollY - TOP_MARGIN);
    }

    return cardTranslate;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{
        height: `${CARD_COUNT * (CARD_HEIGHT - STACK_OFFSET)}px`,
      }}
    >
      <div className="relative w-full max-w-5xl mx-auto" style={{ height: `${CARD_HEIGHT}px` }}>
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="absolute w-full h-full"
            style={{
              transform: `translateY(${getCardTransform(index)}px)`,
              height: `${CARD_HEIGHT}px`,
              zIndex: index,
            }}
          >
            <div
              className={`w-full h-full bg-white border-gray-200 flex flex-col justify-between p-10 ${
                index === cardsData.length - 1
                  ? 'border rounded-md'
                  : 'border-t border-l border-r rounded-t-md'
              }`}
            >
              <img
                className="w-96 h-64 object-cover absolute left-[580px] top-[60px]"
                src={card.image}
                alt={card.title}
              />

              <div className="flex flex-col gap-8">
                <div className="headline-sm-text">{card.title}</div>
                <div className="max-w-[500px] body-mono-lg">{card.description}</div>
              </div>

              <div className="flex flex-wrap gap-3 max-w-[640px]">
                {card.tags.map((tag, idx) => (
                  <div key={idx} className="h-7 px-3 flex items-center body-mono-sm bg-gray-100">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {index !== cardsData.length - 1 && (
              <div className="border-l border-r h-2 border-gray-200 w-full absolute -translate-y-px" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
