
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useCallback, useMemo } from 'react';
import { Vector3, Mesh, CanvasTexture } from 'three';

interface GlobeProps {
  onLocationClick: (lat: number, lon: number, position: Vector3) => void;
  selectedPosition?: Vector3;
}

function EarthSphere({ onLocationClick, selectedPosition }: GlobeProps) {
  const meshRef = useRef<Mesh>(null);
  
  // Procedural earth texture oluşturma
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext('2d')!;
    
    // Mavi okyanus arka planı
    context.fillStyle = '#1e40af';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Yeşil kara parçaları (basit kıtalar)
    context.fillStyle = '#22c55e';
    
    // Kuzey Amerika
    context.fillRect(50, 80, 80, 60);
    context.fillRect(100, 70, 40, 30);
    
    // Güney Amerika
    context.fillRect(80, 140, 30, 80);
    
    // Avrupa
    context.fillRect(200, 60, 40, 40);
    
    // Afrika
    context.fillRect(220, 100, 50, 100);
    
    // Asya
    context.fillRect(280, 50, 120, 80);
    context.fillRect(350, 130, 60, 40);
    
    // Avustralya
    context.fillRect(380, 180, 50, 30);
    
    // Bazı adalar
    context.fillRect(420, 120, 15, 10);
    context.fillRect(450, 90, 20, 15);
    
    return new CanvasTexture(canvas);
  }, []);
  
  const handleClick = useCallback((event: any) => {
    event.stopPropagation();
    const point = event.point as Vector3;
    
    // 3D pozisyonu lat/lon'a çevir
    const radius = 2; // Globe yarıçapı
    const lat = Math.asin(point.y / radius) * (180 / Math.PI);
    const lon = Math.atan2(point.z, point.x) * (180 / Math.PI);
    
    console.log(`Globe clicked at lat: ${lat}, lon: ${lon}`);
    onLocationClick(lat, lon, point);
  }, [onLocationClick]);

  return (
    <group>
      {/* Ana Dünya küresi */}
      <mesh ref={meshRef} onClick={handleClick}>
        <sphereGeometry args={[2, 64, 32]} />
        <meshPhongMaterial 
          map={earthTexture}
          shininess={0.1}
          specular="#222222"
        />
      </mesh>
      
      {/* Atmosfer parlaklığı efekti */}
      <mesh>
        <sphereGeometry args={[2.05, 64, 32]} />
        <meshBasicMaterial 
          color="#87CEEB" 
          transparent 
          opacity={0.1}
          side={2} // THREE.BackSide as number
        />
      </mesh>
      
      {/* Konum işaretleyici */}
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
