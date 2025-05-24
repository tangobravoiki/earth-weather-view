
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
  
  // Ultra gerçekçi 4K dünya haritası oluşturma
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 4096;  // 4K çözünürlük
    canvas.height = 2048;
    const context = canvas.getContext('2d')!;
    
    // Gerçekçi okyanus rengi gradyanı
    const oceanGradient = context.createLinearGradient(0, 0, 0, canvas.height);
    oceanGradient.addColorStop(0, '#1e3a5f');    // Kutup okyanusları
    oceanGradient.addColorStop(0.3, '#2563eb');  // Kuzey okyanusları
    oceanGradient.addColorStop(0.5, '#1d4ed8');  // Ekvator okyanusları
    oceanGradient.addColorStop(0.7, '#2563eb');  // Güney okyanusları
    oceanGradient.addColorStop(1, '#1e3a5f');    // Antarktika okyanusları
    
    context.fillStyle = oceanGradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Gerçekçi ülke ve coğrafi renk paleti
    const colors = {
      // Kuzey Amerika
      canada: '#0f766e',
      usa: '#059669',
      mexico: '#047857',
      
      // Güney Amerika
      brazil: '#166534',
      argentina: '#15803d',
      chile: '#16a34a',
      colombia: '#22c55e',
      peru: '#84cc16',
      venezuela: '#65a30d',
      
      // Avrupa
      russia: '#374151',
      scandinavia: '#4b5563',
      germany: '#6b7280',
      france: '#9ca3af',
      uk: '#d1d5db',
      spain: '#a3a3a3',
      italy: '#737373',
      poland: '#525252',
      turkey: '#d97706',
      
      // Afrika
      sahara: '#f59e0b',
      egypt: '#d97706',
      algeria: '#b45309',
      libya: '#92400e',
      nigeria: '#166534',
      southAfrica: '#15803d',
      kenya: '#16a34a',
      ethiopia: '#22c55e',
      congo: '#059669',
      
      // Asya
      china: '#dc2626',
      india: '#b91c1c',
      japan: '#991b1b',
      southKorea: '#7f1d1d',
      indonesia: '#0ea5e9',
      australia: '#f59e0b',
      newZealand: '#10b981',
      saudiArabia: '#d97706',
      iran: '#78716c',
      kazakhstan: '#57534e',
      mongolia: '#44403c',
      
      // Kutuplar
      arctic: '#f8fafc',
      antarctica: '#f1f5f9',
      greenland: '#e2e8f0'
    };
    
    // KUZEY AMERİKA - Detaylı çizim
    // Kanada - Gerçek şekil benzeri
    context.fillStyle = colors.canada;
    context.beginPath();
    context.moveTo(200, 120);
    context.quadraticCurveTo(300, 80, 500, 100);
    context.quadraticCurveTo(600, 120, 700, 140);
    context.quadraticCurveTo(800, 160, 900, 180);
    context.lineTo(900, 280);
    context.quadraticCurveTo(800, 260, 700, 250);
    context.quadraticCurveTo(600, 240, 500, 250);
    context.quadraticCurveTo(400, 260, 300, 270);
    context.quadraticCurveTo(250, 280, 200, 300);
    context.closePath();
    context.fill();
    
    // Hudson Körfezi
    context.fillStyle = '#1e3a5f';
    context.beginPath();
    context.arc(550, 200, 60, 0, Math.PI * 2);
    context.fill();
    
    // Grönland
    context.fillStyle = colors.greenland;
    context.beginPath();
    context.moveTo(1100, 80);
    context.quadraticCurveTo(1150, 60, 1200, 80);
    context.quadraticCurveTo(1220, 120, 1200, 160);
    context.quadraticCurveTo(1180, 200, 1150, 240);
    context.quadraticCurveTo(1120, 260, 1080, 240);
    context.quadraticCurveTo(1060, 200, 1080, 160);
    context.quadraticCurveTo(1090, 120, 1100, 80);
    context.fill();
    
    // Amerika Birleşik Devletleri - Gerçek şekil
    context.fillStyle = colors.usa;
    context.beginPath();
    context.moveTo(200, 300);
    context.quadraticCurveTo(250, 290, 300, 300);
    context.quadraticCurveTo(400, 310, 500, 320);
    context.quadraticCurveTo(600, 330, 700, 340);
    context.quadraticCurveTo(750, 350, 800, 360);
    context.lineTo(800, 420);
    context.quadraticCurveTo(750, 410, 700, 400);
    context.quadraticCurveTo(600, 390, 500, 380);
    context.quadraticCurveTo(400, 370, 300, 360);
    context.quadraticCurveTo(250, 350, 200, 340);
    context.closePath();
    context.fill();
    
    // Florida yarımadası
    context.fillStyle = colors.usa;
    context.beginPath();
    context.arc(720, 440, 30, 0, Math.PI * 2);
    context.fill();
    
    // Alaska
    context.fillStyle = colors.usa;
    context.beginPath();
    context.moveTo(120, 240);
    context.quadraticCurveTo(180, 220, 220, 240);
    context.quadraticCurveTo(240, 260, 220, 280);
    context.quadraticCurveTo(180, 300, 140, 280);
    context.quadraticCurveTo(100, 260, 120, 240);
    context.fill();
    
    // Meksika
    context.fillStyle = colors.mexico;
    context.beginPath();
    context.moveTo(200, 440);
    context.quadraticCurveTo(300, 430, 400, 440);
    context.quadraticCurveTo(500, 450, 600, 460);
    context.lineTo(600, 520);
    context.quadraticCurveTo(500, 510, 400, 500);
    context.quadraticCurveTo(300, 490, 200, 480);
    context.closePath();
    context.fill();
    
    // GÜNEY AMERİKA - Ultra detaylı
    // Brezilya - Amazon havzası dahil
    context.fillStyle = colors.brazil;
    context.beginPath();
    context.moveTo(500, 600);
    context.quadraticCurveTo(600, 590, 700, 600);
    context.quadraticCurveTo(800, 610, 850, 640);
    context.quadraticCurveTo(880, 700, 860, 760);
    context.quadraticCurveTo(840, 820, 800, 880);
    context.quadraticCurveTo(760, 940, 700, 980);
    context.quadraticCurveTo(640, 1000, 580, 980);
    context.quadraticCurveTo(520, 960, 480, 920);
    context.quadraticCurveTo(460, 880, 480, 840);
    context.quadraticCurveTo(490, 800, 500, 760);
    context.quadraticCurveTo(500, 720, 500, 680);
    context.quadraticCurveTo(500, 640, 500, 600);
    context.fill();
    
    // Amazon Nehri
    context.strokeStyle = '#1e3a5f';
    context.lineWidth = 8;
    context.beginPath();
    context.moveTo(500, 700);
    context.quadraticCurveTo(600, 690, 700, 700);
    context.quadraticCurveTo(750, 705, 800, 710);
    context.stroke();
    
    // Arjantin
    context.fillStyle = colors.argentina;
    context.beginPath();
    context.moveTo(520, 1000);
    context.quadraticCurveTo(580, 990, 620, 1020);
    context.quadraticCurveTo(640, 1080, 620, 1140);
    context.quadraticCurveTo(600, 1200, 580, 1260);
    context.quadraticCurveTo(560, 1300, 540, 1320);
    context.quadraticCurveTo(520, 1340, 500, 1320);
    context.quadraticCurveTo(480, 1300, 480, 1260);
    context.quadraticCurveTo(480, 1200, 500, 1140);
    context.quadraticCurveTo(510, 1080, 520, 1020);
    context.closePath();
    context.fill();
    
    // Şili - Uzun ince şerit
    context.fillStyle = colors.chile;
    context.fillRect(480, 1000, 40, 400);
    
    // And Dağları
    context.strokeStyle = '#78716c';
    context.lineWidth = 12;
    context.beginPath();
    context.moveTo(460, 600);
    context.lineTo(460, 1400);
    context.stroke();
    
    // AVRUPA - Detaylı çizim
    // Rusya (Avrupa kısmı)
    context.fillStyle = colors.russia;
    context.fillRect(2080, 200, 640, 400);
    
    // İskandinavya yarımadası
    context.fillStyle = colors.scandinavia;
    context.beginPath();
    context.moveTo(1900, 100);
    context.quadraticCurveTo(1950, 80, 2000, 100);
    context.quadraticCurveTo(2050, 120, 2100, 140);
    context.quadraticCurveTo(2150, 160, 2200, 180);
    context.lineTo(2200, 300);
    context.quadraticCurveTo(2150, 280, 2100, 260);
    context.quadraticCurveTo(2050, 240, 2000, 220);
    context.quadraticCurveTo(1950, 200, 1900, 180);
    context.closePath();
    context.fill();
    
    // Baltık Denizi
    context.fillStyle = '#1e3a5f';
    context.beginPath();
    context.arc(2050, 250, 50, 0, Math.PI * 2);
    context.fill();
    
    // İngiltere Adaları
    context.fillStyle = colors.uk;
    context.beginPath();
    context.arc(1720, 280, 40, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.arc(1680, 320, 25, 0, Math.PI * 2);
    context.fill();
    
    // Fransa
    context.fillStyle = colors.france;
    context.beginPath();
    context.moveTo(1760, 320);
    context.quadraticCurveTo(1800, 310, 1840, 320);
    context.quadraticCurveTo(1880, 330, 1900, 350);
    context.quadraticCurveTo(1920, 370, 1900, 390);
    context.quadraticCurveTo(1880, 410, 1840, 400);
    context.quadraticCurveTo(1800, 390, 1760, 380);
    context.quadraticCurveTo(1740, 360, 1760, 340);
    context.closePath();
    context.fill();
    
    // İspanya
    context.fillStyle = colors.spain;
    context.beginPath();
    context.moveTo(1680, 400);
    context.quadraticCurveTo(1720, 390, 1760, 400);
    context.quadraticCurveTo(1800, 410, 1820, 430);
    context.quadraticCurveTo(1840, 450, 1820, 470);
    context.quadraticCurveTo(1800, 490, 1760, 480);
    context.quadraticCurveTo(1720, 470, 1680, 460);
    context.quadraticCurveTo(1660, 440, 1680, 420);
    context.closePath();
    context.fill();
    
    // İtalya yarımadası
    context.fillStyle = colors.italy;
    context.beginPath();
    context.moveTo(1880, 400);
    context.quadraticCurveTo(1900, 420, 1910, 450);
    context.quadraticCurveTo(1920, 480, 1910, 510);
    context.quadraticCurveTo(1900, 540, 1880, 560);
    context.quadraticCurveTo(1860, 580, 1840, 560);
    context.quadraticCurveTo(1820, 540, 1830, 510);
    context.quadraticCurveTo(1840, 480, 1850, 450);
    context.quadraticCurveTo(1860, 420, 1880, 400);
    context.fill();
    
    // Sicilya
    context.fillStyle = colors.italy;
    context.beginPath();
    context.arc(1860, 580, 15, 0, Math.PI * 2);
    context.fill();
    
    // AFRİKA - Gerçekçi kıta şekli
    // Sahra Çölü
    context.fillStyle = colors.sahara;
    context.fillRect(1600, 500, 800, 200);
    
    // Mısır
    context.fillStyle = colors.egypt;
    context.beginPath();
    context.moveTo(2200, 500);
    context.quadraticCurveTo(2250, 490, 2300, 500);
    context.quadraticCurveTo(2350, 510, 2380, 540);
    context.quadraticCurveTo(2400, 570, 2380, 600);
    context.quadraticCurveTo(2350, 630, 2300, 620);
    context.quadraticCurveTo(2250, 610, 2200, 600);
    context.quadraticCurveTo(2180, 570, 2200, 540);
    context.closePath();
    context.fill();
    
    // Nil Nehri
    context.strokeStyle = '#1e3a5f';
    context.lineWidth = 6;
    context.beginPath();
    context.moveTo(2300, 600);
    context.quadraticCurveTo(2280, 700, 2260, 800);
    context.quadraticCurveTo(2240, 900, 2220, 1000);
    context.stroke();
    
    // Kongo havzası
    context.fillStyle = colors.congo;
    context.beginPath();
    context.arc(2000, 800, 120, 0, Math.PI * 2);
    context.fill();
    
    // Güney Afrika
    context.fillStyle = colors.southAfrica;
    context.beginPath();
    context.moveTo(1900, 1200);
    context.quadraticCurveTo(2000, 1190, 2100, 1200);
    context.quadraticCurveTo(2200, 1210, 2250, 1240);
    context.quadraticCurveTo(2280, 1270, 2250, 1300);
    context.quadraticCurveTo(2200, 1330, 2100, 1320);
    context.quadraticCurveTo(2000, 1310, 1900, 1300);
    context.quadraticCurveTo(1870, 1270, 1900, 1240);
    context.closePath();
    context.fill();
    
    // ASYA - Ultra detaylı
    // Rusya (Asya kısmı) - Sibirya
    context.fillStyle = colors.russia;
    context.fillRect(2400, 120, 1000, 400);
    
    // Çin
    context.fillStyle = colors.china;
    context.beginPath();
    context.moveTo(2800, 400);
    context.quadraticCurveTo(2900, 390, 3000, 400);
    context.quadraticCurveTo(3100, 410, 3180, 440);
    context.quadraticCurveTo(3220, 480, 3200, 520);
    context.quadraticCurveTo(3180, 560, 3140, 600);
    context.quadraticCurveTo(3100, 640, 3000, 630);
    context.quadraticCurveTo(2900, 620, 2800, 610);
    context.quadraticCurveTo(2760, 580, 2780, 540);
    context.quadraticCurveTo(2790, 500, 2800, 460);
    context.closePath();
    context.fill();
    
    // Büyük Çin Seddi
    context.strokeStyle = '#44403c';
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(2850, 450);
    context.quadraticCurveTo(2950, 440, 3050, 450);
    context.quadraticCurveTo(3150, 460, 3200, 480);
    context.stroke();
    
    // Hindistan yarımadası
    context.fillStyle = colors.india;
    context.beginPath();
    context.moveTo(2600, 600);
    context.quadraticCurveTo(2650, 590, 2700, 600);
    context.quadraticCurveTo(2750, 610, 2780, 640);
    context.quadraticCurveTo(2800, 680, 2780, 720);
    context.quadraticCurveTo(2760, 760, 2720, 800);
    context.quadraticCurveTo(2680, 840, 2640, 860);
    context.quadraticCurveTo(2600, 880, 2560, 860);
    context.quadraticCurveTo(2520, 840, 2500, 800);
    context.quadraticCurveTo(2480, 760, 2500, 720);
    context.quadraticCurveTo(2520, 680, 2540, 640);
    context.quadraticCurveTo(2560, 610, 2600, 600);
    context.fill();
    
    // Ganges Nehri
    context.strokeStyle = '#1e3a5f';
    context.lineWidth = 6;
    context.beginPath();
    context.moveTo(2550, 680);
    context.quadraticCurveTo(2650, 670, 2750, 680);
    context.stroke();
    
    // Himalayalar
    context.strokeStyle = '#f8fafc';
    context.lineWidth = 15;
    context.beginPath();
    context.moveTo(2500, 580);
    context.quadraticCurveTo(2600, 570, 2700, 580);
    context.quadraticCurveTo(2800, 590, 2900, 600);
    context.stroke();
    
    // Japonya
    context.fillStyle = colors.japan;
    context.beginPath();
    context.arc(3450, 480, 30, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.arc(3480, 520, 25, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.arc(3460, 560, 20, 0, Math.PI * 2);
    context.fill();
    
    // Kore yarımadası
    context.fillStyle = colors.southKorea;
    context.beginPath();
    context.moveTo(3380, 480);
    context.quadraticCurveTo(3400, 490, 3410, 510);
    context.quadraticCurveTo(3420, 530, 3410, 550);
    context.quadraticCurveTo(3400, 570, 3380, 560);
    context.quadraticCurveTo(3360, 550, 3360, 530);
    context.quadraticCurveTo(3360, 510, 3370, 490);
    context.closePath();
    context.fill();
    
    // Endonezya takımadaları
    context.fillStyle = colors.indonesia;
    for (let i = 0; i < 15; i++) {
      const x = 3000 + (i * 80);
      const y = 850 + Math.sin(i * 0.5) * 40;
      context.beginPath();
      context.arc(x, y, 15 + Math.random() * 10, 0, Math.PI * 2);
      context.fill();
    }
    
    // Avustralya
    context.fillStyle = colors.australia;
    context.beginPath();
    context.moveTo(3200, 1000);
    context.quadraticCurveTo(3350, 990, 3500, 1000);
    context.quadraticCurveTo(3650, 1010, 3750, 1040);
    context.quadraticCurveTo(3800, 1080, 3780, 1120);
    context.quadraticCurveTo(3760, 1160, 3700, 1180);
    context.quadraticCurveTo(3600, 1200, 3500, 1190);
    context.quadraticCurveTo(3400, 1180, 3300, 1170);
    context.quadraticCurveTo(3200, 1160, 3150, 1120);
    context.quadraticCurveTo(3120, 1080, 3150, 1040);
    context.closePath();
    context.fill();
    
    // Uluru (Ayers Rock)
    context.fillStyle = '#dc2626';
    context.beginPath();
    context.arc(3450, 1100, 8, 0, Math.PI * 2);
    context.fill();
    
    // Yeni Zelanda
    context.fillStyle = colors.newZealand;
    context.beginPath();
    context.arc(3800, 1200, 25, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.arc(3820, 1260, 20, 0, Math.PI * 2);
    context.fill();
    
    // ANTARKTIKA
    context.fillStyle = colors.antarctica;
    context.fillRect(0, 1600, canvas.width, 448);
    
    // Antarktika dağları
    context.strokeStyle = '#cbd5e1';
    context.lineWidth = 8;
    for (let i = 0; i < 20; i++) {
      const x = i * 200;
      context.beginPath();
      context.moveTo(x, 1600);
      context.lineTo(x + 100, 1500);
      context.lineTo(x + 200, 1600);
      context.stroke();
    }
    
    // KUZEY KUTBU
    context.fillStyle = colors.arctic;
    context.fillRect(0, 0, canvas.width, 80);
    
    // Kutup buz kütleleri
    context.fillStyle = '#e2e8f0';
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * 80;
      context.beginPath();
      context.arc(x, y, 20 + Math.random() * 30, 0, Math.PI * 2);
      context.fill();
    }
    
    // Atmosfer ve ışık efektleri
    const atmosphereGradient = context.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.height / 2
    );
    atmosphereGradient.addColorStop(0, 'rgba(59, 130, 246, 0.0)');
    atmosphereGradient.addColorStop(0.8, 'rgba(59, 130, 246, 0.1)');
    atmosphereGradient.addColorStop(1, 'rgba(59, 130, 246, 0.3)');
    
    context.fillStyle = atmosphereGradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Bulut formasyonları
    context.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = 30 + Math.random() * 80;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
    
    return new CanvasTexture(canvas);
  }, []);
  
  const handleClick = useCallback((event: any) => {
    event.stopPropagation();
    const point = event.point as Vector3;
    
    // 3D pozisyonu lat/lon'a çevir
    const radius = 2;
    const lat = Math.asin(point.y / radius) * (180 / Math.PI);
    const lon = Math.atan2(point.z, point.x) * (180 / Math.PI);
    
    console.log(`Globe clicked at lat: ${lat}, lon: ${lon}`);
    onLocationClick(lat, lon, point);
  }, [onLocationClick]);

  return (
    <group>
      {/* Ana Dünya küresi */}
      <mesh ref={meshRef} onClick={handleClick}>
        <sphereGeometry args={[2, 512, 256]} />
        <meshPhongMaterial 
          map={earthTexture}
          shininess={0.1}
          specular="#1e293b"
          bumpMap={earthTexture}
          bumpScale={0.02}
        />
      </mesh>
      
      {/* İç atmosfer parlaklığı */}
      <mesh>
        <sphereGeometry args={[2.01, 128, 64]} />
        <meshBasicMaterial 
          color="#3b82f6" 
          transparent 
          opacity={0.05}
          side={2}
        />
      </mesh>
      
      {/* Dış atmosfer */}
      <mesh>
        <sphereGeometry args={[2.05, 64, 32]} />
        <meshBasicMaterial 
          color="#60a5fa" 
          transparent 
          opacity={0.15}
          side={2}
        />
      </mesh>
      
      {/* Konum işaretleyici */}
      {selectedPosition && (
        <group position={selectedPosition}>
          <mesh>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#dc2626" />
          </mesh>
          {/* Pulsing ring effect */}
          <mesh>
            <ringGeometry args={[0.05, 0.08, 32]} />
            <meshBasicMaterial 
              color="#dc2626" 
              transparent 
              opacity={0.6}
              side={2}
            />
          </mesh>
        </group>
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
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[0, 5, 0]} intensity={0.3} color="#fbbf24" />
        
        <EarthSphere onLocationClick={onLocationClick} selectedPosition={selectedPosition} />
        
        <OrbitControls 
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.1}
          dampingFactor={0.05}
          enableDamping
        />
      </Canvas>
    </div>
  );
}
