"use client";
import { useGLTF } from "@react-three/drei";

interface PianoProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export default function Piano({ position, rotation }: PianoProps) {
  const { scene } = useGLTF("/models/piano.glb");

  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={0.2}
    />
  );
}
