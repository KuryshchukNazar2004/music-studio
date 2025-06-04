"use client";

import { Text } from "@react-three/drei";
import { useState } from "react";
import { InstrumentMenu3D, Vec3 } from "./InstrumentMenu3D";

export function MenuButton3D({
  position = [0, 2, -4.5],
  onTeleport,
  setShowAnalysis,
}: {
  position?: Vec3;
  onTeleport: (pos: Vec3) => void;
  setShowAnalysis: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <mesh
        position={position}
        onClick={() => setOpen(!open)}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <boxGeometry args={[0.8, 0.3, 0.1]} />
        <meshStandardMaterial color="#0d9488" />
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.1}
          color="white"
          anchorX="center"
        >
          Меню
        </Text>
      </mesh>

      {open && (
        <InstrumentMenu3D
          onTeleport={onTeleport}
          setShowAnalysis={setShowAnalysis}
        />
      )}
    </>
  );
}
