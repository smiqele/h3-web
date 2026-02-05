'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

function RealisticButton() {
  const topRef = useRef<THREE.Mesh>(null!);
  const rotVelocity = useRef({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [pressed, setPressed] = useState(false);

  useFrame(() => {
    // инерция вращения — тяжёлая, вязкая
    if (!dragging) {
      rotVelocity.current.x *= 0.88;
      rotVelocity.current.y *= 0.88;
      topRef.current.rotation.y += rotVelocity.current.x;
      topRef.current.rotation.x += rotVelocity.current.y;
    }

    // физический ход кнопки
    topRef.current.position.y = THREE.MathUtils.lerp(
      topRef.current.position.y,
      pressed ? -0.06 : 0,
      0.18
    );
  });

  return (
    <group rotation={[0.55, 0.85, 0]}>
      {/* Основание */}
      <RoundedBox args={[2.6, 0.35, 1.6]} radius={0.15} smoothness={4} position={[0, -0.28, 0]}>
        <meshStandardMaterial color="#070707" roughness={0.9} metalness={0.05} />
      </RoundedBox>

      {/* Нажимаемая часть */}
      <RoundedBox
        ref={topRef}
        args={[2.4, 0.28, 1.4]}
        radius={0.18}
        smoothness={6}
        onPointerDown={(e) => {
          e.stopPropagation();
          setPressed(true);
          setDragging(true);
        }}
        onPointerUp={() => {
          setPressed(false);
          setDragging(false);
        }}
        onPointerLeave={() => {
          setPressed(false);
          setDragging(false);
        }}
        onPointerMove={(e) => {
          if (!dragging) return;
          const dx = e.movementX * 0.0018;
          const dy = e.movementY * 0.0018;
          rotVelocity.current.x = dx;
          rotVelocity.current.y = dy;
          topRef.current.rotation.y += dx;
          topRef.current.rotation.x += dy;
        }}
      >
        <meshStandardMaterial color="#0d0d0d" roughness={0.65} metalness={0.12} />
      </RoundedBox>
    </group>
  );
}

export default function H3DButton() {
  return (
    <div className="h-[420px] w-full">
      <Canvas camera={{ position: [5, 4, 6], fov: 38 }}>
        {/* Свет без тени — как в студийной предметной съёмке */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 8, 5]} intensity={1.1} />
        <directionalLight position={[-4, 2, 6]} intensity={0.4} />

        <RealisticButton />
      </Canvas>
    </div>
  );
}
