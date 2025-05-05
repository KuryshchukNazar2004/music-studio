"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { OrbitControls, Environment, SpotLight } from "@react-three/drei";
import DrumSet from "@/components/DrumSet";
import Guitar from "@/components/Guitar";
import Piano from "@/components/Piano";
import Studio from "@/components/Studio";
import { useEffect, useRef } from "react";

import * as THREE from "three";

function PlayerMovement() {
  const { camera } = useThree();
  const velocity = useRef(new THREE.Vector3());

  useFrame(() => {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[0];
    if (!gamepad || !gamepad.axes) return;

    const axes = gamepad.axes;

    const x = axes[2] ?? 0;
    const y = axes[3] ?? 0;

    if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) return;

    const direction = new THREE.Vector3(x, 0, -y);
    direction.normalize().applyQuaternion(camera.quaternion);
    direction.y = 0;

    velocity.current.lerp(direction.multiplyScalar(0.1), 0.2);
    camera.position.add(velocity.current);
  });

  useEffect(() => {
    const activate = () => {
      navigator.getGamepads();
      console.log("[VR] Gamepads activated");
      window.removeEventListener("keydown", activate);
      window.removeEventListener("click", activate);
    };

    window.addEventListener("keydown", activate);
    window.addEventListener("click", activate);
  }, []);

  return null;
}

export default function VRPage() {
  const store = createXRStore();

  return (
    <div className="w-screen h-screen">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <XR store={store}>
          <Environment preset="studio" />

          <PlayerMovement />

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
