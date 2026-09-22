'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EasterEggItem } from '@/types';
import { sounds } from '@/utils/sound';
import { ArrowRight, BookOpen, PawPrint, X } from 'lucide-react';
import Image from 'next/image';

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
      setTimeout(() => setLunetaPeeking(false), 3200);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleEggClick = (egg: EasterEggItem) => {
    const isNew = !foundEggs.includes(egg.id);
    if (isNew) {
      setFoundEggs((prev) => [...prev, egg.id]);
      sounds.vibrate([20, 25]);
      sounds.playSecretFound();
    }

    if (egg.id === 'mikey') {
      onThemeChange('mikey');
      setTimeout(() => {
        onThemeChange('light');
      }, 4000);
    } else if (egg.id === 'tigger') {
      setCatRunning(true);
      setTimeout(() => setCatRunning(false), 1800);
    }

    setActiveEgg(egg);
  };

  const isComplete = foundEggs.length >= 3;

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col justify-between px-3 sm:px-6 pt-12 pb-6 select-none">
      <AnimatePresence>
        {catRunning && (
          <motion.div
            initial={{ x: '-10%', y: '50%', opacity: 0 }}
            animate={{
              x: ['0%', '115%'],
              y: ['50%', '44%', '52%', '40%'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="pointer-events-none fixed z-50 flex items-center gap-2 text-amber-900"
          >
            <span className="text-3xl">🐈🐾🐾</span>
            <span className="font-handwriting text-xs bg-amber-100/90 px-2 py-0.5 rounded shadow">
              *zoomies*
            </span>
          </motion.div>
        )}
      </AnimatePresence>

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
          {instruction}
        </motion.p>
        <div className="flex items-center justify-center pt-0.5">
          <span className="font-serif text-xs text-amber-900/65 tracking-wider">
            Secretos encontrados: {foundEggs.length} de {easterEggs.length}
          </span>
        </div>
      </div>

      {/* Interactive Scenery */}
      <div className="relative mx-auto my-auto w-full max-w-sm h-[360px] rounded-3xl bg-amber-900/[0.03] border border-amber-900/10 p-5 overflow-hidden">
        {/* Decorative background flowers */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -bottom-4 left-3 text-3xl rotate-[-8deg]">🌼</div>
          <div className="absolute -bottom-4 left-28 text-3xl rotate-[5deg]">🌻</div>
          <div className="absolute -bottom-6 right-8 text-3xl rotate-[-4deg]">🌼</div>
          <div className="absolute -bottom-4 right-28 text-2xl rotate-[12deg]">🌻</div>
        </div>

        {/* Secret 1: MIKEY */}
        {easterEggs.find((e) => e.id === 'mikey') && (
          <div
            className="absolute right-6 top-12 group cursor-pointer active:scale-90 transition-transform"
            onClick={() => handleEggClick(easterEggs.find((e) => e.id === 'mikey')!)}
          >
            <div className="relative p-2.5 rounded-full bg-amber-950/10 hover:bg-amber-950/20 transition-colors">
              <svg width="32" height="22" viewBox="0 0 34 24" fill="none" className="text-amber-900/75">
                <circle cx="7" cy="17" r="5" stroke="currentColor" strokeWidth="2" />
                <circle cx="27" cy="17" r="5" stroke="currentColor" strokeWidth="2" />
                <path d="M 7 17 L 15 17 L 20 8 L 27 17" stroke="currentColor" strokeWidth="2" />
                <path d="M 12 11 L 18 11" stroke="#D97706" strokeWidth="2.5" />
                <path d="M 19 8 L 18 5 L 22 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-400 blur-[0.5px]"
              />
            </div>
          </div>
        )}

        {/* Secret 2: TIGGER */}
        {easterEggs.find((e) => e.id === 'tigger') && (
          <div
            className="absolute left-6 bottom-14 group cursor-pointer active:scale-90 transition-transform"
            onClick={() => handleEggClick(easterEggs.find((e) => e.id === 'tigger')!)}
          >
            <div className="p-2.5 rounded-full bg-amber-800/10 hover:bg-amber-800/20 transition-colors">
              <PawPrint size={22} className="text-amber-800/70 rotate-[-20deg]" />
              <motion.span
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-orange-400"
              />
            </div>
          </div>
        )}

        {/* Secret 3: LUNETA */}
        {easterEggs.find((e) => e.id === 'luneta') && (
          <div
            className="absolute right-10 bottom-16 group cursor-pointer active:scale-90 transition-transform"
            onClick={() => handleEggClick(easterEggs.find((e) => e.id === 'luneta')!)}
          >
            <motion.div
              animate={{
                y: lunetaPeeking ? 0 : 24,
                opacity: lunetaPeeking ? 1 : 0.35,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative p-2 rounded-xl bg-amber-900/10"
            >
              <div className="flex flex-col items-center">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 bg-amber-800/80 clip-triangle rotate-[-15deg] rounded-sm" />
                  <div className="h-3 w-3 bg-amber-800/80 clip-triangle rotate-[15deg] rounded-sm" />
                </div>
                <div className="h-3.5 w-6 rounded-t-full bg-amber-800/80 flex items-center justify-center gap-1">
                  <div className="h-1 w-1 rounded-full bg-amber-100" />
                  <div className="h-1 w-1 rounded-full bg-amber-100" />
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Secret 4: DARK ROMANCE */}
        {easterEggs.find((e) => e.id === 'dark-romance') && (
          <div
            className="absolute left-8 top-16 group cursor-pointer active:scale-90 transition-transform"
            onClick={() => handleEggClick(easterEggs.find((e) => e.id === 'dark-romance')!)}
          >
            <div className="p-2.5 rounded-xl bg-charcoal-dark/15 hover:bg-charcoal-dark/25 transition-colors">
              <div className="relative">
                <BookOpen size={20} className="text-[#26201B]" />
                <span className="absolute -top-1 -right-1 text-[9px]">🖤</span>
              </div>
            </div>
          </div>
        )}

        {/* Secret 5: CHOCOLATE */}
        {easterEggs.find((e) => e.id === 'chocolate') && (
          <div
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 group cursor-pointer active:scale-90 transition-transform"
            onClick={() => handleEggClick(easterEggs.find((e) => e.id === 'chocolate')!)}
          >
            <div className="relative p-2.5 rounded-full bg-amber-950/10 hover:bg-amber-950/20 transition-colors">
              <span className="text-2xl filter drop-shadow-sm">🍫</span>
              <motion.span
                animate={{ opacity: [0.2, 0.9, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-yellow-300"
              />
            </div>
          </div>
        )}

        <div className="absolute bottom-2.5 left-0 right-0 text-center pointer-events-none">
          <span className="font-handwriting text-xs text-amber-900/50">
            Toca las pequeñas sombras y destellos escondidos ✨
          </span>
        </div>
      </div>

      {/* Secret Discovery Modal */}
      <AnimatePresence>
        {activeEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-dark/50 px-4 backdrop-blur-[2px]"
            onClick={() => setActiveEgg(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 10, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 340 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-xs sm:max-w-sm rounded-2xl p-6 text-center border shadow-2xl ${
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
                className="absolute top-3.5 right-3.5 rounded-full p-1.5 opacity-60 hover:opacity-100"
              >
                <X size={18} />
              </button>

              <span
                className={`inline-block font-serif text-[10px] font-semibold uppercase tracking-wider px-3 py-0.5 rounded-full mb-3 ${
                  activeEgg.id === 'mikey'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : activeEgg.id === 'dark-romance'
                    ? 'bg-neutral-800 text-stone-300 border border-neutral-700'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {activeEgg.badge}
              </span>

              {/* Storybook illustration for Tigger / Luneta */}
              {(activeEgg.id === 'tigger' || activeEgg.id === 'luneta') && (
                <div className="my-2.5 flex justify-center">
                  <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-amber-800/20 shadow-sm">
                    <Image
                      src="/images/cozy_cat.jpg"
                      alt="Gatito curioso"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {activeEgg.messages.map((msg, i) => (
                  <p
                    key={i}
                    className={`font-handwriting leading-snug ${
                      i === 0
                        ? 'text-2xl sm:text-3xl font-medium'
                        : 'text-lg sm:text-xl opacity-90'
                    }`}
                  >
                    {msg}
                  </p>
                ))}
              </div>

              <button
                onClick={() => setActiveEgg(null)}
                className={`mt-5 inline-flex items-center gap-1.5 rounded-full px-5 py-2 font-serif text-xs font-medium transition-colors active:scale-95 ${
                  activeEgg.id === 'mikey'
                    ? 'bg-amber-500 text-black hover:bg-amber-400'
                    : activeEgg.id === 'dark-romance'
                    ? 'bg-stone-700 text-stone-100 hover:bg-stone-600'
                    : 'bg-amber-800 text-amber-50 hover:bg-amber-900'
                }`}
              >
                Continuar explorando
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advance button */}
      <div className="mx-auto w-full max-w-sm flex justify-center min-h-[52px] items-center">
        <AnimatePresence>
          {isComplete && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              onClick={() => {
                sounds.vibrate(20);
                sounds.playBloom(3);
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