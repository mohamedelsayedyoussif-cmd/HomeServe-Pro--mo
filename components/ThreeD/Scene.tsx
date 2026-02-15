
import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Float, 
  ContactShadows, 
  Environment, 
  RoundedBox,
  Cylinder
} from '@react-three/drei';
import * as THREE from 'three';

const Window = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    {/* Frame */}
    <mesh>
      <boxGeometry args={[0.6, 0.8, 0.1]} />
      <meshStandardMaterial color="#334155" />
    </mesh>
    {/* Glass */}
    <mesh position={[0, 0, 0.03]}>
      <boxGeometry args={[0.5, 0.7, 0.05]} />
      <meshStandardMaterial 
        color="#bae6fd" 
        roughness={0.05} 
        metalness={0.9} 
        emissive="#0ea5e9"
        emissiveIntensity={0.1}
      />
    </mesh>
    {/* Divider */}
    <mesh position={[0, 0, 0.06]}>
      <boxGeometry args={[0.05, 0.7, 0.02]} />
      <meshStandardMaterial color="#1e293b" />
    </mesh>
  </group>
);

const Tree = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    <mesh position={[0, 0.4, 0]} castShadow>
      <cylinderGeometry args={[0.08, 0.12, 0.8]} />
      <meshStandardMaterial color="#451a03" />
    </mesh>
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh position={[0, 1.1, 0]} castShadow>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#166534" />
      </mesh>
    </Float>
  </group>
);

const RealisticHouse = () => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={[0, -0.5, 0]}>
      {/* Main Body - Split into two sections for architectural interest */}
      <group>
        {/* Main Block */}
        <RoundedBox args={[2.2, 1.8, 2.2]} radius={0.02} smoothness={4} position={[0, 0.9, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#f8fafc" roughness={0.8} />
        </RoundedBox>
        
        {/* Left Wing */}
        <RoundedBox args={[1.2, 1.4, 1.8]} radius={0.02} smoothness={4} position={[-1.4, 0.7, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#f1f5f9" roughness={0.8} />
        </RoundedBox>
      </group>

      {/* Roof Structure */}
      <group position={[0, 1.8, 0]}>
        {/* Main Roof */}
        <mesh rotation={[0, Math.PI / 4, 0]} position={[0, 0.5, 0]} castShadow>
          <coneGeometry args={[2.2, 1.2, 4]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        
        {/* Left Wing Roof */}
        <mesh rotation={[0, Math.PI / 4, 0]} position={[-1.4, 0.2, 0]} castShadow>
          <coneGeometry args={[1.2, 0.8, 4]} />
          <meshStandardMaterial color="#334155" roughness={0.4} />
        </mesh>

        {/* Chimney */}
        <mesh position={[0.6, 0.6, -0.4]} castShadow>
          <boxGeometry args={[0.3, 1, 0.3]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
      </group>

      {/* Porch / Ground Base */}
      <mesh position={[0, -0.05, 0.2]} receiveShadow>
        <boxGeometry args={[4.5, 0.1, 3.5]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>

      {/* Door */}
      <group position={[0, 0.5, 1.11]}>
        <mesh>
          <boxGeometry args={[0.6, 1, 0.05]} />
          <meshStandardMaterial color="#1e40af" />
        </mesh>
        {/* Knob */}
        <mesh position={[0.2, 0, 0.05]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Windows */}
      <Window position={[-0.7, 1, 1.11]} />
      <Window position={[0.7, 1, 1.11]} />
      <Window position={[-1.4, 0.8, 0.91]} />
      <Window position={[1.11, 1, 0]} />

      {/* Garden Elements */}
      <Tree position={[1.8, 0, 1.2]} />
      <Tree position={[-2.2, 0, -0.8]} />
      
      {/* Lawn Detail */}
      <mesh position={[0, -0.04, 0]} receiveShadow>
        <cylinderGeometry args={[2.8, 2.8, 0.05, 32]} />
        <meshStandardMaterial color="#166534" />
      </mesh>
    </group>
  );
};

const FloatingTool = ({ position, type, color }: { position: [number, number, number], type: 'hammer' | 'wrench', color: string }) => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5} position={position}>
      {type === 'hammer' ? (
        <group>
          <mesh castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.6]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          <mesh position={[0, 0.3, 0]} castShadow>
            <boxGeometry args={[0.2, 0.15, 0.4]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ) : (
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.7]} />
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.35, 0]} castShadow>
            <torusGeometry args={[0.08, 0.03, 8, 24]} />
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      )}
    </Float>
  );
};

const Scene: React.FC = () => {
  // Check for WebGL support
  const isWebGLAvailable = useMemo(() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }, []);

  if (!isWebGLAvailable) {
    return (
      <div className="w-full h-[400px] md:h-[600px] flex items-center justify-center bg-blue-50/30 rounded-[3rem]">
        <div className="text-center p-8">
          <img 
            src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800" 
            alt="Beautiful Realistic House" 
            className="w-full max-w-md rounded-3xl shadow-2xl mb-6 mx-auto"
          />
          <p className="text-slate-500 font-bold">
            Interactive 3D view requires a WebGL-compatible browser.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing relative">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[5, 4, 8]} fov={40} />
        
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} color="#fff" />
        
        <Suspense fallback={null}>
          <RealisticHouse />
          
          <FloatingTool position={[-3, 1.5, 1]} type="hammer" color="#1e40af" />
          <FloatingTool position={[3, 0.8, -1]} type="wrench" color="#f97316" />
          <FloatingTool position={[2.5, 2.5, 0]} type="wrench" color="#10b981" />
          
          <ContactShadows 
            position={[0, -0.6, 0]} 
            opacity={0.4} 
            scale={12} 
            blur={2} 
            far={4} 
          />
          <Environment preset="city" />
          
          <OrbitControls 
            enableZoom={false} 
            maxPolarAngle={Math.PI / 2.2} 
            minPolarAngle={Math.PI / 4}
            autoRotate
            autoRotateSpeed={0.4}
          />
        </Suspense>
      </Canvas>
      
      {/* Mobile Interaction Hint */}
      <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-slate-500 lg:hidden">
        Drag to Orbit
      </div>
    </div>
  );
};

export default Scene;
