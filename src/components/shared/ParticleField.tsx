"use client";

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

export function ParticleField({ count = 50 }: { count?: number }) {
    const points = useRef<THREE.Points>(null);

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // z
        }
        return positions;
    }, [count]);

    const particlesVelocity = useMemo(() => {
        const velocities = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            velocities[i * 3] = (Math.random() - 0.5) * 0.01; // vx
            velocities[i * 3 + 1] = Math.random() * 0.02 + 0.01; // vy (moving up)
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01; // vz
        }
        return velocities;
    }, [count]);

    useFrame((state) => {
        if (!points.current || !points.current.geometry || !points.current.geometry.attributes.position) return;

        const positions = points.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            positions[i * 3] += particlesVelocity[i * 3] + Math.sin(state.clock.elapsedTime + i) * 0.005; // sway x
            positions[i * 3 + 1] += particlesVelocity[i * 3 + 1]; // move up

            // Reset if too high
            if (positions[i * 3 + 1] > 10) {
                positions[i * 3 + 1] = -10;
                positions[i * 3] = (Math.random() - 0.5) * 20;
            }
        }

        points.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particlesPosition, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                color="#c8963e"
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
