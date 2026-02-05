'use client';

import { useEffect, useState, useRef } from 'react';
import { initialLayers, svgPaths, getSvgString } from './dataSvg';

type Trail = {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
  d: string;
  fg: string;
  bg: string;
};

export default function CursorTrail() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const idCounter = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // создаём смещение около 10 пикселей в случайном направлении
      const angle = Math.random() * 2 * Math.PI; // случайный угол
      const radius = 10; // расстояние от курсора
      const offsetX = Math.cos(angle) * radius;
      const offsetY = Math.sin(angle) * radius;

      // Выбираем случайный слой
      const layer = initialLayers[Math.floor(Math.random() * initialLayers.length)];
      const d = layer.symbol && svgPaths[layer.symbol] ? svgPaths[layer.symbol] : svgPaths['null'];
      const fg = layer.fg || '#000';
      const bg = layer.bg || '#fff';

      const size = 16 + Math.random() * 16; // размер от 16 до 32

      const newTrail: Trail = {
        id: idCounter.current++,
        x: e.clientX + offsetX,
        y: e.clientY + offsetY,
        opacity: 1,
        size,
        d,
        fg,
        bg,
      };

      setTrails((prev) => [...prev, newTrail]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const frame = () => {
      setTrails((prev) =>
        prev.map((t) => ({ ...t, opacity: t.opacity - 0.02 })).filter((t) => t.opacity > 0)
      );
      requestAnimationFrame(frame);
    };
    const animationFrame = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <>
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none"
          style={{
            left: trail.x,
            top: trail.y,
            width: trail.size,
            height: trail.size,
            opacity: trail.opacity,
            transform: 'translate(-50%, -50%)',
          }}
          dangerouslySetInnerHTML={{
            __html: getSvgString(trail.d, trail.fg, trail.bg, trail.size),
          }}
        />
      ))}
    </>
  );
}
