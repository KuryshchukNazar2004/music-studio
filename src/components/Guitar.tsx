"use client";
import { useGLTF } from "@react-three/drei";

interface GuitarProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export default function Guitar({ position, rotation }: GuitarProps) {
  const { scene } = useGLTF("/models/guitar.glb");

  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={3}
    />
  );
}
