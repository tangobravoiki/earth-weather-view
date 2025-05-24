
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useCallback } from 'react';
import { Vector3, Mesh, SphereGeometry, MeshPhongMaterial, MeshBasicMaterial } from 'three';

interface GlobeProps {
  onLocationClick: (lat: number, lon: number, position: Vector3) => void;
  selectedPosition?: Vector3;
}

function EarthSphere({ onLocationClick, selectedPosition }: GlobeProps) {
  const meshRef = useRef<Mesh>(null);
  
  const handleClick = useCallback((event: any) => {
    event.stopPropagation();
    const point = event.point as Vector3;
    
    // Convert 3D position to lat/lon
    const radius = 2; // Globe radius
    const lat = Math.asin(point.y / radius) * (180 / Math.PI);
    const lon = Math.atan2(point.z, point.x) * (180 / Math.PI);
    
    console.log(`Globe clicked at lat: ${lat}, lon: ${lon}`);
    onLocationClick(lat, lon, point);
  }, [onLocationClick]);

  return (
    <group>
      {/* Main Earth sphere */}
      <mesh ref={meshRef} onClick={handleClick}>
        <sphereGeometry args={[2, 64, 32]} />
        <meshPhongMaterial 
          color="#2E8B57"
          shininess={0.1}
          specular="#222222"
        />
      </mesh>
      
      {/* Atmospheric glow effect */}
      <mesh>
        <sphereGeometry args={[2.05, 64, 32]} />
        <meshBasicMaterial 
          color="#87CEEB" 
          transparent 
          opacity={0.1}
          side={2} // THREE.BackSide as number
        />
      </mesh>
      
      {/* Location marker */}
      {selectedPosition && (
        <mesh position={selectedPosition}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial color="#ff4444" />
        </mesh>
      )}
    </group>
  );
}

export default function Globe({ onLocationClick, selectedPosition }: GlobeProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'linear-gradient(to bottom, #000428, #004e92)' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4A90E2" />
        
        <EarthSphere onLocationClick={onLocationClick} selectedPosition={selectedPosition} />
        
        <OrbitControls 
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
