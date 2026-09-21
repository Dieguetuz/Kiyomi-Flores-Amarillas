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
            particleCount: 35,
            spread: 60,
            origin: { y: 0.7 },
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
    <div className="relative flex min-h-screen w-full flex-col justify-between px-4 sm:px-6 pt-16 pb-8 select-none">
      <div className="mx-auto w-full max-w-lg text-center space-y-2">
        <motion.span
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-xs uppercase tracking-widest text-amber-900/60"
        >
          {chapterTag}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-2xl sm:text-3xl text-charcoal tracking-tight font-medium"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-handwriting text-lg text-amber-800/80"
        >
          {!isAllOpened
            ? `${instruction} (${openedFlowers.length}/${flowers.length})`
            : completedPrompt}
        </motion.p>
      </div>

      <div className="relative mx-auto my-auto w-full max-w-md py-6">
        <div className="grid grid-cols-3 gap-y-6 gap-x-2 sm:gap-x-4 place-items-center">
          {flowers.map((flower, idx) => {
            const isOpened = openedFlowers.includes(flower.id);
            return (
              <motion.div
                key={flower.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="relative flex flex-col items-center group cursor-pointer"
                onClick={() => handleFlowerTouch(flower, idx)}
              >
                {!isOpened && (
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2.4, delay: idx * 0.3 }}
                    className="absolute -top-3 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-amber-100/90 text-amber-800 text-xs font-handwriting shadow-sm border border-amber-300"
                  >
                    {idx + 1}
                  </motion.div>
                )}

                <div
                  className={`transition-transform duration-300 ${
                    isOpened ? 'scale-100' : 'scale-90 hover:scale-100'
                  }`}
                >
                  <FlowerSVG
                    type={flower.type}
                    isOpen={isOpened}
                    petalColor={flower.petalColor}
                    centerColor={flower.centerColor}
                    stemHeight={flower.stemHeight}
                    scale={flower.scale}
                    rotation={flower.rotation}
                    showPollen={isOpened}
                  />
                </div>

                <span
                  className={`mt-1 font-handwriting text-xs sm:text-sm text-center transition-colors ${
                    isOpened ? 'text-amber-900 font-medium' : 'text-amber-800/50'
                  }`}
                >
                  {isOpened ? flower.shortLabel : 'tocar'}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-dark/40 px-5 backdrop-blur-[2px]"
            onClick={() => setActiveNote(null)}
          >
            <motion.div
              initial={{ scale: 0.88, y: 25, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-2xl bg-[#FCF8EE] p-7 shadow-paper-lg border border-[#E9DFC8] text-center"
              style={{
                boxShadow: '0 16px 40px -10px rgba(78, 54, 25, 0.2), 0 0 0 1px rgba(217, 195, 155, 0.5)',
              }}
            >
              <button
                onClick={() => setActiveNote(null)}
                aria-label="Cerrar nota"
                className="absolute top-4 right-4 rounded-full p-1 text-amber-900/50 hover:bg-amber-100/60 hover:text-amber-900"
              >
                <X size={18} />
              </button>

              <div className="mb-3 flex justify-center text-amber-500">
                <Sparkles size={20} />
              </div>

              <span className="font-serif text-xs uppercase tracking-wider text-amber-800/60">
                Flor #{activeNote.number}
              </span>

              <p className="mt-3 font-handwriting text-2xl sm:text-3xl leading-relaxed text-[#2C2317] font-normal">
                {activeNote.note}
              </p>

              <button
                onClick={() => setActiveNote(null)}
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-4 py-1.5 font-serif text-xs font-medium text-amber-900 transition-colors hover:bg-amber-200/80"
              >
                Guardar en el jardín 💛
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto w-full max-w-md flex justify-center min-h-[56px] items-center">
        <AnimatePresence>
          {isAllOpened && (
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={() => {
                sounds.vibrate(20);
                sounds.playBloom(2);
                onComplete();
              }}
              className="group flex items-center gap-3 rounded-full bg-amber-800/90 px-6 py-3 font-serif text-sm font-medium text-amber-50 shadow-md transition-all hover:bg-amber-900 hover:scale-[1.02] active:scale-[0.98]"
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