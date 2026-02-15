
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const PhoneModel = () => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Phone Body */}
      <RoundedBox args={[2, 4, 0.2]} radius={0.15} smoothness={4}>
        <meshStandardMaterial color="#1e293b" />
      </RoundedBox>
      
      {/* Screen */}
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[1.8, 3.8]} />
        <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={0.2} />
      </mesh>

      {/* App Content Placeholder */}
      <mesh position={[0, 0.5, 0.12]}>
        <planeGeometry args={[1.4, 0.3]} />
        <meshStandardMaterial color="#ffffff" opacity={0.8} transparent />
      </mesh>
      <mesh position={[0, 0, 0.12]}>
        <planeGeometry args={[1.4, 0.3]} />
        <meshStandardMaterial color="#ffffff" opacity={0.5} transparent />
      </mesh>
      <mesh position={[0, -0.5, 0.12]}>
        <planeGeometry args={[1.4, 0.3]} />
        <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
      </mesh>

      {/* Button */}
      <mesh position={[0, -1.6, 0.11]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
    </group>
  );
};

const PhoneScene: React.FC = () => {
  return (
    <div className="w-full h-[400px] cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.8} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <PhoneModel />
          </Float>
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PhoneScene;
