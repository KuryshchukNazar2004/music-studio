"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

const KEY_BINDINGS: { [key: string]: [number, number] } = {
  ArrowUp: [0, 1],
  ArrowDown: [0, -1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  w: [0, 1],
  s: [0, -1],
  a: [-1, 0],
  d: [1, 0],
};

export default function PlayerMovement({ playerRef }: { playerRef: any }) {
  const velocity = useRef(new THREE.Vector3());
  const { camera } = useThree();
  const [keyboard, setKeyboard] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useFrame(() => {
    const gamepads = navigator.getGamepads?.();
    if (gamepads) {
      for (const g of gamepads) {
        if (g) {
          console.log("Gamepad:", g.id, "axes:", g.axes);
        }
      }
    }

    let x = 0,
      y = 0;
    let usedGamepad = false;
    if (gamepads) {
      const controller = Array.from(gamepads).find(
        (g): g is Gamepad => !!g && !!g.axes && g.axes.length >= 2,
      );
      if (controller) {
        const axes = controller.axes;
        if (
          axes.length >= 4 &&
          (Math.abs(axes[2]) > 0.1 || Math.abs(axes[3]) > 0.1)
        ) {
          x = axes[2];
          y = axes[3];
          usedGamepad = true;
        } else if (
          axes.length >= 2 &&
          (Math.abs(axes[0]) > 0.1 || Math.abs(axes[1]) > 0.1)
        ) {
          x = axes[0];
          y = axes[1];
          usedGamepad = true;
        }
      }
    }
    if (!usedGamepad && (keyboard.x !== 0 || keyboard.y !== 0)) {
      x = keyboard.x;
      y = -keyboard.y;
    }
    if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) return;
    const direction = new THREE.Vector3(x, 0, -y)
      .normalize()
      .applyQuaternion(camera.quaternion);
    direction.y = 0;
    velocity.current.lerp(direction.multiplyScalar(0.08), 0.2);
    const body = playerRef.current;
    if (body) {
      const pos = body.translation();
      camera.position.set(pos.x, pos.y + 1.4, pos.z); 
    }
  });

  useEffect(() => {
    // --- KEYBOARD HANDLERS ---
    const down = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (KEY_BINDINGS[key]) {
        setKeyboard((prev) => ({
          x: prev.x + KEY_BINDINGS[key][0],
          y: prev.y + KEY_BINDINGS[key][1],
        }));
      }
    };
    const up = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (KEY_BINDINGS[key]) {
        setKeyboard((prev) => ({
          x: prev.x - KEY_BINDINGS[key][0],
          y: prev.y - KEY_BINDINGS[key][1],
        }));
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    const activate = () => {
      navigator.getGamepads?.();
      window.removeEventListener("keydown", activate);
      window.removeEventListener("mousedown", activate);
      window.removeEventListener("touchstart", activate);
    };
    window.addEventListener("keydown", activate);
    window.addEventListener("mousedown", activate);
    window.addEventListener("touchstart", activate);
  }, []);

  return null;
}
