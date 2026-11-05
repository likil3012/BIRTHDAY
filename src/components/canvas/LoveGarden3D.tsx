import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { GardenFlower } from '../../data/romanticContent';
import { romanticAudio } from '../../utils/romanticAudio';

interface PetalLayerItem {
  angle: number;
  radius: number;
  yOffset: number;
  tilt: number;
  scale: number;
  layerIdx: number;
  key: string;
}

interface LoveGarden3DProps {
  flowers: GardenFlower[];
  activeFlowerId: number | null;
  onSelectFlower: (flower: GardenFlower) => void;
}

// Single Animated 3D Rose Flower Component
const RoseFlower: React.FC<{
  flower: GardenFlower;
  isActive: boolean;
  onSelect: () => void;
}> = ({ flower, isActive, onSelect }) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Generate rose petal geometries in layers
  const petalLayers = useMemo(() => {
    const layers: PetalLayerItem[] = [];
    const layerConfigs = [
      { count: 3, radius: 0.16, yOffset: 0.05, tilt: 0.25, scale: 0.35 },
      { count: 5, radius: 0.28, yOffset: 0.02, tilt: 0.55, scale: 0.45 },
      { count: 6, radius: 0.42, yOffset: -0.02, tilt: 0.85, scale: 0.55 },
      { count: 7, radius: 0.58, yOffset: -0.06, tilt: 1.15, scale: 0.65 },
    ];

    const petalGeom = new THREE.SphereGeometry(0.25, 12, 12);
    petalGeom.scale(1.0, 1.4, 0.4);

    layerConfigs.forEach((cfg, layerIdx) => {
      for (let i = 0; i < cfg.count; i++) {
        const angle = (i / cfg.count) * Math.PI * 2 + layerIdx * 0.4;
        layers.push({
          angle,
          radius: cfg.radius,
          yOffset: cfg.yOffset,
          tilt: cfg.tilt,
          scale: cfg.scale,
          layerIdx,
          key: `${layerIdx}-${i}`,
        });
      }
    });

    return { layers, petalGeom };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (headRef.current) {
      // Gentle breathing bloom and sway
      const targetScale = isActive ? 1.35 : hovered ? 1.2 : 1.0;
      const pulse = 1.0 + Math.sin(time * 2 + flower.id) * 0.03;
      headRef.current.scale.lerp(new THREE.Vector3(targetScale * pulse, targetScale * pulse, targetScale * pulse), 0.1);

      // Soft wind nodding
      headRef.current.rotation.z = Math.sin(time * 1.5 + flower.id) * 0.06;
      headRef.current.rotation.x = Math.cos(time * 1.2 + flower.id) * 0.06;
    }
  });

  return (
    <group
      ref={groupRef}
      position={flower.position}
      onClick={(e) => {
        e.stopPropagation();
        romanticAudio.playSparkleSound();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Rose Stem */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 1.2, 8]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.6} />
      </mesh>

      {/* Stem Leaves */}
      <mesh position={[-0.15, -0.4, 0]} rotation={[0.4, 0, -0.8]}>
        <coneGeometry args={[0.08, 0.35, 4]} />
        <meshStandardMaterial color="#387a32" roughness={0.5} />
      </mesh>
      <mesh position={[0.15, -0.7, 0]} rotation={[-0.3, 0, 0.8]}>
        <coneGeometry args={[0.08, 0.35, 4]} />
        <meshStandardMaterial color="#387a32" roughness={0.5} />
      </mesh>

      {/* Flower Head & Petals */}
      <group ref={headRef} position={[0, 0.05, 0]}>
        {/* Core Center Glow Bud */}
        <mesh position={[0, 0.08, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color={flower.bloomColor}
            emissive={flower.color}
            emissiveIntensity={hovered || isActive ? 1.4 : 0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Layered Petals */}
        {petalLayers.layers.map((p) => (
          <mesh
            key={p.key}
            geometry={petalLayers.petalGeom}
            position={[
              Math.cos(p.angle) * p.radius,
              p.yOffset,
              Math.sin(p.angle) * p.radius,
            ]}
            rotation={[
              p.tilt * Math.cos(p.angle),
              -p.angle,
              p.tilt * Math.sin(p.angle),
            ]}
            scale={p.scale}
          >
            <meshStandardMaterial
              color={p.layerIdx === 0 ? flower.bloomColor : flower.color}
              emissive={flower.color}
              emissiveIntensity={isActive ? 0.7 : hovered ? 0.4 : 0.2}
              roughness={0.3}
              metalness={0.05}
            />
          </mesh>
        ))}

        {/* Aura Point Light when active/hovered */}
        <pointLight
          color={flower.color}
          intensity={isActive ? 3.0 : hovered ? 1.8 : 0.6}
          distance={3.5}
        />
      </group>

      {/* Romantic Ground Halo / Blossom Ring */}
      <mesh position={[0, -1.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.25, 0.45, 24]} />
        <meshBasicMaterial
          color={flower.color}
          transparent
          opacity={isActive ? 0.6 : hovered ? 0.35 : 0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

// Animated Golden Butterfly Component
const GoldenButterfly: React.FC<{
  initialAngle: number;
  radius: number;
  speed: number;
  height: number;
}> = ({ initialAngle, radius, speed, height }) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Mesh>(null);
  const rightWingRef = useRef<THREE.Mesh>(null);

  // Wing geometry
  const wingGeom = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.2, 0.25, 0.4, 0.3, 0.35, 0.1);
    shape.bezierCurveTo(0.35, -0.05, 0.2, -0.15, 0, 0);
    return new THREE.ShapeGeometry(shape);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      const angle = initialAngle + time * speed;
      const x = Math.cos(angle) * (radius + Math.sin(time * 0.8) * 0.5);
      const z = Math.sin(angle) * (radius + Math.cos(time * 0.8) * 0.5);
      const y = height + Math.sin(time * 2.5 + initialAngle) * 0.35;

      groupRef.current.position.set(x, y, z);
      // Face flight direction
      groupRef.current.rotation.y = -angle + Math.PI / 2;
      groupRef.current.rotation.z = Math.sin(time * 3) * 0.15;
    }

    // Wing flapping
    const flap = Math.sin(time * 22) * 0.9;
    if (leftWingRef.current) leftWingRef.current.rotation.y = flap;
    if (rightWingRef.current) rightWingRef.current.rotation.y = -flap;
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh>
        <capsuleGeometry args={[0.02, 0.12, 6, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Left Wing */}
      <mesh ref={leftWingRef} geometry={wingGeom} position={[-0.02, 0, 0]}>
        <meshStandardMaterial
          color="#FFD700"
          emissive="#D4AF37"
          emissiveIntensity={0.6}
          side={THREE.DoubleSide}
          transparent
          opacity={0.88}
        />
      </mesh>
      {/* Right Wing */}
      <mesh
        ref={rightWingRef}
        geometry={wingGeom}
        position={[0.02, 0, 0]}
        rotation={[0, 0, Math.PI]}
      >
        <meshStandardMaterial
          color="#FFD700"
          emissive="#D4AF37"
          emissiveIntensity={0.6}
          side={THREE.DoubleSide}
          transparent
          opacity={0.88}
        />
      </mesh>
      <pointLight color="#FFD700" intensity={0.6} distance={1.2} />
    </group>
  );
};

export const LoveGarden3D: React.FC<LoveGarden3DProps> = ({
  flowers,
  activeFlowerId,
  onSelectFlower,
}) => {
  const pondRef = useRef<THREE.Mesh>(null);
  const firefliesRef = useRef<THREE.Points>(null);

  // Magical fireflies hovering around the garden
  const fireflies = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = -1.0 + Math.random() * 3.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (firefliesRef.current) {
      firefliesRef.current.rotation.y = time * 0.04;
    }
    if (pondRef.current) {
      const mat = pondRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.roughness = 0.15 + Math.sin(time * 0.8) * 0.05;
      }
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* Garden Pond / Reflective Water Pool */}
      <mesh
        ref={pondRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.2, 0]}
        receiveShadow
      >
        <circleGeometry args={[4.2, 64]} />
        <meshStandardMaterial
          color="#120822"
          roughness={0.15}
          metalness={0.85}
          emissive="#2A0B42"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Decorative Golden Pond Rim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.19, 0]}>
        <ringGeometry args={[4.1, 4.35, 64]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.3}
          metalness={0.8}
          emissive="#D4AF37"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Interactive Flowers */}
      {flowers.map((f) => (
        <RoseFlower
          key={f.id}
          flower={f}
          isActive={activeFlowerId === f.id}
          onSelect={() => onSelectFlower(f)}
        />
      ))}

      {/* Golden Butterflies */}
      <GoldenButterfly initialAngle={0} radius={2.2} speed={0.45} height={0.5} />
      <GoldenButterfly initialAngle={2.1} radius={2.7} speed={0.38} height={1.1} />
      <GoldenButterfly initialAngle={4.2} radius={1.8} speed={0.52} height={0.2} />

      {/* Fireflies / Fairy Dust */}
      <points ref={firefliesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[fireflies, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          color="#FFD6E0"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Central Garden Glow Light */}
      <pointLight
        color="#FF6B9D"
        intensity={2.0}
        distance={10}
        position={[0, 0.5, 0]}
      />
    </group>
  );
};
