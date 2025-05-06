// "use client";

// import { useColorStore } from "@/hooks/HitColorStore";
// import { useThree } from "@react-three/fiber";

// export default function HitColorHUD() {
//   const colors = useColorStore((state) => state.colors);
//   const { viewport } = useThree();

//   const position: [number, number, number] = [
//     viewport.width / 2 - 0.8,
//     viewport.height / 2 - 0.6,
//     -2,
//   ];

//   return (
//     <group position={position} rotation={[0, -0.4, 0]}>
//       {colors.map((color: string, index: number) => (
//         <mesh key={index} position={[index * 0.25, 0, 0]}>
//           <circleGeometry args={[0.08, 32]} />
//           <meshStandardMaterial color={color} />
//         </mesh>
//       ))}
//     </group>
//   );
// }

"use client";

import { Html } from "@react-three/drei";
import { useColorStore } from "@/hooks/HitColorStore";
import { useThree } from "@react-three/fiber";

export default function HitColorHUD() {
  const colors = useColorStore((state) => state.colors);
  const { viewport } = useThree();

  return (
    <Html
      position={[viewport.width / 2 - -3, -viewport.height / 2 + 0.4, -3]}
      transform
      occlude={false}
      rotation={[0, -0.5, 0]}
    >
      <div
        style={{
          display: "block",
          gap: "8px",
          background: "rgba(0, 0, 0, 0.5)",
          padding: "5px",
          borderRadius: "8px",
        }}
      >
        {colors.map((color: string, index: number) => (
          <div
            key={index}
            style={{
              width: 20,
              height: 20,
              backgroundColor: color,
              borderRadius: "50%",
              border: "2px solid white",
            }}
          />
        ))}
      </div>
    </Html>
  );
}
