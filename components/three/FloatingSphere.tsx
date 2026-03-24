"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial color="#6366f1" wireframe />
    </mesh>
  );
}

export default function FloatingSphere() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />

      <Sphere />

      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  );
}