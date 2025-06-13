'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface ParticleProps {
  count: number;
  color?: string;
  size?: number;
  speed?: number;
  density?: number;
}

function Particles({ count, color = '#3b82f6', size = 0.02, speed = 0.1, density = 50 }: ParticleProps) {
  const mesh = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  // 创建粒子
  useEffect(() => {
    if (mesh.current) {
      // 重置粒子位置
      const positions = new Float32Array(count * 3);
      const scales = new Float32Array(count);
      
      for (let i = 0; i < count; i++) {
        // 随机分布在3D空间中
        const distance = Math.random() * density;
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i * 3] = distance * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = distance * Math.cos(phi);
        
        scales[i] = Math.random() * 2.5;
      }
      
      mesh.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      mesh.current.geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    }
  }, [count, density]);
  
  // 动画更新
  useFrame((state, delta) => {
    if (mesh.current) {
      // 旋转粒子系统
      mesh.current.rotation.x += delta * speed * 0.15;
      mesh.current.rotation.y += delta * speed * 0.1;
      
      // 响应鼠标移动
      const mouseX = state.mouse.x * viewport.width / 2;
      const mouseY = state.mouse.y * viewport.height / 2;
      
      mesh.current.rotation.x += (mouseY * 0.001 - mesh.current.rotation.x) * 0.05;
      mesh.current.rotation.y += (mouseX * 0.001 - mesh.current.rotation.y) * 0.05;
    }
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry />
      <pointsMaterial 
        size={size} 
        color={color} 
        sizeAttenuation 
        transparent 
        alphaMap={new THREE.TextureLoader().load('/particle.png')} 
        alphaTest={0.001}
        vertexColors={false}
      />
    </points>
  );
}

interface ParticleBackgroundProps {
  className?: string;
}

export default function ParticleBackground({ className = '' }: ParticleBackgroundProps) {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Particles count={2000} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}