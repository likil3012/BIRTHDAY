import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FallingPetalsProps {
  count?: number;
}

export const FallingPetals: React.FC<FallingPetalsProps> = ({ count = 75 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Create curved organic rose petal geometry
  const petalGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(0.35, 0.45, 6, 6);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = (pos.getX(i) / 0.35) * 2;
      const v = (pos.getY(i) / 0.45) * 2;
      // Parabolic curve for realistic petal dish/curl
      const curve = -0.08 * (u * u) + 0.05 * (v * v);
      pos.setZ(i, curve);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Per-petal particle state
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 24,
      y: 12 + Math.random() * 15,
      z: (Math.random() - 0.5) * 16,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      speedY: 0.8 + Math.random() * 0.9,
      speedRotX: (Math.random() - 0.5) * 1.5,
      speedRotY: (Math.random() - 0.5) * 1.8,
      speedRotZ: (Math.random() - 0.5) * 1.5,
      swayFrequency: 0.8 + Math.random() * 1.2,
      swayAmplitude: 0.4 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      scale: 0.7 + Math.random() * 0.7,
      color: Math.random() > 0.4
        ? new THREE.Color(Math.random() > 0.5 ? '#9E0C3D' : '#FF2A6D')
        : new THREE.Color(Math.random() > 0.5 ? '#FF85A1' : '#FFD6E0'),
    }));
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      // Wind sway and downward drift
      p.y -= p.speedY * delta;
      p.x += Math.sin(time * p.swayFrequency + p.phase) * p.swayAmplitude * delta;
      p.z += Math.cos(time * (p.swayFrequency * 0.8) + p.phase) * (p.swayAmplitude * 0.5) * delta;

      // Tumbling rotation
      p.rotX += p.speedRotX * delta;
      p.rotY += p.speedRotY * delta;
      p.rotZ += p.speedRotZ * delta;

      // Loop back to top
      if (p.y < -12) {
        p.y = 14 + Math.random() * 5;
        p.x = (Math.random() - 0.5) * 24;
        p.z = (Math.random() - 0.5) * 16;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
      meshRef.current!.setColorAt(i, p.color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeometry, undefined, count]}
      castShadow
    >
      <meshStandardMaterial
        side={THREE.DoubleSide}
        roughness={0.4}
        metalness={0.1}
        transparent
        opacity={0.92}
        depthWrite={false}
      />
    </instancedMesh>
  );
};
