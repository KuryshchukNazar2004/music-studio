"use client";

import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { OrbitControls, Environment, SpotLight } from "@react-three/drei";
import DrumSet from "@/components/DrumSet";
import Guitar from "@/components/Guitar";
import Piano from "@/components/Piano";
import Studio from "@/components/Studio";

export default function VRPage() {
  const store = createXRStore();

  return (
    <div className="w-screen h-screen">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <XR store={store}>
          <Environment preset="studio" />

          <Studio />
          <DrumSet position={[0, -1.5, -2]} rotation={[0, 0, 0]} />
          <Guitar position={[-4, -1, 3]} rotation={[0, Math.PI / 6, 0]} />
          <Piano position={[6, -1.5, 2]} rotation={[0, -Math.PI / 4, 0]} />

          <OrbitControls />
        </XR>
      </Canvas>
    </div>
  );
}
