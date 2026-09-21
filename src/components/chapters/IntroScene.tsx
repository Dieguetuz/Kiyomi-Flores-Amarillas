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
    const timer1 = setTimeout(() => setStage('message'), 1600);
    const timer2 = setTimeout(() => setStage('ready'), 3400);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleFlowerClick = () => {
    if (stage === 'blooming' || isBloomed) return;
    setIsBloomed(true);
    setStage('blooming');
    sounds.vibrate([30, 40, 30]);
    sounds.playBloom(0);

    setTimeout(() => {
      onComplete();
    }, 2200);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-12 text-center select-none">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <h1 className="font-serif text-3xl sm:text-4xl tracking-wide text-[#FBF5E5] drop-shadow-md">
            {salutation}
          </h1>
        </motion.div>

        <AnimatePresence>
          {(stage === 'message' || stage === 'ready' || stage === 'blooming') && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="font-serif text-lg sm:text-xl text-[#D6C4A5] leading-relaxed italic"
            >
              {subtext}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="pt-6 flex flex-col items-center justify-center min-h-[260px]">
          <AnimatePresence>
            {(stage === 'ready' || stage === 'blooming') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: stage === 'blooming' ? 1.15 : 1,
                }}
                transition={{ duration: 1, type: 'spring' }}
                className="flex flex-col items-center group cursor-pointer"
                onClick={handleFlowerClick}
              >
                {!isBloomed && (
                  <motion.div
                    className="absolute h-36 w-36 rounded-full border border-yellow-400/20 pointer-events-none"
                    animate={{
                      scale: [1, 1.25, 1],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
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
                    stemHeight={90}
                    scale={1.2}
                    showPollen={isBloomed}
                  />
                </div>

                {!isBloomed ? (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-6 font-handwriting text-xl text-yellow-300/90 tracking-wide"
                  >
                    {callToAction}
                  </motion.p>
                ) : (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 font-serif text-sm tracking-widest uppercase text-yellow-200/80"
                  >
                    Abriendo el jardín...
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