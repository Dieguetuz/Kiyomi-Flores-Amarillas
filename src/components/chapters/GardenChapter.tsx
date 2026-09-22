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
  const [openedFlowers, setOpenedFlowers] = useState<string[]>([]);
  const [activeNote, setActiveNote] = useState<FlowerItem | null>(null);

  const handleFlowerTouch = (flower: FlowerItem, index: number) => {
    const isAlreadyOpen = openedFlowers.includes(flower.id);
    if (!isAlreadyOpen) {
      const nextOpened = [...openedFlowers, flower.id];
      setOpenedFlowers(nextOpened);
      sounds.vibrate(25);
      sounds.playBloom(index);

      if (nextOpened.length === flowers.length) {
        sounds.playSecretFound();
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.65 },
            colors: ['#FBBF24', '#F59E0B', '#FEF08A', '#84936B'],
          });
        } catch {}
      }
    } else {
      sounds.playBloom(index);
    }
    setActiveNote(flower);
  };

  const isAllOpened = openedFlowers.length === flowers.length;

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
          {!isAllOpened
            ? `${instruction} (${openedFlowers.length}/${flowers.length})`
            : completedPrompt}
        </motion.p>
      </div>

      {/* Flower Field - Perfectly tuned for mobile touch ergonomics */}
      <div className="relative mx-auto my-auto w-full max-w-sm py-3">
        <div className="grid grid-cols-3 gap-y-5 gap-x-1 sm:gap-x-3 place-items-center">
          {flowers.map((flower, idx) => {
            const isOpened = openedFlowers.includes(flower.id);
            return (
              <motion.div
                key={flower.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
                className="relative flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
                onClick={() => handleFlowerTouch(flower, idx)}
              >
                {/* Number Badge when closed */}
                {!isOpened && (
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: idx * 0.2 }}
                    className="absolute -top-2 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-900 text-[11px] font-handwriting shadow-sm border border-amber-300"
                  >
                    {idx + 1}
                  </motion.div>
                )}

                <div
                  className={`transition-all duration-200 ${
                    isOpened ? 'scale-100' : 'scale-90 hover:scale-95'
                  }`}
                >
                  <FlowerSVG
                    type={flower.type}
                    isOpen={isOpened}
                    petalColor={flower.petalColor}
                    centerColor={flower.centerColor}
                    stemHeight={78}
                    scale={0.96}
                    rotation={flower.rotation}
                    showPollen={isOpened}
                  />
                </div>

                <span
                  className={`mt-0.5 font-handwriting text-xs sm:text-sm text-center leading-tight transition-colors ${
                    isOpened ? 'text-amber-950 font-medium' : 'text-amber-800/50'
                  }`}
                >
                  {isOpened ? flower.shortLabel : 'tocar'}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Note modal when a flower is touched */}
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

      {/* Button to proceed to Chapter 2 */}
      <div className="mx-auto w-full max-w-sm flex justify-center min-h-[52px] items-center">
        <AnimatePresence>
          {isAllOpened && (
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
              <span>Explorar los secretos</span>
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