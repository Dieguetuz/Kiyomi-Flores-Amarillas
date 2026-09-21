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
  stemHeight = 120,
  scale = 1,
  rotation = 0,
  className = '',
  onClick,
  showPollen = false,
}) => {
  const renderFlowerHead = () => {
    if (!isOpen) {
      return (
        <motion.g
          animate={{
            scale: [0.96, 1.04, 0.96],
            rotate: [0, 1.5, -1.5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.2,
            ease: 'easeInOut',
          }}
        >
          <circle cx="0" cy="0" r="28" fill="#FDE047" fillOpacity="0.3" filter="blur(6px)" />
          
          <path
            d="M -14 16 C -18 8, -14 -4, -6 -18 C -2 -4, 2 -4, 6 -18 C 14 -4, 18 8, 14 16 Z"
            fill="#5C6D44"
          />
          <path
            d="M -8 4 C -10 -8, -4 -22, 0 -26 C 4 -22, 10 -8, 8 4 Z"
            fill={petalColor}
          />
          <path
            d="M -4 6 C -6 -4, -1 -18, 0 -22 C 1 -18, 6 -4, 4 6 Z"
            fill="#FEF08A"
          />
          <path
            d="M -10 14 C -12 6, -10 -2, -4 -10 C -2 0, 0 6, -2 14 Z"
            fill="#6B7A52"
          />
          <path
            d="M 10 14 C 12 6, 10 -2, 4 -10 C 2 0, 0 6, 2 14 Z"
            fill="#4D5939"
          />
        </motion.g>
      );
    }

    switch (type) {
      case 'daisy':
        return (
          <motion.g
            initial={{ scale: 0.2, rotate: -25, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14 }}
          >
            <circle cx="0" cy="0" r="46" fill="#FEF08A" fillOpacity="0.45" filter="blur(10px)" />

            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 360) / 16;
              return (
                <motion.g
                  key={`petal-${i}`}
                  transform={`rotate(${angle})`}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.02, duration: 0.35, ease: 'easeOut' }}
                >
                  <path
                    d="M -4 -8 C -6 -24, -3 -38, 0 -42 C 3 -38, 6 -24, 4 -8 Z"
                    fill={i % 2 === 0 ? petalColor : '#FDE047'}
                    stroke="#D97706"
                    strokeWidth="0.5"
                    strokeOpacity="0.4"
                  />
                  <line
                    x1="0"
                    y1="-10"
                    x2="0"
                    y2="-34"
                    stroke="#FEF9C3"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                </motion.g>
              );
            })}

            <circle cx="0" cy="0" r="14" fill={centerColor} />
            <circle cx="0" cy="0" r="12" fill="#B45309" />
            <circle cx="-3" cy="-3" r="8" fill="#D97706" />
            <circle cx="-4" cy="-4" r="3" fill="#FDE047" fillOpacity="0.7" />
          </motion.g>
        );

      case 'tulip':
        return (
          <motion.g
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <circle cx="0" cy="-6" r="38" fill="#FDE047" fillOpacity="0.4" filter="blur(8px)" />
            <path
              d="M -24 0 C -28 -20, -18 -40, -12 -46 C -2 -34, 4 -20, 6 0 Z"
              fill="#F59E0B"
            />
            <path
              d="M 24 0 C 28 -20, 18 -40, 12 -46 C 2 -34, -4 -20, -6 0 Z"
              fill="#F59E0B"
            />
            <path
              d="M -18 2 C -22 -18, -14 -42, 0 -48 C 14 -42, 22 -18, 18 2 C 12 12, -12 12, -18 2 Z"
              fill={petalColor}
            />
            <path
              d="M -20 4 C -22 -12, -12 -32, -4 -38 C 0 -18, -2 4, -10 10 Z"
              fill="#FEF08A"
              fillOpacity="0.85"
            />
            <path
              d="M 20 4 C 22 -12, 12 -32, 4 -38 C 0 -18, 2 4, 10 10 Z"
              fill="#FDE047"
            />
            <ellipse cx="0" cy="6" rx="8" ry="4" fill="#6B7A52" />
          </motion.g>
        );

      case 'wildflower':
        return (
          <motion.g
            initial={{ scale: 0.2, rotate: -40, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14 }}
          >
            <circle cx="0" cy="0" r="40" fill="#FACC15" fillOpacity="0.4" filter="blur(8px)" />
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 360) / 8;
              return (
                <g key={`wild-${i}`} transform={`rotate(${angle})`}>
                  <path
                    d="M 0 0 C -12 -12, -14 -28, 0 -38 C 14 -28, 12 -12, 0 0 Z"
                    fill={petalColor}
                    stroke="#CA8A04"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M 0 -4 C -6 -14, -6 -24, 0 -30 C 6 -24, 6 -14, 0 -4 Z"
                    fill="#FEF9C3"
                    fillOpacity="0.6"
                  />
                </g>
              );
            })}
            <circle cx="0" cy="0" r="10" fill={centerColor} />
            <circle cx="0" cy="0" r="6" fill="#F59E0B" />
          </motion.g>
        );

      case 'sunflower':
      default:
        return (
          <motion.g
            initial={{ scale: 0.2, rotate: -30, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14 }}
          >
            <circle cx="0" cy="0" r="54" fill="#FACC15" fillOpacity="0.38" filter="blur(12px)" />

            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i * 360) / 20;
              return (
                <motion.g
                  key={`outer-${i}`}
                  transform={`rotate(${angle})`}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.015, duration: 0.3 }}
                >
                  <path
                    d="M -5 -10 C -8 -26, -5 -46, 0 -50 C 5 -46, 8 -26, 5 -10 Z"
                    fill="#F59E0B"
                    stroke="#D97706"
                    strokeWidth="0.5"
                    strokeOpacity="0.5"
                  />
                </motion.g>
              );
            })}

            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i * 360) / 20 + 9;
              return (
                <motion.g
                  key={`inner-${i}`}
                  transform={`rotate(${angle})`}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.1 + i * 0.015, duration: 0.3 }}
                >
                  <path
                    d="M -4 -8 C -7 -22, -4 -42, 0 -45 C 4 -42, 7 -22, 4 -8 Z"
                    fill={i % 2 === 0 ? petalColor : '#FDE047'}
                    stroke="#B45309"
                    strokeWidth="0.4"
                    strokeOpacity="0.4"
                  />
                  <line
                    x1="0"
                    y1="-8"
                    x2="0"
                    y2="-38"
                    stroke="#FEF9C3"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    strokeOpacity="0.8"
                  />
                </motion.g>
              );
            })}

            <circle cx="0" cy="0" r="18" fill="#2E1C0C" />
            <circle cx="0" cy="0" r="16" fill={centerColor} />

            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 360) / 12;
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * 10;
              const y = Math.sin(rad) * 10;
              return <circle key={`seed-${i}`} cx={x} cy={y} r="1.4" fill="#D97706" />;
            })}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 360) / 8 + 22.5;
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * 5.5;
              const y = Math.sin(rad) * 5.5;
              return <circle key={`inner-seed-${i}`} cx={x} cy={y} r="1.2" fill="#F59E0B" />;
            })}

            <ellipse cx="-4" cy="-5" rx="6" ry="3" fill="#FEF08A" fillOpacity="0.35" />
          </motion.g>
        );
    }
  };

  const stemCurveX = rotation * 2;

  return (
    <div
      onClick={onClick}
      className={`relative inline-block cursor-pointer select-none ${className}`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
      }}
    >
      <svg
        width="130"
        height={stemHeight + 90}
        viewBox={`-65 -65 130 ${stemHeight + 90}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={`stem-grad-${type}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5C6D44" />
            <stop offset="60%" stopColor="#6B7A52" />
            <stop offset="100%" stopColor="#4D5939" />
          </linearGradient>
          <linearGradient id={`leaf-grad-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84936B" />
            <stop offset="100%" stopColor="#55643E" />
          </linearGradient>
        </defs>

        <path
          d={`M 0 10 Q ${stemCurveX} ${stemHeight * 0.5}, 0 ${stemHeight + 10}`}
          fill="none"
          stroke={`url(#stem-grad-${type})`}
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        <motion.path
          d={`M -2 ${stemHeight * 0.45} C -22 ${stemHeight * 0.35}, -32 ${stemHeight * 0.45}, -28 ${stemHeight * 0.55} C -16 ${stemHeight * 0.58}, -4 ${stemHeight * 0.52}, -2 ${stemHeight * 0.45}`}
          fill={`url(#leaf-grad-${type})`}
          stroke="#4D5939"
          strokeWidth="0.5"
          animate={{
            rotate: [0, -3, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: `-2px ${stemHeight * 0.45}px` }}
        />

        <motion.path
          d={`M 2 ${stemHeight * 0.65} C 20 ${stemHeight * 0.55}, 30 ${stemHeight * 0.62}, 26 ${stemHeight * 0.72} C 16 ${stemHeight * 0.75}, 4 ${stemHeight * 0.7}, 2 ${stemHeight * 0.65}`}
          fill={`url(#leaf-grad-${type})`}
          stroke="#4D5939"
          strokeWidth="0.5"
          animate={{
            rotate: [0, 3, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4.8,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          style={{ transformOrigin: `2px ${stemHeight * 0.65}px` }}
        />

        <g transform="translate(0, 0)">{renderFlowerHead()}</g>

        {showPollen && isOpen && (
          <g>
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.circle
                key={`pollen-${i}`}
                cx={((i % 3) - 1) * 22}
                cy={-20 - i * 8}
                r="1.5"
                fill="#FEF08A"
                initial={{ opacity: 0, y: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.9, 0],
                  y: [-5, -25 - i * 6],
                  scale: [0.5, 1.2, 0.4],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.4 + i * 0.4,
                  delay: i * 0.3,
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