"use client";

import { useColorStore } from "@/hooks/HitColorStore";
import { useThree } from "@react-three/fiber";
import { useCallback } from "react";
import { Text } from "@react-three/drei";

export default function VRAnalysisButton({
  onClick,
}: {
  onClick: () => void;
}) {
  const { viewport } = useThree();

  return (
    <group position={[0, 2.2, -1.5]}>
      <mesh onPointerDown={onClick}>
        <boxGeometry args={[1.2, 0.5, 0.05]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0, 0, 0.026]}>
        <Text
          position={[0, 0, 0.03]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Показати аналіз
        </Text>

        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}
