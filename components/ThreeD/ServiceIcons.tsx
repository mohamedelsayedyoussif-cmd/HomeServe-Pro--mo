
import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, PerspectiveCamera, Environment, Torus, Box, Cylinder, Sphere, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface IconProps {
  color?: string;
}

const NatureLeaf = ({ position, rotation, scale = 0.3 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) => (
  <mesh position={position} rotation={rotation} scale={scale}>
    <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
    <meshStandardMaterial color="#10b981" side={THREE.DoubleSide} />
  </mesh>
);

const PlumbingIcon = () => (
  <group>
    {/* Main Water Droplet */}
    <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
      <mesh castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          transparent 
          opacity={0.8} 
          roughness={0} 
          metalness={0.2}
          emissive="#2563eb"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Nature Element */}
      <NatureLeaf position={[0.4, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]} scale={0.25} />
    </Float>
    {/* Ripple Base */}
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
      <torusGeometry args={[0.4, 0.02, 16, 32]} />
      <meshStandardMaterial color="#3b82f6" transparent opacity={0.3} />
    </mesh>
  </group>
);

const ElectricityIcon = () => {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 4) * 0.05;
    }
  });
  return (
    <group ref={meshRef}>
      {/* Light Bulb Shape */}
      <mesh castShadow position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color="#fbbf24" 
          emissive="#fbbf24" 
          emissiveIntensity={1} 
          transparent 
          opacity={0.9} 
        />
      </mesh>
      <mesh position={[0, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} />
      </mesh>
      {/* Nature Vine */}
      <NatureLeaf position={[0.25, -0.1, 0.2]} rotation={[0.5, 0.5, 0]} scale={0.2} />
      <NatureLeaf position={[-0.25, -0.2, -0.2]} rotation={[-0.5, -0.5, 0]} scale={0.15} />
    </group>
  );
};

const ACIcon = () => {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.02;
    }
  });
  return (
    <group>
      <Float speed={4} floatIntensity={0.5}>
        <group ref={groupRef}>
          {/* Snowflake Crystals */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]} castShadow>
              <boxGeometry args={[0.05, 0.9, 0.05]} />
              <meshStandardMaterial color="#bae6fd" emissive="#bae6fd" emissiveIntensity={0.2} />
            </mesh>
          ))}
          <mesh castShadow>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#0ea5e9" metalness={0.5} roughness={0.1} />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

const CleaningIcon = () => (
  <group>
    {[...Array(5)].map((_, i) => (
      <Float 
        key={i} 
        speed={1.5 + i * 0.5} 
        rotationIntensity={1} 
        floatIntensity={2} 
        position={[Math.sin(i * 1.2) * 0.6, Math.cos(i * 1.5) * 0.6, Math.sin(i) * 0.3]}
      >
        <mesh castShadow>
          <sphereGeometry args={[0.15 + (i % 3) * 0.05, 32, 32]} />
          <meshStandardMaterial 
            color="#93c5fd" 
            transparent 
            opacity={0.4} 
            roughness={0} 
            metalness={0.1}
          />
        </mesh>
      </Float>
    ))}
    {/* Freshness Leaf */}
    <NatureLeaf position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.3} />
  </group>
);

const MaintenanceIcon = () => (
  <group rotation={[0, 0, -Math.PI / 4]}>
    {/* Wooden Handle */}
    <mesh castShadow>
      <cylinderGeometry args={[0.05, 0.06, 1, 16]} />
      <meshStandardMaterial color="#78350f" roughness={0.9} />
    </mesh>
    {/* Metal Head */}
    <mesh position={[0, 0.5, 0]} castShadow>
      <boxGeometry args={[0.4, 0.25, 0.25]} />
      <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
    </mesh>
    {/* Sprout */}
    <NatureLeaf position={[0, -0.4, 0.06]} rotation={[0, 0, Math.PI / 2]} scale={0.15} />
  </group>
);

const PaintingIcon = () => (
  <group>
    {/* Paint Can with Nature Colors */}
    <mesh castShadow>
      <cylinderGeometry args={[0.35, 0.35, 0.8, 32]} />
      <meshStandardMaterial color="#f1f5f9" />
    </mesh>
    {/* Drip */}
    <mesh position={[0.3, 0, 0]} castShadow>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color="#10b981" />
    </mesh>
    {/* Organic Brush */}
    <Float speed={2} position={[0.4, 0.5, 0]} rotation={[0, 0, 0.5]}>
      <mesh castShadow>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.15, 0.2, 0.1]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
    </Float>
  </group>
);

const CarpentryIcon = () => (
  <group>
    {/* Natural Wood Block */}
    <RoundedBox args={[1, 0.3, 0.6]} radius={0.05} smoothness={4} castShadow>
      <meshStandardMaterial color="#5c3a21" roughness={0.8} />
    </RoundedBox>
    {/* Sprouting Leaf */}
    <NatureLeaf position={[0, 0.2, 0]} rotation={[0, 0.5, 0]} scale={0.3} />
    {/* Wood Texture Detail */}
    <mesh position={[0.2, 0.16, 0]}>
      <boxGeometry args={[0.4, 0.01, 0.4]} />
      <meshStandardMaterial color="#3d2b1f" transparent opacity={0.5} />
    </mesh>
  </group>
);

const AppliancesIcon = () => (
  <group>
    {/* Clean White Eco Appliance */}
    <RoundedBox args={[0.7, 0.9, 0.7]} radius={0.08} smoothness={4} castShadow>
      <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.2} />
    </RoundedBox>
    {/* Eco Sticker */}
    <mesh position={[0, 0.2, 0.36]}>
      <circleGeometry args={[0.15, 32]} />
      <meshStandardMaterial color="#dcfce7" />
    </mesh>
    <NatureLeaf position={[0, 0.2, 0.38]} rotation={[0, 0, 0]} scale={0.12} />
    {/* Control Dial */}
    <mesh position={[0, -0.2, 0.36]} castShadow>
      <cylinderGeometry args={[0.08, 0.08, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]} />
      <meshStandardMaterial color="#1e40af" />
    </mesh>
  </group>
);

const getModel = (id: string) => {
  switch (id) {
    case 'plumbing': return <PlumbingIcon />;
    case 'electricity': return <ElectricityIcon />;
    case 'ac': return <ACIcon />;
    case 'cleaning': return <CleaningIcon />;
    case 'maintenance': return <MaintenanceIcon />;
    case 'painting': return <PaintingIcon />;
    case 'carpentry': return <CarpentryIcon />;
    case 'appliances': return <AppliancesIcon />;
    default: return <PlumbingIcon />;
  }
};

export const ServiceIconCanvas: React.FC<{ id: string; fallback: string }> = ({ id, fallback }) => {
  const isWebGLAvailable = useMemo(() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) { return false; }
  }, []);

  if (!isWebGLAvailable) {
    return <div className="text-6xl mb-6">{fallback}</div>;
  }

  return (
    <div className="w-full h-40 mb-4">
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 2.5], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.5} castShadow />
        <spotLight position={[-5, 5, 2]} intensity={0.5} angle={0.3} penumbra={1} />
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.8} floatIntensity={0.8}>
            {getModel(id)}
          </Float>
          <ContactShadows position={[0, -0.8, 0]} opacity={0.3} scale={3.5} blur={2} far={4} />
          <Environment preset="park" />
        </Suspense>
      </Canvas>
    </div>
  );
};
