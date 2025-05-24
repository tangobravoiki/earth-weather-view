

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
  
  // Gerçeğe yakın dünya haritası oluşturma
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext('2d')!;
    
    // Okyanus rengi - derin mavi
    context.fillStyle = '#0f172a';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Kara rengi - kahverengi/yeşil karışımı
    context.fillStyle = '#166534';
    
    // Kuzey Amerika - daha detaylı
    // Kanada
    context.fillRect(80, 50, 160, 70);
    context.fillRect(50, 80, 80, 40);
    context.fillRect(220, 60, 60, 50);
    
    // ABD
    context.fillRect(90, 120, 140, 80);
    context.fillRect(60, 140, 40, 40);
    
    // Meksika
    context.fillRect(100, 200, 80, 40);
    
    // Orta Amerika
    context.fillRect(120, 240, 40, 20);
    
    // Güney Amerika - daha gerçekçi şekil
    context.fillRect(160, 260, 60, 40);
    context.fillRect(170, 300, 50, 80);
    context.fillRect(180, 380, 40, 60);
    context.fillRect(190, 440, 30, 40);
    
    // Brezilya'nın doğu çıkıntısı
    context.fillRect(220, 320, 30, 40);
    
    // Grönland
    context.fillRect(280, 30, 50, 80);
    
    // Avrupa - daha detaylı
    // İskandinavya
    context.fillRect(480, 40, 60, 120);
    context.fillRect(520, 50, 40, 80);
    
    // Batı Avrupa
    context.fillRect(450, 120, 80, 80);
    context.fillRect(460, 160, 60, 40);
    
    // Doğu Avrupa
    context.fillRect(530, 100, 80, 100);
    
    // İngiltere ve İrlanda
    context.fillRect(440, 110, 30, 50);
    context.fillRect(420, 120, 15, 30);
    
    // Afrika - karakteristik şekil
    context.fillRect(480, 200, 90, 120);
    context.fillRect(490, 320, 80, 140);
    context.fillRect(500, 460, 60, 40);
    
    // Afrika'nın batı çıkıntısı
    context.fillRect(450, 280, 40, 60);
    
    // Afrika boynuzu
    context.fillRect(570, 340, 30, 40);
    
    // Asya - büyük kıta
    // Sibirya
    context.fillRect(610, 50, 200, 100);
    
    // Orta Asya
    context.fillRect(580, 150, 140, 80);
    
    // Hindistan alt kıtası
    context.fillRect(680, 230, 60, 100);
    context.fillRect(700, 330, 40, 50);
    
    // Çin
    context.fillRect(720, 140, 120, 120);
    
    // Güneydoğu Asya
    context.fillRect(780, 260, 80, 60);
    
    // Japonya
    context.fillRect(860, 160, 20, 80);
    context.fillRect(880, 180, 15, 60);
    
    // Kore
    context.fillRect(850, 180, 15, 40);
    
    // Avustralya - karakteristik şekil
    context.fillRect(820, 360, 120, 80);
    context.fillRect(830, 440, 100, 40);
    
    // Yeni Zelanda
    context.fillRect(920, 420, 15, 40);
    context.fillRect(935, 450, 12, 30);
    
    // Madagaskar
    context.fillRect(570, 380, 20, 60);
    
    // İngiltere detayı
    context.fillStyle = '#15803d';
    context.fillRect(440, 115, 25, 45);
    
    // İtalya
    context.fillRect(500, 180, 15, 60);
    context.fillRect(515, 200, 10, 20);
    
    // İspanya
    context.fillRect(430, 190, 50, 30);
    
    // Türkiye
    context.fillRect(540, 180, 60, 25);
    
    // Arap Yarımadası
    context.fillRect(580, 230, 60, 80);
    
    // Filipinler
    context.fillRect(810, 280, 25, 60);
    
    // Endonezya adaları
    context.fillRect(780, 320, 80, 30);
    context.fillRect(760, 350, 100, 20);
    
    // Buzullar - Antarktika
    context.fillStyle = '#f1f5f9';
    context.fillRect(0, 480, 1024, 32);
    
    // Kuzey Kutbu buzulları
    context.fillRect(0, 0, 1024, 20);
    
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
        <sphereGeometry args={[2, 128, 64]} />
        <meshPhongMaterial 
          map={earthTexture}
          shininess={0.2}
          specular="#1e293b"
        />
      </mesh>
      
      {/* Atmosfer parlaklığı efekti */}
      <mesh>
        <sphereGeometry args={[2.05, 64, 32]} />
        <meshBasicMaterial 
          color="#38bdf8" 
          transparent 
          opacity={0.15}
          side={2} // THREE.BackSide as number
        />
      </mesh>
      
      {/* Konum işaretleyici */}
      {selectedPosition && (
        <mesh position={selectedPosition}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshBasicMaterial color="#ef4444" />
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
        style={{ background: 'linear-gradient(to bottom, #0c0a09, #1e1b4b)' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} intensity={0.6} color="#60a5fa" />
        
        <EarthSphere onLocationClick={onLocationClick} selectedPosition={selectedPosition} />
        
        <OrbitControls 
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}

