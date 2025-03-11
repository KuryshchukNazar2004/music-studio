"use client";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export default function Studio() {
  const { scene } = useGLTF("/models/studio.glb");

  return <primitive object={scene} scale={0.7} position={[0, -2, -4]} />;
}
