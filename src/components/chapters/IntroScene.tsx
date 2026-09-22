'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowerSVG } from '@/components/ui/FlowerSVG';
import { sounds } from '@/utils/sound';

interface IntroSceneProps {
  salutation: string;
  subtext: string;
  callToAction: string;
  onComplete: () => void;
}

export const IntroScene: React.FC<IntroSceneProps> = ({
  salutation,
  subtext,
  callToAction,
  onComplete,
}) => {
  const [stage, setStage] = useState<'name' | 'message' | 'ready' | 'blooming'>('name');
  const [isBloomed, setIsBloomed] = useState(false);

  useEffect(() => {
    // Snappy, engaging pacing
    const timer1 = setTimeout(() => setStage('message'), 600);
    const timer2 = setTimeout(() => setStage('ready'), 1400);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleFlowerClick = () => {
    if (stage === 'blooming' || isBloomed) return;
    setIsBloomed(true);
    setStage('blooming');
    sounds.vibrate([30, 30]);
    sounds.playBloom(0);

    setTimeout(() => {
      onComplete();
    }, 1100);
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-8 text-center select-none">
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
          {(stage === 'message' || stage === 'ready' || stage === 'blooming') && (
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
            {(stage === 'ready' || stage === 'blooming') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{
                  opacity: 1,
                  scale: stage === 'blooming' ? 1.15 : 1,
                }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
                onClick={handleFlowerClick}
              >
                {!isBloomed && (
                  <motion.div
                    className="absolute h-32 w-32 rounded-full border border-yellow-400/25 pointer-events-none"
                    animate={{
                      scale: [1, 1.25, 1],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.2,
                      ease: 'easeInOut',
                    }}
                  />
                )}

                <div className="relative">
                  <FlowerSVG
                    type="sunflower"
                    isOpen={isBloomed}
                    petalColor="#FACC15"
                    centerColor="#78350F"
                    stemHeight={80}
                    scale={1.15}
                    showPollen={isBloomed}
                  />
                </div>

                {!isBloomed ? (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
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
                    El jardín está despertando...
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