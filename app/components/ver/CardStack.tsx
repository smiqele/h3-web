"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cardsData } from "./CardStackData";

const cardHeight = 400;
const cardCount = cardsData.length;
const stickyTop = 60;
const scaleMin = 0.85;
const scaleDelay = 300;

export default function CardStack() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastStickyScrollY = useRef<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lastIndex = cardCount - 1;
  const lastEl = cardRefs.current[lastIndex];

  /* ---------- stack translate ---------- */
  let stackTranslateY = 0;
  if (lastEl) {
    const rect = lastEl.getBoundingClientRect();
    if (rect.top <= stickyTop) {
      if (lastStickyScrollY.current === null) {
        lastStickyScrollY.current = scrollY;
      }
      stackTranslateY = -(scrollY - lastStickyScrollY.current);
    } else {
      lastStickyScrollY.current = null;
    }
  }

  /* ---------- scale ---------- */
  const getScale = (el: HTMLDivElement | null, index: number) => {
    if (!el || index === lastIndex) return 1;

    const rect = el.getBoundingClientRect();

    if (rect.top > stickyTop) {
      (el as any)._stickyY = undefined;
      return 1;
    }

    if ((el as any)._stickyY === undefined) {
      (el as any)._stickyY = scrollY;
    }

    const delta = scrollY - (el as any)._stickyY - scaleDelay;
    const progress = Math.min(Math.max(delta / cardHeight, 0), 1);

    const step = (1 - scaleMin) / (cardCount - 1);
    const targetScale = 1 - step * (lastIndex - index);

    return 1 - progress * (1 - targetScale);
  };

  /* ---------- render ---------- */
  return (
    <div className="w-full flex justify-center">
      <motion.div
        className="relative w-full"
        style={{
          height: cardHeight * (cardCount + 1),
          transform: `translateY(${stackTranslateY}px)`,
          willChange: "transform",
        }}
        initial={{ opacity: 1, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {cardsData.map((card, index) => {
          const el = cardRefs.current[index];
          const scale = getScale(el, index);

          return (
            <div
              key={index}
              ref={(node) => (cardRefs.current[index] = node)}
              className="sticky w-full max-w-5xl mx-auto"
              style={{
                top: stickyTop,
                height: cardHeight,
                transformOrigin: "top center",
                willChange: "transform",
                zIndex: index,
                transform: `scale(${scale})`,
              }}
            >
              <div
                className={`relative w-full h-full bg-white border-gray-200 flex flex-col justify-between p-10 ${
                  index === lastIndex
                    ? "border rounded-md"
                    : "rounded-t-md border-t border-l border-r"
                }`}
              >
                <img
                  className="w-96 h-64 object-contain absolute left-[580px] top-[60px]"
                  src={card.image}
                  alt={card.title}
                />

                <div className="flex flex-col gap-8">
                  <div className="headline-sm-text">{card.title}</div>
                  <div className="max-w-[500px] body-mono-lg">
                    {card.description}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 max-w-[640px]">
                  {card.tags.map((tag, idx) => (
                    <div
                      key={idx}
                      className="h-7 px-3 flex items-center body-mono-sm bg-gray-100"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              {index !== lastIndex && (
                <div className="border-l border-r h-2 border-gray-200 w-full absolute -translate-y-px" />
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
