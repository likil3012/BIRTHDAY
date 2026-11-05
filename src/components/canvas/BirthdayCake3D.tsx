import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BirthdayCake3DProps {
  isBlownOut: boolean;
}

// Single Candle with Realistic Flickering Flame
const Candle: React.FC<{
  position: [number, number, number];
  isBlownOut: boolean;
  candleColor?: string;
  delay?: number;
}> = ({ position, isBlownOut, candleColor = '#FFF8F5', delay = 0 }) => {
  const flameRef = useRef<THREE.Mesh>(null);
  const flameLightRef = useRef<THREE.PointLight>(null);
  const smokeRef = useRef<THREE.Points>(null);

  // Flame teardrop shape
  const flameOuterGeom = useMemo(() => {
    const geom = new THREE.ConeGeometry(0.085, 0.32, 16);
    geom.translate(0, 0.16, 0);
    return geom;
  }, []);

  const flameInnerGeom = useMemo(() => {
    const geom = new THREE.ConeGeometry(0.045, 0.22, 16);
    geom.translate(0, 0.11, 0);
    return geom;
  }, []);

  // Soft smoke particles when extinguished
  const smokeParticles = useMemo(() => {
    const count = 30;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.1;
      pos[i * 3 + 1] = Math.random() * 0.8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() + delay;

    if (flameRef.current) {
      if (isBlownOut) {
        // Flame shrinks and disappears
        flameRef.current.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), 0.18);
      } else {
        // Realistic organic candle flame flicker & dancing
        const flicker = 1.0 + Math.sin(time * 16) * 0.1 + Math.cos(time * 26) * 0.06;
        const tiltX = Math.sin(time * 8) * 0.09;
        const tiltZ = Math.cos(time * 7) * 0.09;

        flameRef.current.scale.set(flicker, flicker * 1.15, flicker);
        flameRef.current.rotation.set(tiltX, 0, tiltZ);
      }
    }

    if (flameLightRef.current) {
      if (isBlownOut) {
        flameLightRef.current.intensity = THREE.MathUtils.lerp(flameLightRef.current.intensity, 0, 0.15);
      } else {
        flameLightRef.current.intensity = 2.4 + Math.sin(time * 18) * 0.6;
      }
    }

    if (smokeRef.current && isBlownOut) {
      smokeRef.current.rotation.y = time * 0.3;
      smokeRef.current.position.y += 0.005;
      const mat = smokeRef.current.material as THREE.PointsMaterial;
      if (mat.opacity > 0) {
        mat.opacity -= 0.003;
      }
    }
  });

  return (
    <group position={position}>
      {/* Candle Body */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.7, 16]} />
        <meshStandardMaterial
          color={candleColor}
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>

      {/* Candle Golden Base Ring */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.07, 0.08, 0.04, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Wick */}
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.08, 8]} />
        <meshBasicMaterial color="#332211" />
      </mesh>

      {/* Flickering Flame Group */}
      <group ref={flameRef} position={[0, 0.74, 0]}>
        {/* Outer Warm Flame */}
        <mesh geometry={flameOuterGeom}>
          <meshBasicMaterial
            color="#FF6B00"
            transparent
            opacity={0.88}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        {/* Inner Brilliant Core */}
        <mesh geometry={flameInnerGeom}>
          <meshBasicMaterial
            color="#FFF2A0"
            transparent
            opacity={0.95}
          />
        </mesh>
      </group>

      {/* Candle Point Light */}
      <pointLight
        ref={flameLightRef}
        color="#FFAE42"
        intensity={2.2}
        distance={3.0}
        position={[0, 0.88, 0]}
      />

      {/* Smoke Wisps (Visible on Blow Out) */}
      {isBlownOut && (
        <points ref={smokeRef} position={[0, 0.75, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[smokeParticles, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.06}
            color="#FFD6E0"
            transparent
            opacity={0.6}
            sizeAttenuation
          />
        </points>
      )}
    </group>
  );
};

export const BirthdayCake3D: React.FC<BirthdayCake3DProps> = ({ isBlownOut }) => {
  const cakeGroupRef = useRef<THREE.Group>(null);
  const sparklesRef = useRef<THREE.Points>(null);

  // Decorative pearl beads along the bottom tier
  const pearls = useMemo(() => {
    const count = 32;
    const items = [];
    const radius = 1.62;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      items.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        angle,
      });
    }
    return items;
  }, []);

  // Top tier frosting rosettes
  const rosettes = useMemo(() => {
    const count = 18;
    const items = [];
    const radius = 1.05;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      items.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        angle,
      });
    }
    return items;
  }, []);

  // Celebratory golden burst sparkles
  const sparkles = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.0 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) + 0.5;
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (cakeGroupRef.current) {
      // Gentle floating rotation
      cakeGroupRef.current.rotation.y = time * 0.2;
      cakeGroupRef.current.position.y = Math.sin(time * 1.2) * 0.08;
    }
    if (sparklesRef.current) {
      sparklesRef.current.rotation.y = -time * 0.4;
      sparklesRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    }
  });

  // Candle positions on top of the cake (Circular arrangement with one in center)
  const candlePositions: Array<{ pos: [number, number, number]; color: string; delay: number }> = [
    { pos: [0, 1.4, 0], color: '#FFD700', delay: 0 },
    { pos: [0.55, 1.4, 0], color: '#FF6B9D', delay: 0.3 },
    { pos: [-0.55, 1.4, 0], color: '#FF6B9D', delay: 0.6 },
    { pos: [0, 1.4, 0.55], color: '#FFF8F5', delay: 0.9 },
    { pos: [0, 1.4, -0.55], color: '#FFF8F5', delay: 1.2 },
    { pos: [0.38, 1.4, 0.38], color: '#D4AF37', delay: 1.5 },
    { pos: [-0.38, 1.4, -0.38], color: '#D4AF37', delay: 1.8 },
  ];

  return (
    <group ref={cakeGroupRef} position={[0, -0.85, 0]} scale={0.88}>
      {/* Golden Pedestal Cake Stand */}
      <group position={[0, -0.9, 0]}>
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[2.0, 2.05, 0.1, 48]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.85}
            roughness={0.2}
            emissive="#7A5D10"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.3, 0.6, 0.6, 32]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.65, 0]}>
          <cylinderGeometry args={[1.3, 1.4, 0.1, 32]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>

      {/* Bottom Tier (Burgundy & Rose Velvet) */}
      <mesh position={[0, -0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.6, 1.6, 0.9, 48]} />
        <meshStandardMaterial
          color="#520726"
          roughness={0.35}
          metalness={0.1}
          emissive="#2A0012"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Bottom Tier Golden Ribbon Edge */}
      <mesh position={[0, -0.76, 0]}>
        <cylinderGeometry args={[1.62, 1.62, 0.08, 48]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Decorative Pearl Trim along bottom rim */}
      {pearls.map((p, i) => (
        <mesh key={i} position={[p.x, -0.74, p.z]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial
            color="#FFF8F5"
            metalness={0.2}
            roughness={0.1}
            emissive="#FFD6E0"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}

      {/* Middle Golden Filigree Ring */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[1.62, 1.62, 0.05, 48]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Top Tier (Champagne Cream & Rose Velvet) */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.0, 1.0, 0.9, 48]} />
        <meshStandardMaterial
          color="#FF6B9D"
          roughness={0.28}
          metalness={0.08}
          emissive="#631435"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Top Tier Frosting Cream Top */}
      <mesh position={[0, 1.21, 0]}>
        <cylinderGeometry args={[0.98, 1.01, 0.04, 48]} />
        <meshStandardMaterial
          color="#FFF8F5"
          roughness={0.2}
          metalness={0.05}
        />
      </mesh>

      {/* Frosting Rosettes around top rim */}
      {rosettes.map((r, i) => (
        <mesh key={i} position={[r.x, 1.22, r.z]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial
            color="#FFD6E0"
            emissive="#FF6B9D"
            emissiveIntensity={0.4}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Candles with Flames */}
      {candlePositions.map((c, i) => (
        <Candle
          key={i}
          position={c.pos}
          isBlownOut={isBlownOut}
          candleColor={c.color}
          delay={c.delay}
        />
      ))}

      {/* Celebratory Sparkle Halo */}
      <points ref={sparklesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sparkles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isBlownOut ? 0.09 : 0.05}
          color={isBlownOut ? '#FFD700' : '#FF6B9D'}
          transparent
          opacity={isBlownOut ? 0.95 : 0.4}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
};
