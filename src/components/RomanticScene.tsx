import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const HeartShape = () => {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const x = 0, y = 0;
    s.moveTo(x, y + 0.5);
    s.bezierCurveTo(x, y + 0.5, x - 0.1, y + 0.35, x - 0.5, y + 0.35);
    s.bezierCurveTo(x - 1, y + 0.35, x - 1, y + 0.75, x - 1, y + 0.75);
    s.bezierCurveTo(x - 1, y + 1.1, x - 0.7, y + 1.4, x, y + 1.8);
    s.bezierCurveTo(x + 0.7, y + 1.4, x + 1, y + 1.1, x + 1, y + 0.75);
    s.bezierCurveTo(x + 1, y + 0.75, x + 1, y + 0.35, x + 0.5, y + 0.35);
    s.bezierCurveTo(x + 0.1, y + 0.35, x, y + 0.5, x, y + 0.5);
    return s;
  }, []);

  return shape;
};

const FloatingHeart = ({ position, scale, speed, color }: { 
  position: [number, number, number]; 
  scale: number; 
  speed: number;
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const shape = HeartShape();
  const initialY = position[1];

  const geometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    });
    geo.center();
    return geo;
  }, [shape]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.position.y = initialY + Math.sin(t) * 0.5;
    meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
    meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.4}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
};

const ParticleRing = () => {
  const ref = useRef<THREE.Points>(null!);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3 + Math.random() * 1.5;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#d4a574"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Scene = () => {
  const hearts = useMemo(() => [
    { position: [-2.5, 1, -2] as [number, number, number], scale: 0.25, speed: 0.6, color: "#d4919e" },
    { position: [2.8, -0.5, -3] as [number, number, number], scale: 0.3, speed: 0.45, color: "#e8b4b8" },
    { position: [-1.5, -1.5, -1.5] as [number, number, number], scale: 0.18, speed: 0.7, color: "#c9956b" },
    { position: [1.5, 1.8, -2.5] as [number, number, number], scale: 0.22, speed: 0.55, color: "#d4919e" },
    { position: [0, -2, -3] as [number, number, number], scale: 0.15, speed: 0.8, color: "#e8b4b8" },
    { position: [-3, 0, -4] as [number, number, number], scale: 0.35, speed: 0.35, color: "#d4a574" },
    { position: [3.5, 1.5, -4] as [number, number, number], scale: 0.28, speed: 0.5, color: "#c9956b" },
  ], []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffeedd" />
      <pointLight position={[-3, 2, 2]} intensity={0.8} color="#d4919e" distance={10} />
      <pointLight position={[3, -1, 1]} intensity={0.5} color="#d4a574" distance={8} />

      {hearts.map((heart, i) => (
        <FloatingHeart key={i} {...heart} />
      ))}

      <ParticleRing />

      <Sparkles
        count={80}
        scale={8}
        size={2}
        speed={0.3}
        color="#d4a574"
        opacity={0.5}
      />
      <Sparkles
        count={40}
        scale={6}
        size={3}
        speed={0.2}
        color="#e8b4b8"
        opacity={0.4}
      />
    </>
  );
};

const RomanticScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default RomanticScene;
