"use client";

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

export function ParticleField({ count = 100 }: { count?: number }) {
    const points = useRef<THREE.Points>(null);

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 30; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // z
        }
        return positions;
    }, [count]);

    const particlesVelocity = useMemo(() => {
        const velocities = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            velocities[i * 3] = (Math.random() - 0.5) * 0.005; // vx
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005; // vy
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005; // vz
        }
        return velocities;
    }, [count]);

    useFrame((state) => {
        if (!points.current || !points.current.geometry || !points.current.geometry.attributes.position) return;

        const positions = points.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            positions[i * 3] += particlesVelocity[i * 3];
            positions[i * 3 + 1] += particlesVelocity[i * 3 + 1];
            positions[i * 3 + 2] += particlesVelocity[i * 3 + 2];

            // Constrain
            if (Math.abs(positions[i * 3]) > 15) particlesVelocity[i * 3] *= -1;
            if (Math.abs(positions[i * 3 + 1]) > 15) particlesVelocity[i * 3 + 1] *= -1;
            if (Math.abs(positions[i * 3 + 2]) > 10) particlesVelocity[i * 3 + 2] *= -1;
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
                size={0.12}
                color="#00f0ff" // Neon Cyan
                transparent
                opacity={0.7}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
