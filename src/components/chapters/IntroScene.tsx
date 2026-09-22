'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowerSVG } from '@/components/ui/FlowerSVG';
import { sounds } from '@/utils/sound';
import confetti from 'canvas-confetti';

interface IntroSceneProps {
  salutation: string;
  subtext: string;
  callToAction: string;
  onComplete: () => void;
}

interface FlyingFlower {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  flowerChar: string;
}

export const IntroScene: React.FC<IntroSceneProps> = ({
  salutation,
  subtext,
  callToAction,
  onComplete,
}) => {
  const [stage, setStage] = useState<'name' | 'message' | 'ready' | 'scattering'>('name');
  const [flyingFlowers, setFlyingFlowers] = useState<FlyingFlower[]>([]);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('message'), 500);
    const timer2 = setTimeout(() => setStage('ready'), 1200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleFlowerClick = () => {
    if (stage === 'scattering') return;
    setStage('scattering');
    sounds.vibrate([30, 40, 30]);
    sounds.playBloom(0);

    // Burst of confetti
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FACC15', '#F59E0B', '#FEF08A', '#EAB308'],
      });
    } catch {}

    // Scatter multiple blooming yellow flowers across screen
    const flowersList: FlyingFlower[] = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 360,
      y: (Math.random() - 0.5) * 480 - 60,
      scale: 0.8 + Math.random() * 0.8,
      rotate: Math.random() * 360,
      flowerChar: i % 3 === 0 ? '🌻' : i % 2 === 0 ? '🌼' : '✨',
    }));
    setFlyingFlowers(flowersList);

    // Transition swiftly to Chapter 1
    setTimeout(() => {
      onComplete();
    }, 1100);
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-8 text-center select-none overflow-hidden">
      {/* Scattered Flying Flowers Animation */}
      <AnimatePresence>
        {stage === 'scattering' &&
          flyingFlowers.map((f) => (
            <motion.div
              key={`flying-${f.id}`}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.5, rotate: 0 }}
              animate={{
                x: f.x,
                y: f.y,
                opacity: [1, 1, 0],
                scale: f.scale,
                rotate: f.rotate,
              }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="pointer-events-none fixed z-50 text-3xl select-none"
              style={{ left: '50%', top: '55%' }}
            >
              {f.flowerChar}
            </motion.div>
          ))}
      </AnimatePresence>

      <div className="max-w-xs sm:max-w-sm w-full space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-3"
        >
          <h1 className="font-serif text-3xl sm:text-4xl tracking-wide text-[#FAF5E8] drop-shadow">
            {salutation}
          </h1>
        </motion.div>

        <AnimatePresence>
          {(stage === 'message' || stage === 'ready' || stage === 'scattering') && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-serif text-base sm:text-lg text-[#D6C4A5] leading-relaxed italic"
            >
              {subtext}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="pt-4 flex flex-col items-center justify-center min-h-[200px]">
          <AnimatePresence>
            {(stage === 'ready' || stage === 'scattering') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{
                  opacity: 1,
                  scale: stage === 'scattering' ? [1, 1.25, 0.9] : 1,
                }}
                transition={{ duration: 0.4, type: 'spring' }}
                className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
                onClick={handleFlowerClick}
              >
                {/* Radiant golden halo around the already blooming flower */}
                <motion.div
                  className="absolute h-36 w-36 rounded-full border border-yellow-400/30 bg-amber-400/10 pointer-events-none blur-sm"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: 'easeInOut',
                  }}
                />

                {/* Central Flower - ALREADY OPEN & BLOOMING */}
                <div className="relative">
                  <FlowerSVG
                    type="sunflower"
                    isOpen={true}
                    petalColor="#FACC15"
                    centerColor="#78350F"
                    stemHeight={80}
                    scale={1.2}
                    showPollen={true}
                  />
                </div>

                {stage !== 'scattering' ? (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="mt-4 font-handwriting text-xl text-yellow-300 tracking-wide"
                  >
                    {callToAction}
                  </motion.p>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 font-serif text-xs tracking-widest uppercase text-yellow-200/90 font-medium"
                  >
                    Esparciendo flores amarillas...
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};