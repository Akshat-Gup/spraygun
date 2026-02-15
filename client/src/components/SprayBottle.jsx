import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function SprayBottle({ onClick, spraying }) {
  const bottleRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Idle rotation and spray animation
  useFrame((state) => {
    if (bottleRef.current) {
      if (!spraying) {
        bottleRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
        bottleRef.current.scale.setScalar(hovered ? 1.1 : 1)
      } else {
        bottleRef.current.rotation.y += 0.1
        bottleRef.current.scale.setScalar(0.9 + Math.sin(state.clock.elapsedTime * 10) * 0.05)
      }
    }
  })

  return (
    <group
      ref={bottleRef}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Bottle Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.9, 3, 32]} />
        <meshStandardMaterial 
          color="#FF6B9D" 
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Bottle Neck */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 0.6, 32]} />
        <meshStandardMaterial 
          color="#FF6B9D" 
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Spray Nozzle */}
      <mesh position={[0, 2.3, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 0.4, 32]} />
        <meshStandardMaterial 
          color="#FFC75F" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Spray Trigger */}
      <mesh position={[0.5, 1.5, 0]} rotation={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial 
          color="#845EC2" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Label decoration */}
      <mesh position={[0, 0.2, 0.85]}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}

export default SprayBottle
