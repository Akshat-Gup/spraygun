import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function SprayParticles({ active }) {
  const particlesRef = useRef()
  const particleCount = 200

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = []
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      // Initial positions near the nozzle
      positions[i * 3] = (Math.random() - 0.5) * 0.2
      positions[i * 3 + 1] = 2.5 + Math.random() * 0.2
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2
      
      // Random velocities for spray effect
      velocities.push({
        x: (Math.random() - 0.5) * 0.1,
        y: Math.random() * 0.15 + 0.1,
        z: (Math.random() - 0.5) * 0.1
      })
      
      // Fun colors - pink, purple, yellow, cyan
      const colorChoice = Math.floor(Math.random() * 4)
      if (colorChoice === 0) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.42; colors[i * 3 + 2] = 0.62 // Pink
      } else if (colorChoice === 1) {
        colors[i * 3] = 0.52; colors[i * 3 + 1] = 0.37; colors[i * 3 + 2] = 0.76 // Purple
      } else if (colorChoice === 2) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.78; colors[i * 3 + 2] = 0.37 // Yellow
      } else {
        colors[i * 3] = 0.3; colors[i * 3 + 1] = 0.9; colors[i * 3 + 2] = 0.9 // Cyan
      }
    }
    
    return { positions, velocities, colors }
  }, [])

  useFrame(() => {
    if (!particlesRef.current || !active) return

    const positions = particlesRef.current.geometry.attributes.position.array
    
    for (let i = 0; i < particleCount; i++) {
      // Update positions based on velocities
      positions[i * 3] += particles.velocities[i].x
      positions[i * 3 + 1] += particles.velocities[i].y
      positions[i * 3 + 2] += particles.velocities[i].z
      
      // Apply gravity
      particles.velocities[i].y -= 0.005
      
      // Reset particles that have fallen
      if (positions[i * 3 + 1] < -3) {
        positions[i * 3] = (Math.random() - 0.5) * 0.2
        positions[i * 3 + 1] = 2.5
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2
        particles.velocities[i].x = (Math.random() - 0.5) * 0.1
        particles.velocities[i].y = Math.random() * 0.15 + 0.1
        particles.velocities[i].z = (Math.random() - 0.5) * 0.1
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  if (!active) return null

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

export default SprayParticles
