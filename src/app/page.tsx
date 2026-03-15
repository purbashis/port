"use client";

import React, { useState } from 'react';
import BootScreen from '@/components/OS/BootScreen';
import Desktop from '@/components/OS/Desktop';
import BackgroundParticles from '@/components/shared/BackgroundParticles';

export default function PortfolioOS() {
  const [booted, setBooted] = useState(false);

  return (
    <main className="relative w-screen h-screen bg-[#050508] overflow-hidden text-gray-100">
      {/* Persistent particle background */}
      <div className="absolute inset-0 z-0">
        <BackgroundParticles />
      </div>

      {/* OS Boot → Desktop transition */}
      <div className="relative z-10 w-full h-full">
        {!booted ? (
          <BootScreen onComplete={() => setBooted(true)} />
        ) : (
          <Desktop />
        )}
      </div>
    </main>
  );
}
