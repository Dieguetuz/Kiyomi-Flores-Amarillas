'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FlowerType } from '@/types';

interface FlowerSVGProps {
  type?: FlowerType;
  isOpen: boolean;
  petalColor?: string;
  centerColor?: string;
  stemHeight?: number;
  scale?: number;
  rotation?: number;
  className?: string;
  onClick?: () => void;
  showPollen?: boolean;
}

export const FlowerSVG: React.FC<FlowerSVGProps> = ({
  type = 'sunflower',
  isOpen,
  petalColor = '#FBBF24',
  centerColor = '#78350F',
  stemHeight = 110,
  scale = 1,
  rotation = 0,
  className = '',
  onClick,
  showPollen = false,
}) => {
  const renderFlowerHead = () => {
    if (!isOpen) {
      // Lush closed botanical bud
      return (
        <g>
          {/* Subtle golden aura */}
          <circle cx="0" cy="-6" r="26" fill="#FDE047" fillOpacity="0.35" filter="blur(6px)" />
          
          {/* Receptacle green base firmly hugging stem */}
          <path
            d="M -12 12 C -15 4, -10 -8, -4 -16 C -2 -4, 2 -4, 4 -16 C 10 -8, 15 4, 12 12 Z"
            fill="#4D5939"
          />
          {/* Golden petal tips peeking from bud */}
          <path
            d="M -7 4 C -9 -10, -4 -24, 0 -28 C 4 -24, 9 -10, 7 4 Z"
            fill={petalColor}
          />
          <path
            d="M -3 6 C -5 -6, -1 -20, 0 -24 C 1 -20, 5 -6, 3 6 Z"
            fill="#FEF08A"
          />
          {/* Outer green protective sepals */}
          <path
            d="M -10 10 C -12 2, -9 -6, -4 -14 C -2 -2, 0 4, -2 12 Z"
            fill="#6B7A52"
          />
          <path
            d="M 10 10 C 12 2, 9 -6, 4 -14 C 2 -2, 0 4, 2 12 Z"
            fill="#55643E"
          />
          <ellipse cx="0" cy="12" rx="7" ry="3.5" fill="#3D472B" />
        </g>
      );
    }

    // Fully Bloomed botanical illustrations
    switch (type) {
      case 'daisy':
        return (
          <motion.g
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 18 }}
          >
            <circle cx="0" cy="0" r="46" fill="#FEF08A" fillOpacity="0.45" filter="blur(8px)" />

            {/* Daisy Petals (18 fanned petals using pure SVG rotation) */}
            {Array.from({ length: 18 }).map((_, i) => {
              const angle = (i * 360) / 18;
              return (
                <g key={`daisy-petal-${i}`} transform={`rotate(${angle})`}>
                  <path
                    d="M -4 -6 C -6 -22, -3 -38, 0 -43 C 3 -38, 6 -22, 4 -6 Z"
                    fill={i % 2 === 0 ? petalColor : '#FDE047'}
                    stroke="#D97706"
                    strokeWidth="0.5"
                    strokeOpacity="0.5"
                  />
                  <line
                    x1="0"
                    y1="-8"
                    x2="0"
                    y2="-35"
                    stroke="#FEF9C3"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeOpacity="0.85"
                  />
                </g>
              );
            })}

            {/* Daisy Center */}
            <circle cx="0" cy="0" r="14" fill="#5C2607" />
            <circle cx="0" cy="0" r="12" fill={centerColor} />
            <circle cx="-3" cy="-3" r="7" fill="#D97706" />
            <circle cx="-3" cy="-3" r="3" fill="#FDE047" fillOpacity="0.8" />
          </motion.g>
        );

      case 'tulip':
        return (
          <motion.g
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 18 }}
          >
            <circle cx="0" cy="-6" r="38" fill="#FDE047" fillOpacity="0.4" filter="blur(8px)" />
            {/* Back outer petals */}
            <path
              d="M -24 0 C -28 -20, -18 -42, -12 -46 C -2 -34, 4 -20, 6 0 Z"
              fill="#F59E0B"
            />
            <path
              d="M 24 0 C 28 -20, 18 -42, 12 -46 C 2 -34, -4 -20, -6 0 Z"
              fill="#F59E0B"
            />
            {/* Center petals */}
            <path
              d="M -18 2 C -22 -18, -14 -44, 0 -49 C 14 -44, 22 -18, 18 2 C 12 12, -12 12, -18 2 Z"
              fill={petalColor}
            />
            {/* Front left & right cups */}
            <path
              d="M -20 4 C -22 -12, -12 -34, -4 -39 C 0 -18, -2 4, -10 10 Z"
              fill="#FEF08A"
              fillOpacity="0.9"
            />
            <path
              d="M 20 4 C 22 -12, 12 -34, 4 -39 C 0 -18, 2 4, 10 10 Z"
              fill="#FDE047"
            />
            {/* Base receptacle */}
            <ellipse cx="0" cy="6" rx="8" ry="4" fill="#55643E" />
          </motion.g>
        );

      case 'wildflower':
        return (
          <motion.g
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 18 }}
          >
            <circle cx="0" cy="0" r="42" fill="#FACC15" fillOpacity="0.4" filter="blur(8px)" />
            {Array.from({ length: 10 }).map((_, i) => {
              const angle = (i * 360) / 10;
              return (
                <g key={`wild-${i}`} transform={`rotate(${angle})`}>
                  <path
                    d="M 0 0 C -11 -10, -13 -26, 0 -35 C 13 -26, 11 -10, 0 0 Z"
                    fill={petalColor}
                    stroke="#CA8A04"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M 0 -4 C -5 -12, -5 -22, 0 -28 C 5 -22, 5 -12, 0 -4 Z"
                    fill="#FEF9C3"
                    fillOpacity="0.75"
                  />
                </g>
              );
            })}
            <circle cx="0" cy="0" r="11" fill={centerColor} />
            <circle cx="0" cy="0" r="7" fill="#F59E0B" />
            <circle cx="-2" cy="-2" r="2.5" fill="#FEF08A" />
          </motion.g>
        );

      case 'sunflower':
      default:
        return (
          <motion.g
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 18 }}
          >
            {/* Golden radiance aura */}
            <circle cx="0" cy="0" r="54" fill="#FACC15" fillOpacity="0.4" filter="blur(10px)" />

            {/* Outer Petals: 22 dense golden petals */}
            {Array.from({ length: 22 }).map((_, i) => {
              const angle = (i * 360) / 22;
              return (
                <g key={`sun-outer-${i}`} transform={`rotate(${angle})`}>
                  <path
                    d="M -5 -8 C -8 -24, -5 -44, 0 -49 C 5 -44, 8 -24, 5 -8 Z"
                    fill="#F59E0B"
                    stroke="#D97706"
                    strokeWidth="0.5"
                    strokeOpacity="0.6"
                  />
                </g>
              );
            })}

            {/* Inner Petals: 22 bright yellow petals offset by 8.18 deg for complete fullness */}
            {Array.from({ length: 22 }).map((_, i) => {
              const angle = (i * 360) / 22 + 8.18;
              return (
                <g key={`sun-inner-${i}`} transform={`rotate(${angle})`}>
                  <path
                    d="M -4 -7 C -7 -20, -4 -39, 0 -43 C 4 -39, 7 -20, 4 -7 Z"
                    fill={i % 2 === 0 ? petalColor : '#FDE047'}
                    stroke="#B45309"
                    strokeWidth="0.4"
                    strokeOpacity="0.5"
                  />
                  <line
                    x1="0"
                    y1="-8"
                    x2="0"
                    y2="-34"
                    stroke="#FEF9C3"
                    strokeWidth="0.85"
                    strokeLinecap="round"
                    strokeOpacity="0.8"
                  />
                </g>
              );
            })}

            {/* Rich Seed Disc Core */}
            <circle cx="0" cy="0" r="18" fill="#291607" />
            <circle cx="0" cy="0" r="16" fill={centerColor} />

            {/* Concentric spiral florets */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 360) / 12;
              const rad = (angle * Math.PI) / 180;
              return <circle key={`seed-out-${i}`} cx={Math.cos(rad) * 10.5} cy={Math.sin(rad) * 10.5} r="1.5" fill="#D97706" />;
            })}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 360) / 8 + 22.5;
              const rad = (angle * Math.PI) / 180;
              return <circle key={`seed-in-${i}`} cx={Math.cos(rad) * 5.5} cy={Math.sin(rad) * 5.5} r="1.3" fill="#F59E0B" />;
            })}
            <circle cx="-3" cy="-4" r="2.5" fill="#FEF08A" fillOpacity="0.5" />
          </motion.g>
        );
    }
  };

  const stemCurveX = rotation * 1.5;

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center cursor-pointer select-none ${className}`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
      }}
    >
      <svg
        width="120"
        height={stemHeight + 80}
        viewBox={`-60 -55 120 ${stemHeight + 80}`}
        className="overflow-visible drop-shadow-sm"
      >
        <defs>
          <linearGradient id="stem-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#55643E" />
            <stop offset="50%" stopColor="#6B7A52" />
            <stop offset="100%" stopColor="#4A5635" />
          </linearGradient>
          <linearGradient id="leaf-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84936B" />
            <stop offset="100%" stopColor="#55643E" />
          </linearGradient>
        </defs>

        {/* Stem connected seamlessly to head at (0, 8) */}
        <path
          d={`M 0 6 Q ${stemCurveX} ${stemHeight * 0.5}, 0 ${stemHeight + 5}`}
          fill="none"
          stroke="url(#stem-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Left Leaf firmly connected to stem */}
        <path
          d={`M 0 ${stemHeight * 0.42} C -16 ${stemHeight * 0.34}, -26 ${stemHeight * 0.42}, -22 ${stemHeight * 0.52} C -14 ${stemHeight * 0.54}, -4 ${stemHeight * 0.48}, 0 ${stemHeight * 0.42}`}
          fill="url(#leaf-gradient)"
          stroke="#455034"
          strokeWidth="0.5"
        />

        {/* Right Leaf firmly connected to stem */}
        <path
          d={`M 0 ${stemHeight * 0.62} C 16 ${stemHeight * 0.54}, 26 ${stemHeight * 0.6}, 22 ${stemHeight * 0.7} C 14 ${stemHeight * 0.72}, 4 ${stemHeight * 0.67}, 0 ${stemHeight * 0.62}`}
          fill="url(#leaf-gradient)"
          stroke="#455034"
          strokeWidth="0.5"
        />

        {/* Flower Head */}
        <g transform="translate(0, 0)">{renderFlowerHead()}</g>

        {/* Floating golden pollen */}
        {showPollen && isOpen && (
          <g>
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.circle
                key={`pollen-${i}`}
                cx={((i % 3) - 1) * 18}
                cy={-18 - i * 6}
                r="1.4"
                fill="#FEF08A"
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.9, 0],
                  y: [-4, -22 - i * 4],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8 + i * 0.3,
                  delay: i * 0.2,
                  ease: 'easeOut',
                }}
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};