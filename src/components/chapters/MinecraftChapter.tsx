'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sounds } from '@/utils/sound';
import { ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

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
      sounds.vibrate([25, 40, 25]);
      sounds.playPixelClick();

      try {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.65 },
          colors: ['#FACC15', '#65A30D', '#854D0E', '#FDE047'],
        });
      } catch {}

      const timer = setInterval(() => {
        setRevealedIndex((prev) => {
          if (prev < messages.length) {
            sounds.playBloom(prev);
            return prev + 1;
          }
          clearInterval(timer);
          return prev;
        });
      }, 1400);
    }
  };

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
          className="font-serif text-2xl sm:text-3xl text-charcoal tracking-tight font-medium"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-handwriting text-lg text-amber-800/80"
        >
          {subtitle}
        </motion.p>
      </div>

      <div className="relative mx-auto my-auto w-full max-w-md flex flex-col items-center py-4">
        <motion.div
          whileHover={{ scale: 1.06, rotate: 2 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleBlockClick}
          className="relative cursor-pointer group flex flex-col items-center select-none"
        >
          <div className="relative z-20 mb-[-12px] flex flex-col items-center">
            <motion.div
              animate={isActivated ? { rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] } : { y: [0, -3, 0] }}
              transition={{ repeat: isActivated ? 0 : Infinity, duration: 3 }}
              className="grid grid-cols-3 gap-0.5 p-1 bg-amber-500/20 rounded"
            >
              <div className="h-3 w-3 bg-[#FACC15]" />
              <div className="h-3 w-3 bg-[#FEF08A]" />
              <div className="h-3 w-3 bg-[#FACC15]" />
              <div className="h-3 w-3 bg-[#FEF08A]" />
              <div className="h-3 w-3 bg-[#854D0E]" />
              <div className="h-3 w-3 bg-[#FEF08A]" />
              <div className="h-3 w-3 bg-[#FACC15]" />
              <div className="h-3 w-3 bg-[#FEF08A]" />
              <div className="h-3 w-3 bg-[#FACC15]" />
            </motion.div>

            <div className="h-6 w-1.5 bg-[#4D7C0F]" />
          </div>

          <svg width="140" height="130" viewBox="0 0 140 130" className="overflow-visible drop-shadow-md">
            <polygon
              points="70,10 130,42 70,74 10,42"
              fill="#5B8C2A"
              stroke="#466B20"
              strokeWidth="2"
            />
            <polygon points="70,10 90,20 80,26 60,15" fill="#6EA433" />
            <polygon points="40,26 60,36 50,42 30,32" fill="#6EA433" />
            <polygon points="90,32 110,42 100,48 80,38" fill="#4B7522" />

            <polygon
              points="10,42 70,74 70,122 10,90"
              fill="#69462B"
              stroke="#4E331E"
              strokeWidth="2"
            />
            <polygon
              points="10,42 70,74 70,86 60,82 50,88 40,80 30,85 20,78 10,84"
              fill="#4E7524"
            />

            <polygon
              points="70,74 130,42 130,90 70,122"
              fill="#835736"
              stroke="#5D3E25"
              strokeWidth="2"
            />
            <polygon
              points="70,74 130,42 130,54 120,58 110,50 100,56 90,48 80,55 70,86"
              fill="#5B8C2A"
            />
          </svg>

          {!isActivated && (
            <motion.p
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              className="mt-4 font-handwriting text-base text-amber-900/80 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200"
            >
              {blockInstruction}
            </motion.p>
          )}
        </motion.div>

        <AnimatePresence>
          {isActivated && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-6 w-full rounded-2xl bg-[#FAF4E6] p-6 border border-[#E5D7BE] shadow-paper text-center space-y-3"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-lime-900 bg-lime-100/90 px-3 py-0.5 rounded-full">
                <Sparkles size={13} className="text-lime-700" />
                {pixelBadge}
              </span>

              <div className="space-y-2 pt-2">
                {messages.slice(0, Math.max(revealedIndex, 1)).map((msg, idx) => (
                  <motion.p
                    key={`msg-${idx}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`font-handwriting leading-relaxed ${
                      idx === 0
                        ? 'text-2xl text-amber-950 font-medium'
                        : 'text-xl text-amber-900/90'
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

      <div className="mx-auto w-full max-w-md flex justify-center min-h-[56px] items-center">
        <AnimatePresence>
          {isActivated && revealedIndex >= 2 && (
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={() => {
                sounds.vibrate(20);
                sounds.playBouquetArrival();
                onComplete();
              }}
              className="group flex items-center gap-3 rounded-full bg-amber-800/90 px-6 py-3 font-serif text-sm font-medium text-amber-50 shadow-md transition-all hover:bg-amber-900 hover:scale-[1.02] active:scale-[0.98]"
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