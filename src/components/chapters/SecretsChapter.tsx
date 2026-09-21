'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EasterEggItem } from '@/types';
import { sounds } from '@/utils/sound';
import { ArrowRight, BookOpen, PawPrint, X } from 'lucide-react';

interface SecretsChapterProps {
  chapterTag: string;
  title: string;
  instruction: string;
  easterEggs: EasterEggItem[];
  onComplete: () => void;
  onThemeChange: (theme: 'light' | 'mikey') => void;
}

export const SecretsChapter: React.FC<SecretsChapterProps> = ({
  chapterTag,
  title,
  instruction,
  easterEggs,
  onComplete,
  onThemeChange,
}) => {
  const [foundEggs, setFoundEggs] = useState<string[]>([]);
  const [activeEgg, setActiveEgg] = useState<EasterEggItem | null>(null);
  const [catRunning, setCatRunning] = useState(false);
  const [lunetaPeeking, setLunetaPeeking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLunetaPeeking(true);
      setTimeout(() => setLunetaPeeking(false), 3800);
    }, 7500);
    return () => clearInterval(interval);
  }, []);

  const handleEggClick = (egg: EasterEggItem) => {
    const isNew = !foundEggs.includes(egg.id);
    if (isNew) {
      setFoundEggs((prev) => [...prev, egg.id]);
      sounds.vibrate([20, 30, 20]);
      sounds.playSecretFound();
    }

    if (egg.id === 'mikey') {
      onThemeChange('mikey');
      setTimeout(() => {
        onThemeChange('light');
      }, 5500);
    } else if (egg.id === 'tigger') {
      setCatRunning(true);
      setTimeout(() => setCatRunning(false), 2400);
    }

    setActiveEgg(egg);
  };

  const isComplete = foundEggs.length >= 3;

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between px-4 sm:px-6 pt-16 pb-8 select-none">
      <AnimatePresence>
        {catRunning && (
          <motion.div
            initial={{ x: '-10%', y: '50%', opacity: 0 }}
            animate={{
              x: ['0%', '110%'],
              y: ['50%', '42%', '55%', '38%'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
            className="pointer-events-none fixed z-50 flex items-center gap-3 text-amber-900"
          >
            <span className="text-3xl">🐈🐾🐾</span>
            <span className="font-handwriting text-sm bg-amber-100/90 px-2 py-0.5 rounded shadow">
              *zoomies*
            </span>
          </motion.div>
        )}
      </AnimatePresence>

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
          {instruction}
        </motion.p>
        <div className="flex items-center justify-center gap-1.5 pt-1">
          <span className="font-serif text-xs text-amber-900/60 tracking-wider">
            Secretos encontrados: {foundEggs.length} de {easterEggs.length}
          </span>
        </div>
      </div>

      <div className="relative mx-auto my-auto w-full max-w-md h-[400px] rounded-3xl bg-amber-900/[0.03] border border-amber-900/10 p-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -bottom-6 left-4 scale-75 rotate-[-8deg] origin-bottom text-amber-400">
            🌼
          </div>
          <div className="absolute -bottom-4 left-32 scale-90 rotate-[5deg] origin-bottom text-amber-500">
            🌻
          </div>
          <div className="absolute -bottom-8 right-12 scale-110 rotate-[-4deg] origin-bottom text-amber-400">
            🌼
          </div>
          <div className="absolute -bottom-6 right-36 scale-75 rotate-[12deg] origin-bottom text-yellow-500">
            🌻
          </div>
        </div>

        {easterEggs.find((e) => e.id === 'mikey') && (
          <div
            className="absolute right-8 top-16 group cursor-pointer"
            onClick={() => handleEggClick(easterEggs.find((e) => e.id === 'mikey')!)}
          >
            <motion.div
              whileHover={{ scale: 1.15, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-full bg-amber-950/5 hover:bg-amber-950/15 transition-colors"
            >
              <svg width="34" height="24" viewBox="0 0 34 24" fill="none" className="text-amber-900/70">
                <circle cx="7" cy="17" r="5" stroke="currentColor" strokeWidth="2" />
                <circle cx="27" cy="17" r="5" stroke="currentColor" strokeWidth="2" />
                <path d="M 7 17 L 15 17 L 20 8 L 27 17" stroke="currentColor" strokeWidth="2" />
                <path d="M 12 11 L 18 11" stroke="#D97706" strokeWidth="2.5" />
                <path d="M 19 8 L 18 5 L 22 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <motion.span
                animate={{ opacity: [0.2, 0.9, 0.2] }}
                transition={{ repeat: Infinity, duration: 2.8 }}
                className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-400 blur-[1px]"
              />
            </motion.div>
          </div>
        )}

        {easterEggs.find((e) => e.id === 'tigger') && (
          <div
            className="absolute left-6 bottom-16 group cursor-pointer"
            onClick={() => handleEggClick(easterEggs.find((e) => e.id === 'tigger')!)}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-amber-800/5 hover:bg-amber-800/15 transition-colors"
            >
              <PawPrint size={24} className="text-amber-800/60 rotate-[-20deg]" />
              <motion.span
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-orange-400"
              />
            </motion.div>
          </div>
        )}

        {easterEggs.find((e) => e.id === 'luneta') && (
          <div
            className="absolute right-12 bottom-20 group cursor-pointer"
            onClick={() => handleEggClick(easterEggs.find((e) => e.id === 'luneta')!)}
          >
            <motion.div
              animate={{
                y: lunetaPeeking ? 0 : 26,
                opacity: lunetaPeeking ? 1 : 0.35,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative p-2 rounded-xl bg-amber-900/5 hover:bg-amber-900/15"
            >
              <div className="flex flex-col items-center">
                <div className="flex gap-2">
                  <div className="h-3 w-3 bg-amber-800/70 clip-triangle rotate-[-15deg] rounded-sm" />
                  <div className="h-3 w-3 bg-amber-800/70 clip-triangle rotate-[15deg] rounded-sm" />
                </div>
                <div className="h-4 w-7 rounded-t-full bg-amber-800/70 flex items-center justify-center gap-1">
                  <div className="h-1 w-1 rounded-full bg-amber-100" />
                  <div className="h-1 w-1 rounded-full bg-amber-100" />
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {easterEggs.find((e) => e.id === 'dark-romance') && (
          <div
            className="absolute left-10 top-20 group cursor-pointer"
            onClick={() => handleEggClick(easterEggs.find((e) => e.id === 'dark-romance')!)}
          >
            <motion.div
              whileHover={{ scale: 1.15, rotate: 6 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-charcoal-dark/10 hover:bg-charcoal-dark/20 transition-colors"
            >
              <div className="relative">
                <BookOpen size={22} className="text-[#26201B]" />
                <span className="absolute -top-1 -right-1 text-[10px]">🖤</span>
              </div>
            </motion.div>
          </div>
        )}

        {easterEggs.find((e) => e.id === 'chocolate') && (
          <div
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 group cursor-pointer"
            onClick={() => handleEggClick(easterEggs.find((e) => e.id === 'chocolate')!)}
          >
            <motion.div
              whileHover={{ scale: 1.25, rotate: -8 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-3 rounded-full bg-amber-950/5 hover:bg-amber-950/15 transition-colors"
            >
              <span className="text-2xl filter drop-shadow-sm">🍫</span>
              <motion.span
                animate={{ opacity: [0.1, 0.8, 0.1] }}
                transition={{ repeat: Infinity, duration: 2.2, delay: 1 }}
                className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-yellow-300"
              />
            </motion.div>
          </div>
        )}

        <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
          <span className="font-handwriting text-xs text-amber-900/50">
            Toca las pequeñas sombras y destellos escondidos ✨
          </span>
        </div>
      </div>

      <AnimatePresence>
        {activeEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-dark/50 px-5 backdrop-blur-[2px]"
            onClick={() => setActiveEgg(null)}
          >
            <motion.div
              initial={{ scale: 0.88, y: 25, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-sm rounded-2xl p-7 text-center border shadow-paper-lg ${
                activeEgg.id === 'mikey'
                  ? 'bg-[#12100D] border-amber-500/40 text-amber-100'
                  : activeEgg.id === 'dark-romance'
                  ? 'bg-[#181512] border-neutral-700/60 text-stone-200'
                  : 'bg-[#FCF8EE] border-[#E9DFC8] text-charcoal'
              }`}
            >
              <button
                onClick={() => setActiveEgg(null)}
                aria-label="Cerrar secreto"
                className="absolute top-4 right-4 rounded-full p-1 opacity-60 hover:opacity-100"
              >
                <X size={18} />
              </button>

              <span
                className={`inline-block font-serif text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${
                  activeEgg.id === 'mikey'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : activeEgg.id === 'dark-romance'
                    ? 'bg-neutral-800 text-stone-300 border border-neutral-700'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {activeEgg.badge}
              </span>

              <div className="space-y-3">
                {activeEgg.messages.map((msg, i) => (
                  <p
                    key={i}
                    className={`font-handwriting leading-relaxed ${
                      i === 0
                        ? 'text-2xl sm:text-3xl font-medium'
                        : 'text-xl sm:text-2xl opacity-90'
                    }`}
                  >
                    {msg}
                  </p>
                ))}
              </div>

              <button
                onClick={() => setActiveEgg(null)}
                className={`mt-6 inline-flex items-center gap-1.5 rounded-full px-5 py-2 font-serif text-xs font-medium transition-colors ${
                  activeEgg.id === 'mikey'
                    ? 'bg-amber-500 text-black hover:bg-amber-400'
                    : activeEgg.id === 'dark-romance'
                    ? 'bg-stone-700 text-stone-100 hover:bg-stone-600'
                    : 'bg-amber-800/90 text-amber-50 hover:bg-amber-900'
                }`}
              >
                Continuar explorando
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto w-full max-w-md flex justify-center min-h-[56px] items-center">
        <AnimatePresence>
          {isComplete && (
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={() => {
                sounds.vibrate(20);
                sounds.playBloom(3);
                onComplete();
              }}
              className="group flex items-center gap-3 rounded-full bg-amber-800/90 px-6 py-3 font-serif text-sm font-medium text-amber-50 shadow-md transition-all hover:bg-amber-900 hover:scale-[1.02] active:scale-[0.98]"
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