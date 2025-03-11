"use client";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useState } from "react";

interface DrumSetProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export default function DrumSet({ position, rotation }: DrumSetProps) {
  const { scene } = useGLTF("/models/drums.glb");
  const { camera } = useThree();
  const [isSeated, setIsSeated] = useState(false);

  const playSound = (soundFile: string) => {
    const sound = new Audio(`/sounds/${soundFile}`);
    sound.play();
  };

  return (
    <group position={position} rotation={rotation} scale={2}>
      <primitive object={scene} />

      {/* Малий барабан (Snare) */}
      <mesh
        position={[-0.59, 0.93, 0.12]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerDown={() => playSound("snare.wav")}
      >
        <circleGeometry args={[0.3, 40]} />

        <meshStandardMaterial color="red" opacity={0.8} />
      </mesh>

      {/* Великий бас-барабан (Kick) */}
      <mesh
        position={[0, 0.5, -0.13]}
        onPointerDown={() => playSound("kick.wav")}
      >
        <circleGeometry args={[0.4, 40]} />
        <meshStandardMaterial color="blue" opacity={0.8} />
      </mesh>

      {/* Хай-хет (Hi-Hat) */}
      <mesh
        position={[-1.02, 1.5, 0.45]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerDown={() => playSound("hihat.flac")}
      >
        <circleGeometry args={[0.33, 40]} />
        <meshStandardMaterial color="yellow" opacity={0.8} />
      </mesh>

      {/* Томи (Tom 1 & Tom 2) */}
      <mesh
        position={[-0.3, 1.42, -0.6]}
        rotation={[-Math.PI / 3.6, 0.13, 0]}
        onPointerDown={() => playSound("tom1.wav")}
      >
        <circleGeometry args={[0.24, 32]} />
        <meshStandardMaterial color="green" opacity={0.8} />
      </mesh>

      <mesh
        position={[0.3, 1.42, -0.6]}
        rotation={[-Math.PI / 4, -0.13, 0]}
        onPointerDown={() => playSound("tom2.wav")}
      >
        <circleGeometry args={[0.24, 32]} />
        <meshStandardMaterial color="lime" opacity={0.8} />
      </mesh>

      {/* Тарілки (Ride) */}
      <mesh
        position={[1, 1.6, -0.5]}
        rotation={[-Math.PI / 4, -0.4, 0]}
        onPointerDown={() => playSound("ride.wav")}
      >
        <circleGeometry args={[0.35, 32]} />
        <meshStandardMaterial color="orange" opacity={0.8} />
      </mesh>

      <mesh
        position={[0.77, 0.9, 0.05]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerDown={() => playSound("floor-tom.wav")}
      >
        <circleGeometry args={[0.3, 40]} />
        <meshStandardMaterial color="purple" opacity={0.8} />
      </mesh>
    </group>
  );
}
