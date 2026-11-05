import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FireworkBurst {
  particles: {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    alpha: number;
    color: THREE.Color;
  }[];
  active: boolean;
  age: number;
  lifespan: number;
}

interface Fireworks3DProps {
  burstTrigger?: number;
}

export const Fireworks3D: React.FC<Fireworks3DProps> = ({ burstTrigger = 0 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const maxBursts = 12; // Increased pool size
  const particlesPerBurst = 95;
  const totalCount = maxBursts * particlesPerBurst;

  // Geometry attributes buffers
  const { positions, colors } = useMemo(() => {
    return {
      positions: new Float32Array(totalCount * 3),
      colors: new Float32Array(totalCount * 3),
    };
  }, [totalCount]);

  // Burst pool
  const bursts = useRef<FireworkBurst[]>([]);

  // Initialize pool
  useEffect(() => {
    bursts.current = Array.from({ length: maxBursts }, () => ({
      particles: Array.from({ length: particlesPerBurst }, () => ({
        x: 0,
        y: -100,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        alpha: 0,
        color: new THREE.Color('#D4AF37'),
      })),
      active: false,
      age: 0,
      lifespan: 2.2,
    }));
  }, [maxBursts, particlesPerBurst]);

  // Launch a new firework burst
  const launchBurst = (isHeart = false, customOrigin?: [number, number, number]) => {
    // Find inactive or oldest active burst
    let burst = bursts.current.find((b) => !b.active);
    if (!burst) {
      burst = bursts.current.reduce((oldest, b) => (b.age > oldest.age ? b : oldest), bursts.current[0]);
    }
    if (!burst) return;

    burst.active = true;
    burst.age = 0;
    burst.lifespan = 2.0 + Math.random() * 0.6;

    const originX = customOrigin ? customOrigin[0] : (Math.random() - 0.5) * 12;
    const originY = customOrigin ? customOrigin[1] : 1.5 + Math.random() * 3.5;
    const originZ = customOrigin ? customOrigin[2] : (Math.random() - 0.5) * 4;

    const palette = [
      new THREE.Color('#FF6B9D'),
      new THREE.Color('#D4AF37'),
      new THREE.Color('#FFD6E0'),
      new THREE.Color('#FF1493'),
      new THREE.Color('#FFF8F5'),
      new THREE.Color('#FFD700'),
    ];
    const burstColor = palette[Math.floor(Math.random() * palette.length)];

    burst.particles.forEach((p, i) => {
      p.x = originX;
      p.y = originY;
      p.z = originZ;
      p.color = burstColor;
      p.alpha = 1.0;

      if (isHeart) {
        // Parametric heart blast trajectory
        const t = (i / particlesPerBurst) * Math.PI * 2;
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        const speed = 0.14 + Math.random() * 0.05;
        p.vx = (hx / 16) * speed;
        p.vy = (hy / 16) * speed;
        p.vz = (Math.random() - 0.5) * 0.06;
      } else {
        // Spherical starburst
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const speed = 1.4 + Math.random() * 2.0;
        p.vx = Math.sin(phi) * Math.cos(theta) * speed;
        p.vy = Math.sin(phi) * Math.sin(theta) * speed;
        p.vz = Math.cos(phi) * speed;
      }
    });
  };

  // Launch multiple bursts when burstTrigger changes
  useEffect(() => {
    if (burstTrigger > 0) {
      launchBurst(true, [0, 2.2, 0]); // Grand heart blast in center
      setTimeout(() => launchBurst(false, [-3.8, 2.8, -0.5]), 100);
      setTimeout(() => launchBurst(false, [3.8, 2.9, -0.5]), 200);
      setTimeout(() => launchBurst(true, [-2.0, 3.6, -1]), 320);
      setTimeout(() => launchBurst(true, [2.0, 3.6, -1]), 440);
    }
  }, [burstTrigger]);

  // Periodic ambient background launches
  const lastLaunchRef = useRef(0);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (time - lastLaunchRef.current > 2.0) {
      lastLaunchRef.current = time;
      launchBurst(Math.random() > 0.4);
    }

    if (!pointsRef.current) return;

    let pIndex = 0;

    bursts.current.forEach((burst) => {
      if (burst.active) {
        burst.age += delta;
        const progress = burst.age / burst.lifespan;

        if (progress >= 1.0) {
          burst.active = false;
        }

        burst.particles.forEach((p) => {
          // Velocity and gravity
          p.x += p.vx * delta * 1.8;
          p.y += p.vy * delta * 1.8 - 0.45 * delta;
          p.z += p.vz * delta * 1.8;

          p.vx *= 0.98;
          p.vy *= 0.98;
          p.vz *= 0.98;

          p.alpha = Math.max(0, 1.0 - progress);

          positions[pIndex * 3] = p.x;
          positions[pIndex * 3 + 1] = p.y;
          positions[pIndex * 3 + 2] = p.z;

          colors[pIndex * 3] = p.color.r * p.alpha;
          colors[pIndex * 3 + 1] = p.color.g * p.alpha;
          colors[pIndex * 3 + 2] = p.color.b * p.alpha;

          pIndex++;
        });
      } else {
        for (let i = 0; i < particlesPerBurst; i++) {
          positions[pIndex * 3] = 0;
          positions[pIndex * 3 + 1] = -100;
          positions[pIndex * 3 + 2] = 0;

          colors[pIndex * 3] = 0;
          colors[pIndex * 3 + 1] = 0;
          colors[pIndex * 3 + 2] = 0;

          pIndex++;
        }
      }
    });

    const posAttr = pointsRef.current.geometry.attributes.position;
    const colAttr = pointsRef.current.geometry.attributes.color;
    if (posAttr) posAttr.needsUpdate = true;
    if (colAttr) colAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.26}
        vertexColors
        transparent
        opacity={0.98}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};
