
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
  
  // Gerçekçi siyasi dünya haritası oluşturma
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const context = canvas.getContext('2d')!;
    
    // Okyanus rengi - derin mavi
    context.fillStyle = '#1e3a8a';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Ülke renkleri
    const countryColors = {
      primary: '#22c55e',     // Ana yeşil
      secondary: '#16a34a',   // Koyu yeşil
      tertiary: '#15803d',    // Daha koyu yeşil
      quaternary: '#166534',  // En koyu yeşil
      desert: '#eab308',      // Çöl sarısı
      mountain: '#64748b',    // Dağ grisi
      tundra: '#f1f5f9'      // Tundra beyazı
    };
    
    // KUZEY AMERİKA
    // Kanada
    context.fillStyle = countryColors.secondary;
    context.fillRect(160, 100, 320, 140);
    context.fillRect(100, 160, 160, 80);
    context.fillRect(440, 120, 120, 100);
    context.fillRect(480, 80, 80, 60);
    
    // Grönland (Danimarka)
    context.fillStyle = countryColors.tundra;
    context.fillRect(560, 60, 100, 160);
    
    // Amerika Birleşik Devletleri
    context.fillStyle = countryColors.primary;
    context.fillRect(180, 240, 280, 160);
    context.fillRect(120, 280, 80, 80);
    // Alaska
    context.fillRect(80, 200, 80, 80);
    
    // Meksika
    context.fillStyle = countryColors.tertiary;
    context.fillRect(200, 400, 160, 80);
    
    // ORTA AMERİKA
    // Guatemala, Belize, El Salvador, Honduras, Nicaragua, Costa Rica, Panama
    context.fillStyle = countryColors.quaternary;
    context.fillRect(240, 480, 80, 40);
    
    // GÜNEY AMERİKA
    // Brezilya
    context.fillStyle = countryColors.primary;
    context.fillRect(320, 520, 120, 160);
    context.fillRect(340, 680, 100, 120);
    context.fillRect(360, 800, 80, 80);
    context.fillRect(440, 640, 60, 80);
    
    // Arjantin
    context.fillStyle = countryColors.secondary;
    context.fillRect(340, 880, 80, 160);
    context.fillRect(360, 1040, 60, 80);
    
    // Şili
    context.fillStyle = countryColors.tertiary;
    context.fillRect(320, 920, 40, 200);
    
    // Peru
    context.fillStyle = countryColors.quaternary;
    context.fillRect(280, 720, 80, 120);
    
    // Kolombiya
    context.fillStyle = countryColors.primary;
    context.fillRect(280, 600, 80, 80);
    
    // Venezuela
    context.fillStyle = countryColors.secondary;
    context.fillRect(320, 580, 100, 60);
    
    // AVRUPA
    // Rusya (Avrupa kısmı)
    context.fillStyle = countryColors.secondary;
    context.fillRect(1060, 200, 320, 200);
    
    // İskandinavya
    context.fillStyle = countryColors.primary;
    // Norveç
    context.fillRect(960, 80, 80, 240);
    // İsveç
    context.fillStyle = countryColors.secondary;
    context.fillRect(1040, 100, 60, 200);
    // Finlandiya
    context.fillStyle = countryColors.tertiary;
    context.fillRect(1100, 120, 80, 160);
    
    // Almanya
    context.fillStyle = countryColors.quaternary;
    context.fillRect(920, 240, 80, 100);
    
    // Fransa
    context.fillStyle = countryColors.primary;
    context.fillRect(860, 260, 80, 100);
    
    // İspanya
    context.fillStyle = countryColors.secondary;
    context.fillRect(800, 320, 100, 60);
    
    // İtalya
    context.fillStyle = countryColors.tertiary;
    context.fillRect(940, 340, 40, 120);
    context.fillRect(960, 400, 20, 40);
    
    // İngiltere
    context.fillStyle = countryColors.quaternary;
    context.fillRect(840, 220, 60, 100);
    
    // Polonya
    context.fillStyle = countryColors.primary;
    context.fillRect(1000, 240, 80, 80);
    
    // Türkiye
    context.fillStyle = countryColors.desert;
    context.fillRect(1080, 360, 120, 50);
    
    // AFRİKA
    // Mısır
    context.fillStyle = countryColors.desert;
    context.fillRect(1080, 400, 80, 80);
    
    // Libya
    context.fillStyle = countryColors.desert;
    context.fillRect(1000, 440, 100, 80);
    
    // Cezayir
    context.fillStyle = countryColors.desert;
    context.fillRect(920, 460, 100, 100);
    
    // Nijerya
    context.fillStyle = countryColors.primary;
    context.fillRect(920, 560, 80, 60);
    
    // Güney Afrika
    context.fillStyle = countryColors.secondary;
    context.fillRect(1000, 840, 120, 80);
    
    // Kenya
    context.fillStyle = countryColors.tertiary;
    context.fillRect(1140, 680, 60, 80);
    
    // Etiyopya
    context.fillStyle = countryColors.quaternary;
    context.fillRect(1120, 600, 80, 80);
    
    // Kongo
    context.fillStyle = countryColors.primary;
    context.fillRect(980, 680, 100, 120);
    
    // ASYA
    // Rusya (Asya kısmı)
    context.fillStyle = countryColors.secondary;
    context.fillRect(1220, 100, 400, 200);
    context.fillRect(1380, 200, 240, 100);
    
    // Çin
    context.fillStyle = countryColors.primary;
    context.fillRect(1440, 280, 240, 240);
    
    // Hindistan
    context.fillStyle = countryColors.tertiary;
    context.fillRect(1360, 460, 120, 200);
    context.fillRect(1400, 660, 80, 100);
    
    // Japonya
    context.fillStyle = countryColors.quaternary;
    context.fillRect(1720, 320, 40, 160);
    context.fillRect(1760, 360, 30, 120);
    
    // Güney Kore
    context.fillStyle = countryColors.primary;
    context.fillRect(1700, 360, 30, 80);
    
    // Endonezya
    context.fillStyle = countryColors.secondary;
    context.fillRect(1560, 640, 160, 60);
    context.fillRect(1520, 700, 200, 40);
    
    // Avustralya
    context.fillStyle = countryColors.desert;
    context.fillRect(1640, 720, 240, 160);
    context.fillRect(1660, 880, 200, 80);
    
    // Yeni Zelanda
    context.fillStyle = countryColors.primary;
    context.fillRect(1840, 840, 30, 80);
    context.fillRect(1870, 920, 24, 60);
    
    // Suudi Arabistan
    context.fillStyle = countryColors.desert;
    context.fillRect(1160, 460, 120, 160);
    
    // İran
    context.fillStyle = countryColors.mountain;
    context.fillRect(1200, 380, 140, 120);
    
    // Kazakistan
    context.fillStyle = countryColors.secondary;
    context.fillRect(1200, 260, 200, 120);
    
    // Moğolistan
    context.fillStyle = countryColors.mountain;
    context.fillRect(1480, 220, 160, 100);
    
    // Ülke sınırları çizme
    context.strokeStyle = '#1e293b';
    context.lineWidth = 2;
    
    // Büyük kıtaların ana sınırları
    const drawBorder = (x: number, y: number, width: number, height: number) => {
      context.strokeRect(x, y, width, height);
    };
    
    // Antarktika
    context.fillStyle = countryColors.tundra;
    context.fillRect(0, 960, 2048, 64);
    
    // Kuzey Kutbu
    context.fillRect(0, 0, 2048, 40);
    
    // Atmosfer parlaklığı için gradient ekle
    const gradient = context.createRadialGradient(1024, 512, 0, 1024, 512, 512);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.0)');
    gradient.addColorStop(0.7, 'rgba(56, 189, 248, 0.1)');
    gradient.addColorStop(1, 'rgba(56, 189, 248, 0.3)');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
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
        <sphereGeometry args={[2, 256, 128]} />
        <meshPhongMaterial 
          map={earthTexture}
          shininess={0.1}
          specular="#334155"
        />
      </mesh>
      
      {/* Atmosfer parlaklığı efekti */}
      <mesh>
        <sphereGeometry args={[2.02, 64, 32]} />
        <meshBasicMaterial 
          color="#60a5fa" 
          transparent 
          opacity={0.1}
          side={2} // THREE.BackSide as number
        />
      </mesh>
      
      {/* Konum işaretleyici */}
      {selectedPosition && (
        <mesh position={selectedPosition}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#dc2626" />
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
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#3b82f6" />
        
        <EarthSphere onLocationClick={onLocationClick} selectedPosition={selectedPosition} />
        
        <OrbitControls 
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  );
}
