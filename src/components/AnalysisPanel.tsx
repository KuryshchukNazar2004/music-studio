"use client";

import { Html } from "@react-three/drei";
import { useColorStore } from "@/hooks/HitColorStore";
import { useMemo } from "react";

const colorMeanings: Record<string, string> = {
  red: "Сильне бажання досягти успіху, енергійність, прагнення діяти.",
  blue: "Потреба в спокої, гармонії, внутрішньому комфорті.",
  yellow: "Надія на майбутнє, оптимізм, активна допитливість.",
  green: "Стабільність, впевненість у собі, бажання самоствердитися.",
  lime: "Потреба бути прийнятим, відкритість до змін.",
  orange: "Прагнення до емоційного задоволення, контактність.",
  purple: "Інтуїтивність, мрійливість, креативність.",
};

export default function AnalysisPanel() {
  const colors = useColorStore((state) => state.colors);

  const stats = useMemo(() => {
    const count: Record<string, number> = {};
    colors.forEach((c) => {
      count[c] = (count[c] || 0) + 1;
    });
    const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
    return sorted;
  }, [colors]);

  return (
    <Html position={[0, 1.5, -2]} transform>
      <div
        style={{
          padding: "20px",
          background: "#111",
          color: "#fff",
          maxWidth: "300px",
          borderRadius: "12px",
        }}
      >
        <h2>Аналіз твоїх кольорових виборів</h2>

        {stats.map(([color, count]) => (
          <div
            key={color}
            style={{
              margin: "10px 0",
              padding: "10px",
              background: color,
              color: "#000",
              borderRadius: "8px",
            }}
          >
            <strong>{color.toUpperCase()}</strong> — вибрано {count} разів
            <p>{colorMeanings[color]}</p>
          </div>
        ))}

        {stats.length === 0 && <p>Поки що нема кольорів для аналізу.</p>}
      </div>
    </Html>
  );
}
