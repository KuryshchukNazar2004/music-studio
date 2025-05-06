"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { OrbitControls, Environment, SpotLight, Html } from "@react-three/drei";
import DrumSet from "@/components/DrumSet";
import Guitar from "@/components/Guitar";
import Piano from "@/components/Piano";
import Studio from "@/components/Studio";
import { useEffect, useRef, useState } from "react";

import * as THREE from "three";
import { CapsuleCollider, Physics, RigidBody } from "@react-three/rapier";
import HitColorHUD from "@/components/HitColorHUD";
import AnalysisPanel from "@/components/AnalysisPanel";
import { useColorStore } from "@/hooks/HitColorStore";
import VRAnalysisButton from "@/components/VRAnalysisButton";

function PlayerMovement({ playerRef }: { playerRef: any }) {
  const { camera } = useThree();
  const velocity = useRef(new THREE.Vector3());

  useFrame(() => {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[0];
    if (!gamepad || !gamepad.axes) return;

    const x = gamepad.axes[2] ?? 0;
    const y = gamepad.axes[3] ?? 0;

    if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) return;

    const direction = new THREE.Vector3(x, 0, -y);
    direction.normalize().applyQuaternion(camera.quaternion);
    direction.y = 0;

    velocity.current.lerp(direction.multiplyScalar(0.1), 0.2);

    const body = playerRef.current;
    if (body) {
      const pos = body.translation();
      const next = new THREE.Vector3().copy(pos).add(velocity.current);
      body.applyImpulse(velocity.current, true);
      camera.position.copy(body.translation());
    }
  });

  useEffect(() => {
    const activate = () => {
      navigator.getGamepads();
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
  const playerRef = useRef<any>(null);

  return (
    <div className="w-screen h-screen">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <XR store={store}>
          <Physics>
            <RigidBody ref={playerRef} type="dynamic" mass={1}>
              <CapsuleCollider args={[0.5, 1]} />
              <mesh visible={false}>
                <capsuleGeometry args={[0.5, 2]} />
                <meshStandardMaterial transparent opacity={0.0} />
              </mesh>
            </RigidBody>
            <Environment preset="studio" />
            <PlayerMovement playerRef={playerRef} />

            <RigidBody type="fixed">
              <Studio />
              <mesh position={[0, -2.2, -4]} scale={[6, 0.3, 6]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial visible={false} />
              </mesh>
            </RigidBody>

            <RigidBody type="fixed">
              <DrumSet position={[0, -1.5, -2]} />
              <mesh position={[0, -1, -2]} scale={[1.5, 1, 1]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial visible={false} />
              </mesh>
            </RigidBody>

            <RigidBody type="fixed">
              <Guitar position={[-4, -1, 3]} />
              <mesh position={[-4, -1, 3]} scale={[1, 2, 1]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial visible={false} />
              </mesh>
            </RigidBody>

            <RigidBody type="fixed">
              <Piano position={[6, -1.5, 2]} />
              <mesh position={[6, -1, 2]} scale={[2.5, 1.5, 1]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial visible={false} />
              </mesh>
            </RigidBody>
          </Physics>
          {/* <VRAnalysisButton onClick={() => setShowAnalysis((prev) => !prev)} />

          {showAnalysis && <AnalysisPanel />} */}
        </XR>
      </Canvas>
    </div>
  );
}
