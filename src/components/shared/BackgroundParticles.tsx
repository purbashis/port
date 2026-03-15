"use client";

import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";

export default function BackgroundParticles() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }} gl={{ alpha: true }}>
                <ParticleField count={80} />
            </Canvas>
        </div>
    );
}
