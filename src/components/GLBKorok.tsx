'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

interface GLBKorokProps {
  isSpeaking: boolean;
  onLoad?: () => void;
}

export const GLBKorok = ({ isSpeaking, onLoad }: GLBKorokProps) => {
  const groupRef = useRef<Group>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  
  // Load the GLB model
  const { scene } = useGLTF('/models/rainy_korok.glb');

  useEffect(() => {
    if (scene) {
      console.log('GLB Korok: Model loaded successfully');
      setModelLoaded(true);
      
      // Call onLoad callback if provided
      if (onLoad) {
        onLoad();
      }
      
      // Scale and position the model appropriately
      scene.scale.set(1.5, 1.5, 1.5);
      scene.position.set(0, 0, 0);
      
      // Make sure all materials are properly set
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene, onLoad]);

  // Gentle floating animation
  useFrame((state) => {
    if (groupRef.current && modelLoaded) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Speaking animation - scale up slightly when speaking
  useEffect(() => {
    if (groupRef.current && modelLoaded) {
      if (isSpeaking) {
        groupRef.current.scale.set(1.1, 1.1, 1.1);
      } else {
        groupRef.current.scale.set(1, 1, 1);
      }
    }
  }, [isSpeaking, modelLoaded]);

  if (!modelLoaded) {
    return null; // Don't show anything while loading
  }

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
      
      {/* Speaking glow effect */}
      {isSpeaking && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[2, 16, 16]} />
          <meshStandardMaterial 
            color="#66BB6A" 
            transparent 
            opacity={0.1}
            emissive="#66BB6A"
            emissiveIntensity={0.3}
          />
        </mesh>
      )}
    </group>
  );
};

// Preload the model
useGLTF.preload('/models/rainy_korok.glb');
