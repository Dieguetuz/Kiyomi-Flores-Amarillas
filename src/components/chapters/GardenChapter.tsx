'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowerSVG } from '@/components/ui/FlowerSVG';
import { FlowerItem } from '@/types';
import { sounds } from '@/utils/sound';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GardenChapterProps {
  chapterTag: string;
  title: string;
  instruction: string;
  completedPrompt: string;
  flowers: FlowerItem[];
  onComplete: () => void;
}

export const GardenChapter: React.FC<GardenChapterProps> = ({
  chapterTag,
  title,
  instruction,
  completedPrompt,
  flowers,
  onComplete,
}) => {
  const [bloomedClusters, setBloomedClusters] = useState<string[]>([]);
  const [activeNote, setActiveNote] = useState<FlowerItem | null>(null);

  const handleFlowerTouch = (flower: FlowerItem, index: number) => {
    const isAlreadyClustered = bloomedClusters.includes(flower.id);
    if (!isAlreadyClustered) {
      const nextBloomed = [...bloomedClusters, flower.id];
      setBloomedClusters(nextBloomed);
      sounds.vibrate(25);
      sounds.playBloom(index);

      try {
        confetti({
          particleCount: 20,
          spread: 45,
          origin: { y: 0.65 },
          colors: ['#FBBF24', '#F59E0B', '#FEF08A'],
        });
      } catch {}

      if (nextBloomed.length === flowers.length) {
        sounds.playSecretFound();
        try {
          confetti({
            particleCount: 45,
            spread: 70,
            origin: { y: 0.5 },
            colors: ['#FBBF24', '#F59E0B', '#FEF08A', '#84936B'],
          });
        } catch {}
      }
    } else {
      sounds.playBloom(index);
    }
    setActiveNote(flower);
  };

  const isAllClustered = bloomedClusters.length === flowers.length;

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col justify-between px-3 sm:px-6 pt-12 pb-6 select-none">
      {/* Chapter Header */}
      <div className="mx-auto w-full max-w-md text-center space-y-1.5 pt-2">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-serif text-[11px] uppercase tracking-widest text-amber-900/60 font-semibold"
        >
          {chapterTag}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-2xl sm:text-3xl text-charcoal tracking-tight font-medium"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-handwriting text-base sm:text-lg text-amber-800/85"
        >
          {!isAllClustered
            ? `Toca cada flor para que crezca acompañada (${bloomedClusters.length}/${flowers.length})`
            : completedPrompt}
        </motion.p>
      </div>

      {/* Flower Field - 6 clusters of 3 */}
      <div className="relative mx-auto my-auto w-full max-w-sm py-2">
        <div className="grid grid-cols-3 gap-y-6 gap-x-2 sm:gap-x-4 place-items-center">
          {flowers.map((flower, idx) => {
            const isClustered = bloomedClusters.includes(flower.id);
            return (
              <motion.div
                key={flower.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.35 }}
                className="relative flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
                onClick={() => handleFlowerTouch(flower, idx)}
              >
                <div className="relative flex items-end justify-center min-h-[95px]">
                  {/* Left companion flower */}
                  <AnimatePresence>
                    {isClustered && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0, x: 0, y: 10 }}
                        animate={{ scale: 0.72, opacity: 1, x: -18, y: 2 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                        className="absolute bottom-0 z-0 origin-bottom-right rotate-[-15deg] pointer-events-none"
                      >
                        <FlowerSVG
                          type={flower.type === 'sunflower' ? 'daisy' : 'wildflower'}
                          isOpen={true}
                          petalColor="#FDE047"
                          centerColor="#B45309"
                          stemHeight={flower.stemHeight * 0.75}
                          scale={0.8}
                          rotation={-10}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Right companion flower */}
                  <AnimatePresence>
                    {isClustered && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0, x: 0, y: 10 }}
                        animate={{ scale: 0.76, opacity: 1, x: 18, y: 4 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.05 }}
                        className="absolute bottom-0 z-0 origin-bottom-left rotate-[15deg] pointer-events-none"
                      >
                        <FlowerSVG
                          type={flower.type === 'tulip' ? 'wildflower' : 'daisy'}
                          isOpen={true}
                          petalColor="#FEF08A"
                          centerColor="#78350F"
                          stemHeight={flower.stemHeight * 0.78}
                          scale={0.82}
                          rotation={10}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Main Central Flower */}
                  <div className="relative z-10">
                    <FlowerSVG
                      type={flower.type}
                      isOpen={true}
                      petalColor={flower.petalColor}
                      centerColor={flower.centerColor}
                      stemHeight={72}
                      scale={isClustered ? 1 : 0.95}
                      rotation={flower.rotation}
                      showPollen={isClustered}
                    />
                  </div>
                </div>

                <span
                  className={`mt-1 font-handwriting text-xs sm:text-sm text-center leading-tight transition-colors ${
                    isClustered ? 'text-amber-950 font-medium' : 'text-amber-800/60'
                  }`}
                >
                  {isClustered ? `💛 ${flower.shortLabel}` : flower.shortLabel}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Note modal */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-dark/45 px-4 backdrop-blur-[2px]"
            onClick={() => setActiveNote(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 10, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 340 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xs sm:max-w-sm rounded-2xl bg-[#FCF8EE] p-6 shadow-2xl border border-[#E9DFC8] text-center"
              style={{
                boxShadow: '0 16px 40px -10px rgba(78, 54, 25, 0.22), 0 0 0 1px rgba(217, 195, 155, 0.5)',
              }}
            >
              <button
                onClick={() => setActiveNote(null)}
                aria-label="Cerrar nota"
                className="absolute top-3.5 right-3.5 rounded-full p-1.5 text-amber-900/50 hover:bg-amber-100 hover:text-amber-900"
              >
                <X size={18} />
              </button>

              <div className="mb-2 flex justify-center text-amber-500">
                <Sparkles size={20} />
              </div>

              <span className="font-serif text-[11px] uppercase tracking-wider text-amber-800/60 font-semibold">
                Flor #{activeNote.number}
              </span>

              <p className="mt-2.5 font-handwriting text-2xl sm:text-3xl leading-snug text-[#2C2317] font-normal">
                {activeNote.note}
              </p>

              <button
                onClick={() => setActiveNote(null)}
                className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-amber-100/90 px-4 py-2 font-serif text-xs font-medium text-amber-900 transition-colors hover:bg-amber-200 active:scale-95"
              >
                Guardar en el jardín 💛
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button to proceed to Minecraft Chapter */}
      <div className="mx-auto w-full max-w-sm flex justify-center min-h-[52px] items-center">
        <AnimatePresence>
          {isAllClustered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              onClick={() => {
                sounds.vibrate(20);
                sounds.playBloom(2);
                onComplete();
              }}
              className="group flex items-center gap-2.5 rounded-full bg-amber-800 px-6 py-3 font-serif text-sm font-medium text-amber-50 shadow-md transition-all hover:bg-amber-900 active:scale-95"
            >
              <span>El siguiente mundo</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1 text-amber-300"
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};