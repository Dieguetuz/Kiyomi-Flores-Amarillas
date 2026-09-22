'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sounds } from '@/utils/sound';
import { ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import Image from 'next/image';

interface MinecraftChapterProps {
  chapterTag: string;
  title: string;
  subtitle: string;
  blockInstruction: string;
  pixelBadge: string;
  messages: string[];
  onComplete: () => void;
}

export const MinecraftChapter: React.FC<MinecraftChapterProps> = ({
  chapterTag,
  title,
  subtitle,
  blockInstruction,
  pixelBadge,
  messages,
  onComplete,
}) => {
  const [isActivated, setIsActivated] = useState(false);
  const [revealedIndex, setRevealedIndex] = useState(0);

  const handleBlockClick = () => {
    if (!isActivated) {
      setIsActivated(true);
      sounds.vibrate([25, 30]);
      sounds.playPixelClick();

      try {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#FACC15', '#65A30D', '#854D0E', '#FDE047'],
        });
      } catch {}

      // Fast, engaging staggered reveal (750ms instead of 1400ms)
      const timer = setInterval(() => {
        setRevealedIndex((prev) => {
          if (prev < messages.length) {
            sounds.playBloom(prev);
            return prev + 1;
          }
          clearInterval(timer);
          return prev;
        });
      }, 750);
    }
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col justify-between px-3 sm:px-6 pt-12 pb-6 select-none">
      {/* Header */}
      <div className="mx-auto w-full max-w-md text-center space-y-1 pt-2">
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
          {subtitle}
        </motion.p>
      </div>

      {/* Central Interactive Voxel Block */}
      <div className="relative mx-auto my-auto w-full max-w-sm flex flex-col items-center py-2">
        <motion.div
          whileTap={{ scale: 0.93 }}
          onClick={handleBlockClick}
          className="relative cursor-pointer group flex flex-col items-center active:scale-95 transition-transform"
        >
          {/* Illustrated 3D Voxel Grass Block with Dandelion */}
          <div className="relative h-44 w-44 sm:h-52 sm:w-52 overflow-hidden rounded-3xl border-2 border-amber-800/20 shadow-xl bg-[#EDE4CF]">
            <Image
              src="/images/minecraft_block.jpg"
              alt="Bloque de tierra y flor amarilla"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
            {/* Pulsing ring prompt if not yet tapped */}
            {!isActivated && (
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-3xl border-2 border-yellow-400/80 pointer-events-none"
              />
            )}
          </div>

          {!isActivated && (
            <motion.p
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="mt-3 font-handwriting text-sm text-amber-900 bg-amber-100/90 px-3.5 py-1 rounded-full border border-amber-300 shadow-sm"
            >
              {blockInstruction}
            </motion.p>
          )}
        </motion.div>

        {/* Narrative Box with Staggered Messages */}
        <AnimatePresence>
          {isActivated && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 w-full rounded-2xl bg-[#FAF4E6] p-4 sm:p-5 border border-[#E5D7BE] shadow-paper text-center space-y-2"
            >
              <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-lime-900 bg-lime-100/90 px-2.5 py-0.5 rounded-full">
                <Sparkles size={12} className="text-lime-700" />
                {pixelBadge}
              </span>

              <div className="space-y-1.5 pt-1">
                {messages.slice(0, Math.max(revealedIndex, 1)).map((msg, idx) => (
                  <motion.p
                    key={`msg-${idx}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`font-handwriting leading-snug ${
                      idx === 0
                        ? 'text-2xl text-amber-950 font-medium'
                        : 'text-lg sm:text-xl text-amber-900/90'
                    }`}
                  >
                    {msg}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Button to proceed to Bouquet */}
      <div className="mx-auto w-full max-w-sm flex justify-center min-h-[52px] items-center">
        <AnimatePresence>
          {isActivated && revealedIndex >= 2 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              onClick={() => {
                sounds.vibrate(20);
                sounds.playBouquetArrival();
                onComplete();
              }}
              className="group flex items-center gap-2.5 rounded-full bg-amber-800 px-6 py-3 font-serif text-sm font-medium text-amber-50 shadow-md transition-all hover:bg-amber-900 active:scale-95"
            >
              <span>Reunir tus flores</span>
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