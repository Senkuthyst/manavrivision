import { Suspense, useState, useRef, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, RotateCcw, Info, MapPin, ZoomIn, ZoomOut, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as THREE from "three";

interface Hotspot {
  id: string;
  position: [number, number, number];
  title: string;
  description: string;
}

interface PanoramicViewerProps {
  imageUrl: string;
  destinationName: string;
  hotspots?: Hotspot[];
  onClose?: () => void;
}

// Panoramic Sphere Component
function PanoramicSphere({ 
  imageUrl, 
  hotspots = [], 
  onHotspotClick 
}: { 
  imageUrl: string; 
  hotspots: Hotspot[];
  onHotspotClick: (hotspot: Hotspot) => void;
}) {
  const texture = useTexture(imageUrl);
  const sphereRef = useRef<THREE.Mesh>(null);
  
  // Configure texture for proper panoramic display
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <>
      <mesh ref={sphereRef} scale={[-1, 1, 1]}>
        <sphereGeometry args={[500, 64, 64]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      
      {/* Hotspots */}
      {hotspots.map((hotspot) => (
        <HotspotMarker
          key={hotspot.id}
          position={hotspot.position}
          hotspot={hotspot}
          onClick={() => onHotspotClick(hotspot)}
        />
      ))}
    </>
  );
}

// Hotspot Marker Component
function HotspotMarker({ 
  position, 
  hotspot, 
  onClick 
}: { 
  position: [number, number, number]; 
  hotspot: Hotspot;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hovered ? 1.3 : 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[5, 16, 16]} />
        <meshBasicMaterial 
          color={hovered ? "#f59e0b" : "#ef4444"} 
          transparent 
          opacity={0.9} 
        />
      </mesh>
      
      {/* Outer ring */}
      <mesh>
        <ringGeometry args={[6, 8, 32]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.5} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {hovered && (
        <Html position={[0, 15, 0]} center>
          <div className="bg-card/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            <p className="text-sm font-bold text-foreground">{hotspot.title}</p>
            <p className="text-xs text-muted-foreground">Click to learn more</p>
          </div>
        </Html>
      )}
    </group>
  );
}

// Camera Controller
function CameraController({ fov }: { fov: number }) {
  const { camera } = useThree();
  
  useFrame(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, 0.1);
      camera.updateProjectionMatrix();
    }
  });
  
  return null;
}

// Loading Fallback
function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-foreground font-medium">Loading 360° view...</p>
      </div>
    </Html>
  );
}

export function PanoramicViewer({ 
  imageUrl, 
  destinationName, 
  hotspots = [],
  onClose 
}: PanoramicViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [fov, setFov] = useState(75);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handleZoomIn = () => setFov((prev) => Math.max(30, prev - 10));
  const handleZoomOut = () => setFov((prev) => Math.min(100, prev + 10));
  const handleResetView = () => setFov(75);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`relative bg-background rounded-2xl overflow-hidden shadow-medium ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none" : "aspect-video"
      }`}
    >
      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-foreground/50 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display font-bold text-card text-lg">{destinationName}</h3>
              <p className="text-card/70 text-sm">360° VR Experience</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-card hover:bg-card/20"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </Button>
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-card hover:bg-card/20"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <Canvas camera={{ fov: 75, position: [0, 0, 0.1] }}>
        <Suspense fallback={<LoadingFallback />}>
          <PanoramicSphere 
            imageUrl={imageUrl} 
            hotspots={hotspots}
            onHotspotClick={setSelectedHotspot}
          />
          <CameraController fov={fov} />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            rotateSpeed={-0.3}
            dampingFactor={0.1}
            enableDamping
          />
        </Suspense>
      </Canvas>

      {/* Control Panel */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            className="text-foreground hover:bg-muted rounded-full"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleResetView}
            className="text-foreground hover:bg-muted rounded-full"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            className="text-foreground hover:bg-muted rounded-full"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <div className="flex items-center gap-1 px-2 text-muted-foreground">
            <Move className="w-4 h-4" />
            <span className="text-xs">Drag to look around</span>
          </div>
        </div>
      </div>

      {/* Hotspot Info Panel */}
      <AnimatePresence>
        {selectedHotspot && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-20 right-4 z-20 w-80 bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-4 h-4 text-primary" />
                </div>
                <h4 className="font-display font-bold text-foreground">{selectedHotspot.title}</h4>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedHotspot(null)}
                className="h-6 w-6"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {selectedHotspot.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions Overlay (shown briefly) */}
      <div className="absolute bottom-20 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2 text-card/60 text-sm">
          <div className="w-6 h-6 rounded-full border-2 border-secondary animate-pulse" />
          <span>Click hotspots for more info</span>
        </div>
      </div>
    </motion.div>
  );
}

// Default hotspots generator for destinations
export function generateHotspots(destinationId: string): Hotspot[] {
  const hotspotData: Record<string, Hotspot[]> = {
    kathmandu: [
      { id: "1", position: [100, 20, -80], title: "Durbar Square", description: "The historic heart of Kathmandu, featuring stunning Malla-era architecture, ancient temples, and the famous Kumari Ghar." },
      { id: "2", position: [-60, 10, 100], title: "Thamel District", description: "The vibrant tourist hub known for its narrow streets, colorful shops, and diverse restaurants serving global cuisines." },
      { id: "3", position: [50, -30, -100], title: "Pashupatinath Temple", description: "One of the most sacred Hindu temples dedicated to Lord Shiva, located on the banks of the Bagmati River." },
    ],
    pokhara: [
      { id: "1", position: [80, 30, -90], title: "Phewa Lake", description: "The stunning lake reflecting the Annapurna range, perfect for boating and watching spectacular sunsets." },
      { id: "2", position: [-70, 20, 80], title: "World Peace Pagoda", description: "A Buddhist stupa offering panoramic views of the Himalayas and Pokhara valley." },
      { id: "3", position: [30, -20, 110], title: "Davis Falls", description: "A unique waterfall where water disappears into an underground tunnel, named after a Swiss tourist." },
    ],
    lumbini: [
      { id: "1", position: [90, 10, -70], title: "Maya Devi Temple", description: "The exact birthplace of Buddha, marked by ancient ruins and the sacred Marker Stone." },
      { id: "2", position: [-80, 5, 60], title: "Ashoka Pillar", description: "Emperor Ashoka's stone pillar from 249 BC, marking Buddha's birthplace." },
      { id: "3", position: [20, -15, 100], title: "Eternal Flame", description: "The peace flame symbolizing Buddha's message of non-violence and harmony." },
    ],
    chitwan: [
      { id: "1", position: [100, 15, -60], title: "Jungle Safari Zone", description: "Experience wildlife including one-horned rhinos, Bengal tigers, and diverse bird species." },
      { id: "2", position: [-50, 25, 90], title: "Rapti River", description: "The lifeline of Chitwan, offering canoe rides and crocodile spotting opportunities." },
      { id: "3", position: [40, -10, -100], title: "Tharu Village", description: "Experience the indigenous Tharu culture, traditional dances, and local cuisine." },
    ],
    bhaktapur: [
      { id: "1", position: [85, 20, -85], title: "55 Window Palace", description: "The magnificent royal palace featuring intricate wood carvings and 55 windows." },
      { id: "2", position: [-65, 15, 75], title: "Nyatapola Temple", description: "Nepal's tallest temple, a five-story pagoda dedicated to the goddess Siddhi Lakshmi." },
      { id: "3", position: [25, -20, 105], title: "Pottery Square", description: "Traditional pottery-making area where artisans create beautiful terracotta works." },
    ],
    patan: [
      { id: "1", position: [95, 25, -75], title: "Patan Durbar Square", description: "A UNESCO site featuring exquisite Newari architecture and ancient royal palaces." },
      { id: "2", position: [-55, 20, 85], title: "Golden Temple", description: "Hiranya Varna Mahavihar, a stunning Buddhist monastery with golden facade." },
      { id: "3", position: [35, -15, 100], title: "Mahabouddha Temple", description: "Temple of 1000 Buddhas, covered entirely in terracotta tiles depicting Buddha." },
    ],
    bandipur: [
      { id: "1", position: [80, 30, -80], title: "Bazaar Street", description: "The charming preserved Newari trading town with traditional architecture." },
      { id: "2", position: [-70, 20, 70], title: "Thani Mai Temple", description: "Hilltop temple offering spectacular sunrise views over the Himalayas." },
      { id: "3", position: [30, -25, 95], title: "Siddha Cave", description: "Nepal's largest cave, featuring stalactites and spiritual significance." },
    ],
    annapurna: [
      { id: "1", position: [90, 35, -65], title: "Annapurna Base Camp", description: "The iconic trekking destination surrounded by towering Himalayan peaks." },
      { id: "2", position: [-60, 30, 80], title: "Machhapuchhre", description: "The sacred 'Fishtail' mountain, one of Nepal's most recognizable peaks." },
      { id: "3", position: [40, -20, 90], title: "Poon Hill", description: "Famous viewpoint for stunning sunrise views over the Annapurna and Dhaulagiri ranges." },
    ],
    swayambhu: [
      { id: "1", position: [85, 25, -80], title: "Main Stupa", description: "The ancient dome-shaped structure with Buddha's all-seeing eyes, symbolizing wisdom." },
      { id: "2", position: [-60, 15, 85], title: "Monkey Temple", description: "Playful monkeys inhabit the sacred grounds, believed to have grown from Buddha's hair." },
      { id: "3", position: [30, -20, 100], title: "Prayer Wheels", description: "Spin the prayer wheels clockwise to release mantras and accumulate merit." },
    ],
  };

  return hotspotData[destinationId] || [];
}