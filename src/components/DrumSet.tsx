"use client";
import { useColorStore } from "@/hooks/HitColorStore";
import { useGLTF } from "@react-three/drei";
import { useState } from "react";
// import * as THREE from "three";

interface DrumSetProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

// function DrumStick({
//   handedness,
//   onHit,
// }: {
//   handedness: "left" | "right";
//   onHit: (file: string, color: string) => void;
// }) {
//   const ref = useRef<THREE.Mesh>(null);
//   useFrame(() => {
//     if (!ref.current) return;
//     const drums = [
//       {
//         pos: new THREE.Vector3(-0.59, 0.93, 0.12),
//         sound: "snare.wav",
//         color: "red",
//       },
//       {
//         pos: new THREE.Vector3(0, 0.5, -0.13),
//         sound: "kick.wav",
//         color: "blue",
//       },
//       {
//         pos: new THREE.Vector3(-1.02, 1.5, 0.45),
//         sound: "hihat.flac",
//         color: "yellow",
//       },
//       {
//         pos: new THREE.Vector3(-0.3, 1.42, -0.6),
//         sound: "tom1.wav",
//         color: "green",
//       },
//       {
//         pos: new THREE.Vector3(0.3, 1.42, -0.6),
//         sound: "tom2.wav",
//         color: "lime",
//       },
//       {
//         pos: new THREE.Vector3(1, 1.6, -0.5),
//         sound: "ride.wav",
//         color: "orange",
//       },
//       {
//         pos: new THREE.Vector3(0.77, 0.9, 0.05),
//         sound: "floor-tom.wav",
//         color: "purple",
//       },
//     ];
//     for (const drum of drums) {
//       if (ref.current.position.distanceTo(drum.pos) < 0.25) {
//         onHit(drum.sound, drum.color);
//       }
//     }
//   });
//   return (
//     <mesh ref={ref} position={[0, 0, 0]}>
//       <cylinderGeometry args={[0.03, 0.03, 0.5, 16]} />
//       <meshStandardMaterial color={handedness === "left" ? "brown" : "tan"} />
//     </mesh>
//   );
// }

export default function DrumSet({ position, rotation }: DrumSetProps) {
  const { scene } = useGLTF("/models/drums.glb");
  const addColor = useColorStore((state) => state.addColor);
  const [lastHit, setLastHit] = useState<string>("");

  const play = (file: string, color: string) => {
    if (lastHit === file) return; 
    setLastHit(file);
    const sound = new Audio(`/sounds/${file}`);
    sound.play();
    addColor(color);
    setTimeout(() => setLastHit(""), 100);
  };

  return (
    <>
      <group position={position} rotation={rotation} scale={2}>
        <primitive object={scene} />

        {/* Малий барабан (Snare) */}
        <mesh
          position={[-0.59, 0.93, 0.12]}
          rotation={[-Math.PI / 2, 0, 0]}
          onPointerDown={() => play("snare.wav", "red")}
        >
          <circleGeometry args={[0.3, 40]} />

          <meshStandardMaterial color="red" opacity={0.8} />
        </mesh>

        {/* Великий бас-барабан (Kick) */}
        <mesh
          position={[0, 0.5, -0.13]}
          onPointerDown={() => play("kick.wav", "blue")}
        >
          <circleGeometry args={[0.4, 40]} />
          <meshStandardMaterial color="blue" opacity={0.8} />
        </mesh>

        {/* Хай-хет (Hi-Hat) */}
        <mesh
          position={[-0.94, 1.55, 0.45]}
          rotation={[-Math.PI / 2.2, 0.3, 0]}
          onPointerDown={() => play("hihat.flac", "yellow")}
        >
          <circleGeometry args={[0.33, 40]} />
          <meshStandardMaterial color="yellow" opacity={0.8} />
        </mesh>

        {/* Томи (Tom 1 & Tom 2) */}
        <mesh
          position={[-0.3, 1.42, -0.6]}
          rotation={[-Math.PI / 3.6, 0.13, 0]}
          onPointerDown={() => play("tom1.wav", "green")}
        >
          <circleGeometry args={[0.24, 32]} />
          <meshStandardMaterial color="green" opacity={0.8} />
        </mesh>

        <mesh
          position={[0.3, 1.42, -0.6]}
          rotation={[-Math.PI / 4, -0.13, 0]}
          onPointerDown={() => play("tom2.wav", "lime")}
        >
          <circleGeometry args={[0.24, 32]} />
          <meshStandardMaterial color="lime" opacity={0.8} />
        </mesh>

        {/* Тарілки (Ride) */}
        <mesh
          position={[0.9, 1.6, -0.5]}
          rotation={[-Math.PI / 4, -0.4, 0]}
          onPointerDown={() => play("ride.wav", "orange")}
        >
          <circleGeometry args={[0.35, 32]} />
          <meshStandardMaterial color="orange" opacity={0.8} />
        </mesh>

        <mesh
          position={[0.77, 0.9, 0.05]}
          rotation={[-Math.PI / 2, 0, 0]}
          onPointerDown={() => play("floor-tom.wav", "purple")}
        >
          <circleGeometry args={[0.3, 40]} />
          <meshStandardMaterial color="purple" opacity={0.8} />
        </mesh>
      </group>
    
    </>
  );
}
