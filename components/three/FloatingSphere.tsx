"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef } from "react";

function AnimatedSphere() {
  const ref: any = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.003;
    ref.current.rotation.x += 0.001;
  });

  return (
    <Sphere ref={ref} args={[1.5, 64, 64]}>
      <MeshDistortMaterial color="#22d3ee" distort={0.4} speed={2} />
    </Sphere>
  );
}

export default function FloatingSphere() {
  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} />

      <AnimatedSphere />
    </Canvas>
  );
}
