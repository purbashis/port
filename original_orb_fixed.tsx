"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { ParticleField } from '../shared/ParticleField';

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;

  void main() {
    vNormal = normal;
    vPosition = position;
    vec3 pos = position;
    pos += normal * sin(uTime * 2.0 + position.y * 3.0) * 0.02;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  uniform float uTime;
  uniform vec3 uColor;

  void main() {
    float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    vec3 color = mix(uColor * 0.3, uColor, fresnel);
    float pulse = sin(uTime * 1.5) * 0.5 + 0.5;
    gl_FragColor = vec4(color + pulse * 0.2, 0.85);
  }
`;

function OrbScene() {
    const orbRef = useRef<THREE.Mesh>(null);
    const ring1Ref = useRef<THREE.Mesh>(null);
    const ring2Ref = useRef<THREE.Mesh>(null);
    const ring3Ref = useRef<THREE.Mesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#f0c060") }
    }), []);

    useFrame((state) => {
        const elapsed = state.clock.elapsedTime;

        if (orbRef.current) {
            orbRef.current.rotation.y = elapsed * 0.2;
            uniforms.uTime.value = elapsed;
        }

        if (ring1Ref.current) {
            ring1Ref.current.rotation.x = elapsed * 0.5;
            ring1Ref.current.rotation.y = elapsed * 0.3;
        }

        if (ring2Ref.current) {
            ring2Ref.current.rotation.x = -elapsed * 0.4;
            ring2Ref.current.rotation.z = elapsed * 0.2;
        }

        if (ring3Ref.current) {
            ring3Ref.current.rotation.y = elapsed * 0.6;
            ring3Ref.current.rotation.z = -elapsed * 0.3;
        }

        if (lightRef.current) {
            // Light flicker
            lightRef.current.intensity = 1.0 + Math.sin(elapsed * 4) * 0.4 + Math.sin(elapsed * 10) * 0.1;
        }

        // Camera subtle panning
        state.camera.position.x = Math.sin(elapsed * 0.5) * 0.5;
        state.camera.position.y = Math.cos(elapsed * 0.3) * 0.5;
        state.camera.lookAt(0, 0, 0);
    });

    return (
        <group>
            {/* Central Glowing Orb */}
            <mesh ref={orbRef}>
                <sphereGeometry args={[1.5, 64, 64]} />
                <shaderMaterial
                    uniforms={uniforms}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    transparent
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* Rune Rings */}
            <mesh ref={ring1Ref}>
                <torusGeometry args={[1.8, 0.02, 16, 100]} />
                <meshBasicMaterial color="#c8963e" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>

            <mesh ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[2.2, 0.015, 16, 100]} />
                <meshBasicMaterial color="#f0c060" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>

            <mesh ref={ring3Ref} rotation={[0, Math.PI / 3, 0]}>
                <torusGeometry args={[2.7, 0.01, 16, 100]} />
                <meshBasicMaterial color="#e8a020" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>

            <pointLight ref={lightRef} color="#f0c060" distance={20} intensity={1.5} />
            <ambientLight intensity={0.2} color="#c8963e" />

            {/* Particle System internal to the hero */}
            <ParticleField count={150} />
        </group>
    );
}

export default function HeroOrb() {
    return (
        <div className="w-full h-[60vh] md:h-full relative cursor-grab active:cursor-grabbing">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
                onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
            >
                <OrbScene />
            </Canvas>
        </div>
    );
}
