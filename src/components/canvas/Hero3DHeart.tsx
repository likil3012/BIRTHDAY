import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

interface Hero3DHeartProps {
  onHeartClick?: () => void;
  interactive?: boolean;
}

export function createHeartGeometry(scale: number = 0.95) {
  const shape = new THREE.Shape();
  // Classic curvaceous romantic heart curve
  shape.moveTo(0, 0.45 * scale);
  shape.bezierCurveTo(0, 1.15 * scale, -1.25 * scale, 1.35 * scale, -1.25 * scale, 0.35 * scale);
  shape.bezierCurveTo(-1.25 * scale, -0.35 * scale, -0.6 * scale, -0.85 * scale, 0, -1.55 * scale);
  shape.bezierCurveTo(0.6 * scale, -0.85 * scale, 1.25 * scale, -0.35 * scale, 1.25 * scale, 0.35 * scale);
  shape.bezierCurveTo(1.25 * scale, 1.35 * scale, 0, 1.15 * scale, 0, 0.45 * scale);

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: 0.45 * scale,
    bevelEnabled: true,
    bevelSegments: 16,
    steps: 2,
    bevelSize: 0.28 * scale,
    bevelThickness: 0.28 * scale,
    curveSegments: 64,
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.center();
  geom.computeVertexNormals();
  return geom;
}

export const Hero3DHeart: React.FC<Hero3DHeartProps> = ({ onHeartClick, interactive = true }) => {
  const groupRef = useRef<THREE.Group>(null);
  const heartMeshRef = useRef<THREE.Mesh>(null);
  const heartMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const innerGlowRef = useRef<THREE.PointLight>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);
  const clickBoostRef = useRef<number>(0);

  // Generate main heart geometry - scaled so it fits fully within the canvas viewport
  const geometry = useMemo(() => createHeartGeometry(0.95), []);

  // Generate mini heart geometries for orbital halo
  const miniHeartGeom = useMemo(() => createHeartGeometry(0.09), []);

  // Orbiting mini hearts data
  const miniHearts = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2;
      const radius = 1.85 + (i % 3) * 0.25;
      const yOffset = Math.sin(i * 1.5) * 0.65;
      const speed = 0.5 + (i % 4) * 0.2;
      const color = i % 2 === 0 ? '#FF6B9D' : '#D4AF37';
      return { angle, radius, yOffset, speed, color, initialScale: 0.6 + Math.random() * 0.5 };
    });
  }, []);

  // Floating sparkle dust particles
  const sparkles = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const gold = new THREE.Color('#D4AF37');
    const rose = new THREE.Color('#FF6B9D');
    const blush = new THREE.Color('#FFD6E0');

    for (let i = 0; i < count; i++) {
      const r = 1.3 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const chosenColor = i % 3 === 0 ? gold : i % 3 === 1 ? rose : blush;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }
    return { pos, colors };
  }, []);

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    clickBoostRef.current = 0.25; // Extra surge on click
    if (onHeartClick) onHeartClick();
  };

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Decay user click boost
    if (clickBoostRef.current > 0) {
      clickBoostRef.current = Math.max(0, clickBoostRef.current - delta * 1.5);
    }

    if (groupRef.current) {
      // Gentle floating rotation & tilt
      groupRef.current.rotation.y = Math.sin(time * 0.4) * 0.32;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.10;

      // Mouse-responsive parallax if interactive
      if (interactive) {
        const targetX = (state.pointer.x * Math.PI) / 9;
        const targetY = (-state.pointer.y * Math.PI) / 12;
        groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
        groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
      }
    }

    // Clear, powerful, rhythmic Lub-Dub heartbeat (approx 92 BPM)
    const beatCycle = time % 1.25;
    let pulseScale = 1.0;
    let lightIntensity = 2.5;
    let emissiveIntensity = 0.22;

    if (beatCycle < 0.22) {
      // First strong systolic beat (LUB)
      const t = beatCycle / 0.22;
      const beatShape = Math.sin(t * Math.PI);
      pulseScale = 1.0 + beatShape * 0.20 + clickBoostRef.current;
      lightIntensity = 2.5 + beatShape * 3.5;
      emissiveIntensity = 0.22 + beatShape * 0.22;
    } else if (beatCycle < 0.32) {
      // Brief settling pause
      pulseScale = 1.0 + clickBoostRef.current * 0.5;
      lightIntensity = 2.5;
      emissiveIntensity = 0.22;
    } else if (beatCycle < 0.52) {
      // Second diastolic beat (DUB)
      const t = (beatCycle - 0.32) / 0.20;
      const beatShape = Math.sin(t * Math.PI);
      pulseScale = 1.0 + beatShape * 0.13 + clickBoostRef.current * 0.6;
      lightIntensity = 2.5 + beatShape * 2.2;
      emissiveIntensity = 0.22 + beatShape * 0.15;
    } else {
      // Rest / breathing phase
      pulseScale = 1.0 + clickBoostRef.current;
      lightIntensity = 2.2 + Math.sin(time * 2.0) * 0.3;
      emissiveIntensity = 0.20;
    }

    if (heartMeshRef.current) {
      heartMeshRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }

    if (heartMaterialRef.current) {
      heartMaterialRef.current.emissiveIntensity = emissiveIntensity;
    }

    if (innerGlowRef.current) {
      innerGlowRef.current.intensity = lightIntensity;
    }

    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y = time * 0.3;
      orbitGroupRef.current.rotation.z = Math.sin(time * 0.2) * 0.12;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} onClick={handleClick} position={[0, 0, 0]}>
        {/* Core Heart Mesh with rich 3D ruby crystal appearance */}
        <mesh ref={heartMeshRef} geometry={geometry} castShadow receiveShadow>
          <meshPhysicalMaterial
            ref={heartMaterialRef}
            color="#A80D38"
            emissive="#5C001F"
            emissiveIntensity={0.22}
            roughness={0.14}
            metalness={0.16}
            clearcoat={1.0}
            clearcoatRoughness={0.06}
            transmission={0.28}
            ior={1.48}
            reflectivity={0.92}
            specularColor="#FFE4E1"
          />
        </mesh>

        {/* Inner Heart Core Light */}
        <pointLight
          ref={innerGlowRef}
          color="#FF1493"
          intensity={3.0}
          distance={8}
          decay={2}
          position={[0, 0, 0.4]}
        />
        <pointLight
          color="#D4AF37"
          intensity={1.8}
          distance={6}
          decay={2}
          position={[0, 0.8, -0.6]}
        />

        {/* Orbiting Mini Hearts */}
        <group ref={orbitGroupRef}>
          {miniHearts.map((h, i) => (
            <mesh
              key={i}
              geometry={miniHeartGeom}
              position={[
                Math.cos(h.angle) * h.radius,
                h.yOffset,
                Math.sin(h.angle) * h.radius,
              ]}
              rotation={[0.3, h.angle + Math.PI / 2, 0.2]}
              scale={h.initialScale}
            >
              <meshStandardMaterial
                color={h.color}
                emissive={h.color}
                emissiveIntensity={0.7}
                roughness={0.2}
                metalness={0.3}
              />
            </mesh>
          ))}
        </group>

        {/* Sparkle Stardust halo */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[sparkles.pos, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[sparkles.colors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.07}
            vertexColors
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>
      </group>
    </Float>
  );
};
