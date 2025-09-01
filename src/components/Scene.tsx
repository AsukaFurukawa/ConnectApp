'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import GLB component to prevent hydration issues
const GLBKorok = dynamic(() => import('./GLBKorok').then(mod => ({ default: mod.GLBKorok })), { ssr: false });

interface SceneProps {
  isSpeaking: boolean;
}

// Super Kawaii and Colorful Korok component
const KawaiiKorok = ({ isSpeaking }: { isSpeaking: boolean }) => {
  const groupRef = useRef<any>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main body - soft pink with cute texture */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial 
          color="#FFB6C1" 
          roughness={0.2}
          metalness={0.05}
        />
      </mesh>
      
      {/* Cute blush cheeks */}
      <mesh position={[-0.4, -0.1, 0.5]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#FF69B4" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0.4, -0.1, 0.5]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#FF69B4" transparent opacity={0.7} />
      </mesh>
      
      {/* Top leaf - bright green with sparkle */}
      <mesh position={[0, 0.8, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.4, 0.8, 0.05]} />
        <meshStandardMaterial 
          color="#32CD32" 
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>
      
      {/* Side leaves - different colors for variety */}
      <mesh position={[-0.5, 0.3, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.3, 0.6, 0.05]} />
        <meshStandardMaterial 
          color="#00CED1" 
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>
      <mesh position={[0.5, 0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.3, 0.6, 0.05]} />
        <meshStandardMaterial 
          color="#FFD700" 
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>
      
      {/* Super kawaii eyes - big and sparkly */}
      <mesh position={[-0.2, 0.1, 0.6]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.2, 0.1, 0.6]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Eye highlights - big and sparkly */}
      <mesh position={[-0.18, 0.18, 0.68]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.18, 0.18, 0.68]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Extra sparkle in eyes */}
      <mesh position={[-0.22, 0.12, 0.65]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#87CEEB" />
      </mesh>
      <mesh position={[0.22, 0.12, 0.65]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#87CEEB" />
      </mesh>
      
      {/* Cute heart-shaped mouth */}
      <mesh position={[0, -0.15, 0.6]}>
        <torusGeometry args={[0.12, 0.04, 8, 8, Math.PI]} />
        <meshStandardMaterial color="#FF1493" />
      </mesh>
      
      {/* Tiny nose */}
      <mesh position={[0, 0.05, 0.65]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#FFB6C1" />
      </mesh>
      
      {/* Cute little arms */}
      <mesh position={[-0.6, 0, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#FFB6C1" />
      </mesh>
      <mesh position={[0.6, 0, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#FFB6C1" />
      </mesh>
      
      {/* Little feet */}
      <mesh position={[-0.2, -0.6, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#FFB6C1" />
      </mesh>
      <mesh position={[0.2, -0.6, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#FFB6C1" />
      </mesh>
      
      {/* Speaking glow effect - rainbow colors! */}
      {isSpeaking && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.8, 16, 16]} />
          <meshStandardMaterial 
            color="#FF69B4" 
            transparent 
            opacity={0.2}
            emissive="#FF69B4"
            emissiveIntensity={0.6}
          />
        </mesh>
      )}
      
      {/* Extra sparkles when speaking */}
      {isSpeaking && (
        <>
          <mesh position={[-0.8, 0.5, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial 
              color="#FFD700" 
              emissive="#FFD700"
              emissiveIntensity={0.8}
            />
          </mesh>
          <mesh position={[0.8, 0.5, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial 
              color="#FF69B4" 
              emissive="#FF69B4"
              emissiveIntensity={0.8}
            />
          </mesh>
        </>
      )}
    </group>
  );
};

const Scene = ({ isSpeaking }: SceneProps) => {
  const [useGLB, setUseGLB] = useState(true);
  const [glbLoaded, setGlbLoaded] = useState(false);

  useEffect(() => {
    // Try to load GLB first, fallback to custom model if it fails
    const timer = setTimeout(() => {
      if (!glbLoaded) {
        console.log('GLB failed to load, using kawaii custom model');
        setUseGLB(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [glbLoaded]);

  return (
    <Canvas camera={{ position: [0, 0, 2.5], fov: 70 }}>
      <ambientLight intensity={1.0} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={1.0} />
      <pointLight position={[0, 10, 0]} intensity={0.8} />
      <pointLight position={[0, -10, 0]} intensity={0.6} />
      
      {useGLB ? (
        <GLBKorok 
          isSpeaking={isSpeaking} 
          onLoad={() => setGlbLoaded(true)}
        />
      ) : (
        <KawaiiKorok isSpeaking={isSpeaking} />
      )}
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default Scene;
