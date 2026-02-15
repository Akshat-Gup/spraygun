import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import SprayBottle from '../components/SprayBottle'
import SprayParticles from '../components/SprayParticles'
import '../styles/LandingPage.css'

function LandingPage() {
  const [spraying, setSpraying] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  const handleSprayClick = () => {
    setSpraying(true)
    
    // Show menu after spray animation
    setTimeout(() => {
      setShowMenu(true)
    }, 1500)
  }

  const handleGetStarted = () => {
    navigate('/dashboard')
  }

  return (
    <div className="landing-page">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        shadows
        gl={{ alpha: true, antialias: true }}
      >
        <color attach="background" args={['#667eea']} />
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, 0, -5]} intensity={0.8} color="#FF6B9D" />
        <pointLight position={[10, 0, -5]} intensity={0.8} color="#845EC2" />
        <hemisphereLight intensity={0.5} groundColor="#667eea" />
        
        <SprayBottle onClick={handleSprayClick} spraying={spraying} />
        <SprayParticles active={spraying} />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {!showMenu && (
        <div className="landing-text">
          <h1 className="title">SprayGun</h1>
          <p className="subtitle">AI-Powered Job Applications & Networking</p>
          <p className="instruction">Click the bottle to get started!</p>
        </div>
      )}

      {showMenu && (
        <div className="menu-container">
          <div className="menu">
            <h2>Welcome to SprayGun! 🎯</h2>
            <p className="menu-description">
              Spray & pray your way to your dream job! Our AI tool helps you:
            </p>
            <ul className="features-list">
              <li>📧 Send personalized job application emails</li>
              <li>🤝 Network with industry professionals</li>
              <li>📄 Showcase your CV and projects</li>
              <li>🎯 Target your role and location</li>
              <li>🚀 Automate the entire process</li>
            </ul>
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LandingPage
