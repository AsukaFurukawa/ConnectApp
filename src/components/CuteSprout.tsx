'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface CuteSproutProps {
  isSpeaking: boolean;
}

export const CuteSprout = ({ isSpeaking }: CuteSproutProps) => {
  const groupRef = useRef<Mesh>(null);

  // Gentle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main body - creamy center */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial 
          color="#F8F8F0" 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* First layer of leaves - light green */}
      <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshStandardMaterial 
          color="#A5D6A7" 
          roughness={0.4}
          metalness={0.05}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Second layer of leaves - medium green */}
      <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 8]}>
        <sphereGeometry args={[1.0, 16, 16]} />
        <meshStandardMaterial 
          color="#81C784" 
          roughness={0.4}
          metalness={0.05}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Third layer of leaves - darker green */}
      <mesh position={[0, 0.3, 0]} rotation={[0, 0, -Math.PI / 8]}>
        <sphereGeometry args={[1.1, 16, 16]} />
        <meshStandardMaterial 
          color="#66BB6A" 
          roughness={0.4}
          metalness={0.05}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Top sprout leaves */}
      <mesh position={[0, 1.2, 0]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color="#4CAF50" 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Left leaf */}
      <mesh position={[-0.4, 1.1, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.6, 0.15, 0.1]} />
        <meshStandardMaterial 
          color="#4CAF50" 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Right leaf */}
      <mesh position={[0.4, 1.1, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.6, 0.15, 0.1]} />
        <meshStandardMaterial 
          color="#4CAF50" 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Cute eyes */}
      <mesh position={[-0.2, 0.1, 0.7]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#2E2E2E" />
      </mesh>
      <mesh position={[0.2, 0.1, 0.7]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#2E2E2E" />
      </mesh>

      {/* Cute smile */}
      <mesh position={[0, -0.1, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.03, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#2E2E2E" />
      </mesh>

      {/* Blush cheeks */}
      <mesh position={[-0.4, -0.1, 0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color="#FFB3BA" 
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh position={[0.4, -0.1, 0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color="#FFB3BA" 
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Heart that it's holding */}
      <mesh position={[0, -0.8, 0.5]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.2, 0.2, 0.1]} />
        <meshStandardMaterial 
          color="#FF6B6B" 
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Speaking animation - pulsing glow effect */}
      {isSpeaking && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshStandardMaterial 
            color="#66BB6A" 
            transparent 
            opacity={0.2}
            emissive="#66BB6A"
            emissiveIntensity={0.3}
          />
        </mesh>
      )}
    </group>
  );
};
