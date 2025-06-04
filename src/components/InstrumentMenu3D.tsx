"use client";

import { Text } from "@react-three/drei";
import { Interactive } from "@react-three/xr";
import React from "react";

export type Vec3 = [number, number, number];

export function InstrumentMenu3D({
  onTeleport,
  setShowAnalysis,
}: {
  onTeleport: (pos: Vec3) => void;
  setShowAnalysis: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const options: {
    label: string;
    position?: Vec3;
    action?: () => void;
  }[] = [
    { label: "🎹 Піаніно", position: [6, 0, 2] },
    { label: "🥁 Барабани", position: [0, 0, -2] },
    {
      label: "📊 Аналіз ударів",
      action: () => {
        setShowAnalysis(true);
      },
    },
  ];

  return (
    <group position={[1.5, 2.2, -2]} rotation={[0, -0.5, 0]}>
      {options.map((opt, i) => (
        <Interactive
          key={opt.label}
          onSelect={() => {
            if (opt.position) onTeleport(opt.position);
            if (opt.action) opt.action();
          }}
        >
          <mesh
            position={[0, -i * 0.5, 0]}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "default")}
          >
            <boxGeometry args={[1.5, 0.3, 0.1]} />
            <meshStandardMaterial color="#1d4ed8" />
            <Text
              position={[0, 0, 0.06]}
              fontSize={0.1}
              color="white"
              anchorX="center"
            >
              {opt.label}
            </Text>
          </mesh>
        </Interactive>
      ))}
    </group>
  );
}
