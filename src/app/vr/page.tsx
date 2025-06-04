"use client";

import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { Environment } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import { CapsuleCollider, Physics, RigidBody } from "@react-three/rapier";
import DrumSet from "@/components/DrumSet";
import Guitar from "@/components/Guitar";
import Piano from "@/components/Piano";
import Studio from "@/components/Studio";
import PlayerMovement from "@/components/PlayerMovement";
import { MenuButton3D } from "@/components/MenuButton3D";
import { AnalysisPanel3D } from "@/components/AnalysisPanel";
import { PlayerBodyTracker } from "@/components/PlayerBodyTracker";

type Vec3 = [number, number, number];

export default function VRPage() {
  const store = useMemo(() => createXRStore(), []);
  const [playerBody, setPlayerBody] = useState<any>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const rigidBodyRef = useRef<any>(null);

  const teleportTo = (pos: Vec3) => {
    if (!playerBody) {
      console.warn("❌ RigidBody still not ready");
      return;
    }

    playerBody.setTranslation({ x: pos[0], y: pos[1] + 1.2, z: pos[2] }, true);
    playerBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
    playerBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
    playerBody.wakeUp();
    console.log("🚀 Телепортуємось в:", pos);
  };

  return (
    <div className="w-screen h-screen">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <XR store={store}>
            <Physics>
              <RigidBody type="dynamic" mass={1} ref={rigidBodyRef}>
                <CapsuleCollider args={[0.5, 1]} />
                <mesh visible={false}>
                  <capsuleGeometry args={[0.5, 2]} />
                  <meshStandardMaterial transparent opacity={0.0} />
                </mesh>
              </RigidBody>

              <PlayerBodyTracker
                rigidBodyRef={rigidBodyRef}
                setPlayerBody={setPlayerBody}
              />

              <Environment preset="studio" />
              <PlayerMovement playerRef={{ current: playerBody }} />

              <RigidBody type="fixed">
                <Studio />
              </RigidBody>

              <RigidBody type="fixed">
                <DrumSet position={[0, -1.5, -2]} />
                {playerBody && (
                  <MenuButton3D
                    position={[0, 2, -2]}
                    onTeleport={teleportTo}
                    setShowAnalysis={setShowAnalysis}
                  />
                )}
              </RigidBody>

              <RigidBody type="fixed">
                <Guitar position={[-4, -1, 3]} />
              </RigidBody>

              <RigidBody type="fixed">
                <Piano position={[6, -1.5, 2]} />
              </RigidBody>
            </Physics>

            {showAnalysis && (
              <AnalysisPanel3D onClose={() => setShowAnalysis(false)} />
            )}
          </XR>
        </Suspense>
      </Canvas>
    </div>
  );
}
