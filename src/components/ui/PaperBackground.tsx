'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface PaperBackgroundProps {
  theme?: 'dark' | 'light' | 'mikey' | 'minecraft' | 'bouquet';
  children: React.ReactNode;
}

export const PaperBackground: React.FC<PaperBackgroundProps> = ({
  theme = 'light',
  children,
}) => {
  const motes = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: (i * 17) % 100,
      y: (i * 23) % 100,
      size: 2 + (i % 3) * 1.5,
      duration: 8 + (i % 5) * 3,
      delay: (i * 0.7) % 4,
    }));
  }, []);

  const getBackgroundStyles = () => {
    switch (theme) {
      case 'dark':
        return 'bg-[#14110C] text-[#F3ECE0]';
      case 'mikey':
        return 'bg-[#0E0D0B] text-[#FDE047]';
      case 'minecraft':
        return 'bg-[#1B2412] text-[#FEF9C3]';
      case 'bouquet':
        return 'bg-[#F7EFE1] text-[#2C241B]';
      case 'light':
      default:
        return 'bg-[#FAF5EB] text-[#2D261E]';
    }
  };

  return (
    <div
      className={`relative min-h-screen w-full overflow-x-hidden transition-colors duration-1000 ease-in-out ${getBackgroundStyles()}`}
      style={{
        touchAction: 'manipulation',
      }}
    >
      <svg className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.035] mix-blend-multiply">
        <filter id="paper-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-noise)" />
      </svg>

      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle at 50% 45%, rgba(245, 158, 11, 0.08) 0%, rgba(20, 17, 12, 0.95) 75%)'
              : theme === 'mikey'
              ? 'radial-gradient(circle at 50% 30%, rgba(234, 179, 8, 0.15) 0%, rgba(14, 13, 11, 0.98) 70%)'
              : theme === 'minecraft'
              ? 'radial-gradient(circle at 50% 40%, rgba(132, 147, 107, 0.2) 0%, rgba(27, 36, 18, 0.95) 75%)'
              : theme === 'bouquet'
              ? 'radial-gradient(circle at 50% 35%, rgba(254, 240, 138, 0.5) 0%, rgba(247, 239, 225, 0.7) 60%, rgba(235, 221, 195, 0.95) 100%)'
              : 'radial-gradient(circle at 50% 30%, rgba(254, 249, 195, 0.5) 0%, rgba(250, 245, 235, 0.8) 50%, rgba(235, 221, 195, 0.9) 100%)',
        }}
      />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {motes.map((mote) => (
          <motion.div
            key={`mote-${mote.id}`}
            className="absolute rounded-full"
            style={{
              left: `${mote.x}%`,
              top: `${mote.y}%`,
              width: mote.size,
              height: mote.size,
              backgroundColor: theme === 'dark' || theme === 'mikey' ? '#FDE047' : '#F59E0B',
              boxShadow: `0 0 ${mote.size * 3}px ${theme === 'dark' || theme === 'mikey' ? '#FACC15' : '#FBBF24'}`,
            }}
            animate={{
              y: [0, -35, 0],
              x: [0, mote.id % 2 === 0 ? 15 : -15, 0],
              opacity: [0.2, 0.85, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: mote.duration,
              repeat: Infinity,
              delay: mote.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
    </div>
  );
};