"use client";

import { Text } from "@react-three/drei";
import { useColorStore } from "@/hooks/HitColorStore";
import React, { useMemo } from "react";

export function AnalysisPanel3D({
  position = [-1.5, 1.5, -2],
  rotation = [0, 0.5, 0],
}: {
  onClose: () => void;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const colors = useColorStore((state) => state.colors);

  const stats = useMemo(() => {
    const count: Record<string, number> = {};
    colors.forEach((c) => {
      count[c] = (count[c] || 0) + 1;
    });
    return Object.entries(count).sort((a, b) => b[1] - a[1]);
  }, [colors]);

  const colorMeanings: Record<string, string> = {
    red: "Сильне бажання досягти успіху",
    blue: "Потреба в спокої",
    yellow: "Надія, оптимізм",
    green: "Стабільність, впевненість",
    lime: "Потреба бути прийнятим",
    orange: "Прагнення до емоцій",
    purple: "Інтуїтивність, креативність",
  };

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[2, 2, 0.05]} />
        <meshStandardMaterial color="#111" transparent opacity={0.9} />
      </mesh>

      <Text
        position={[0, 0.85, 0.06]}
        fontSize={0.15}
        color="white"
        anchorX="center"
      >
        Аналіз виборів
      </Text>

      {stats.length === 0 ? (
        <Text
          position={[0, 0.5, 0.06]}
          fontSize={0.1}
          color="white"
          anchorX="center"
        >
          Поки що нема даних
        </Text>
      ) : (
        stats.slice(0, 5).map(([color, count], i) => (
          <group key={color} position={[0, 0.5 - i * 0.3, 0.06]}>
            <mesh position={[-0.7, 0, 0]}>
              <boxGeometry args={[0.3, 0.2, 0.01]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <Text
              position={[0, 0.05, 0]}
              fontSize={0.09}
              color="white"
              anchorX="center"
            >
              {color.toUpperCase()} — {count}
            </Text>
            <Text
              position={[0, -0.05, 0]}
              fontSize={0.06}
              color="white"
              anchorX="center"
            >
              {colorMeanings[color]}
            </Text>
          </group>
        ))
      )}
    </group>
  );
}
