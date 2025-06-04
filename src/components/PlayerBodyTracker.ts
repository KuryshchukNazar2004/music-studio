import { useFrame } from "@react-three/fiber";

export function PlayerBodyTracker({
  rigidBodyRef,
  setPlayerBody,
}: {
  rigidBodyRef: React.RefObject<any>;
  setPlayerBody: (body: any) => void;
}) {
  useFrame(() => {
    if (rigidBodyRef.current) {
      setPlayerBody(rigidBodyRef.current);
    }
  });

  return null;
}
