'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EasterEggItem } from '@/types';
import { sounds } from '@/utils/sound';
import { ArrowRight, BookOpen, PawPrint, X, Sparkles } from 'lucide-react';
import Image from 'next/image';
import confetti from 'canvas-confetti';

interface SecretsChapterProps {
  chapterTag: string;
  title: string;
  instruction: string;
  easterEggs: EasterEggItem[];
  onComplete: () => void;
  onThemeChange?: (theme: 'light' | 'mikey') => void;
}

export const SecretsChapter: React.FC<SecretsChapterProps> = ({
  chapterTag,
  title,
  instruction,
  easterEggs,
  onComplete,
}) => {
  const [foundEggs, setFoundEggs] = useState<string[]>([]);
  const [activeEgg, setActiveEgg] = useState<EasterEggItem | null>(null);
  const [catRunning, setCatRunning] = useState(false);
  const [extraFlowersBurst, setExtraFlowersBurst] = useState(false);

  const handleEggClick = (egg: EasterEggItem) => {
    const isNew = !foundEggs.includes(egg.id);
    if (isNew) {
      setFoundEggs((prev) => [...prev, egg.id]);
      sounds.vibrate([20, 25]);
      sounds.playSecretFound();
    }

    if (egg.id === 'mikey') {
      // Mikey bonus: instead of dark mode, spawn extra blooming flowers & golden confetti!
      setExtraFlowersBurst(true);
      try {
        confetti({
          particleCount: 50,
          spread: 75,
          origin: { y: 0.5 },
          colors: ['#FACC15', '#F59E0B', '#FEF08A', '#D97706'],
        });
      } catch {}
      setTimeout(() => setExtraFlowersBurst(false), 5000);
    } else if (egg.id === 'tigger') {
      setCatRunning(true);
      setTimeout(() => setCatRunning(false), 1800);
    }

    setActiveEgg(egg);
  };

  const isComplete = foundEggs.length >= 3;

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col justify-between px-3 sm:px-6 pt-12 pb-6 select-none">
      {/* Cat scampering across */}
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

      {/* Floating extra yellow flowers when Mikey secret is active */}
      <AnimatePresence>
        {extraFlowersBurst && (
          <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.div
                key={`mikey-flower-${i}`}
                initial={{
                  x: `${(i * 7) % 95}vw`,
                  y: '105vh',
                  opacity: 0,
                  scale: 0.6,
                  rotate: 0,
                }}
                animate={{
                  y: '-10vh',
                  opacity: [0, 1, 1, 0],
                  scale: [0.6, 1.2, 0.8],
                  rotate: 360,
                }}
                transition={{
                  duration: 3 + (i % 3),
                  delay: i * 0.15,
                  ease: 'easeOut',
                }}
                className="absolute text-3xl select-none"
              >
                {i % 2 === 0 ? '🌻' : '🌼'}
              </motion.div>
            ))}
          </div>
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

      {/* Illustrated Storybook Garden Window */}
      <div className="relative mx-auto my-auto w-full max-w-sm h-[390px] rounded-3xl overflow-hidden border-2 border-amber-800/25 shadow-xl bg-[#EDE4CF]">
        {/* Storybook illustration backdrop */}
        <Image
          src="/images/secret_garden.jpg"
          alt="Jardín de secretos ilustrado"
          fill
          className="object-cover"
          priority
        />

        {/* Soft vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-amber-950/20 pointer-events-none" />

        {/* Secret 1: MIKEY (Moto silueta dorada por el camino) */}
        {easterEggs.find((e) => e.id === 'mikey') && (
          <div
            className="absolute right-8 top-16 group cursor-pointer active:scale-90 transition-transform z-20"
            onClick={() => handleEggClick(easterEggs.find((e) => e.id === 'mikey')!)}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2.4 }}
              className="relative p-2.5 rounded-full bg-amber-950/40 backdrop-blur-sm border border-amber-300/60 shadow-md"
            >
              <svg width="30" height="20" viewBox="0 0 34 24" fill="none" className="text-yellow-200">
                <circle cx="7" cy="17" r="5" stroke="currentColor" strokeWidth="2" />
                <circle cx="27" cy="17" r="5" stroke="currentColor" strokeWidth="2" />
                <path d="M 7 17 L 15 17 L 20 8 L 27 17" stroke="currentColor" strokeWidth="2" />
                <path d="M 12 11 L 18 11" stroke="#FDE047" strokeWidth="2.5" />
                <path d="M 19 8 L 18 5 L 22 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="absolute -top-1 -right-1 text-xs">✨</span>
            </motion.div>
          </div>
        )}

        {/* Secret 2: TIGGER (Huellita cerca de los girasoles) */}
        {easterEggs.find((e) => e.id === 'tigger') && (
          <div
            className="absolute left-7 bottom-20 group cursor-pointer active:scale-90 transition-transform z-20"
            onClick={() => handleEggClick(easterEggs.find((e) => e.id === 'tigger')!)}
          >
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ repeat: Infinity, duration: 2.1, delay: 0.3 }}
              className="p-2.5 rounded-full bg-amber-900/40 backdrop-blur-sm border border-amber-300/60 shadow-md"
            >
              <PawPrint size={22} className="text-amber-200 rotate-[-15deg]" />
              <span className="absolute -top-1 -right-1 text-xs">🐾</span>
            </motion.div>
          </div>
        )}

        {/* Secret 3: LUNETA DE YOGURT (Asomándose entre las flores de la casa) */}
        {easterEggs.find((e) => e.id === 'luneta') && (
          <div
            className="absolute right-12 bottom-24 group cursor-pointer active:scale-90 transition-transform z-20"
            onClick={() => handleEggClick(easterEggs.find((e) => e.id === 'luneta')!)}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="p-2 rounded-2xl bg-amber-950/40 backdrop-blur-sm border border-amber-300/60 shadow-md flex flex-col items-center"
            >
              <div className="flex gap-1">
                <div className="h-2.5 w-2.5 bg-amber-200 clip-triangle rotate-[-12deg]" />
                <div className="h-2.5 w-2.5 bg-amber-200 clip-triangle rotate-[12deg]" />
              </div>
              <div className="h-3 w-5 bg-amber-200 rounded-t-full flex items-center justify-center gap-0.5">
                <div className="h-1 w-1 bg-amber-900 rounded-full" />
                <div className="h-1 w-1 bg-amber-900 rounded-full" />
              </div>
            </motion.div>
          </div>
        )}

        {/* Secret 4: DARK ROMANCE (Libro entre los arbustos) */}
        {easterEggs.find((e) => e.id === 'dark-romance') && (
          <div
            className="absolute left-8 top-20 group cursor-pointer active:scale-90 transition-transform z-20"
            onClick={() => handleEggClick(easterEggs.find((e) => e.id === 'dark-romance')!)}
          >
            <div className="p-2.5 rounded-xl bg-amber-950/45 backdrop-blur-sm border border-amber-300/50 shadow-md">
              <div className="relative">
                <BookOpen size={20} className="text-amber-100" />
                <span className="absolute -top-1.5 -right-1.5 text-[10px]">🖤</span>
              </div>
            </div>
          </div>
        )}

        {/* Secret 5: CHOCOLATE (Junto al camino) */}
        {easterEggs.find((e) => e.id === 'chocolate') && (
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-8 group cursor-pointer active:scale-90 transition-transform z-20"
            onClick={() => handleEggClick(easterEggs.find((e) => e.id === 'chocolate')!)}
          >
            <div className="p-2.5 rounded-full bg-amber-950/45 backdrop-blur-sm border border-amber-300/50 shadow-md">
              <span className="text-2xl filter drop-shadow">🍫</span>
            </div>
          </div>
        )}

        {/* Bottom invitation text */}
        <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none z-10">
          <span className="font-handwriting text-xs text-amber-100 bg-amber-950/60 px-3 py-0.5 rounded-full backdrop-blur-[2px]">
            Toca las pequeñas sombras y destellos en el jardín ✨
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
              className="relative w-full max-w-xs sm:max-w-sm rounded-2xl p-6 text-center border shadow-2xl bg-[#FCF8EE] border-[#E9DFC8] text-charcoal"
            >
              <button
                onClick={() => setActiveEgg(null)}
                aria-label="Cerrar secreto"
                className="absolute top-3.5 right-3.5 rounded-full p-1.5 opacity-60 hover:opacity-100"
              >
                <X size={18} />
              </button>

              <span className="inline-block font-serif text-[10px] font-semibold uppercase tracking-wider px-3 py-0.5 rounded-full mb-3 bg-amber-100 text-amber-900 border border-amber-200">
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

              {/* Mikey Header Decoration */}
              {activeEgg.id === 'mikey' && (
                <div className="mb-2 flex items-center justify-center gap-1.5 text-amber-600">
                  <Sparkles size={18} />
                  <span className="text-xl">🏍️</span>
                  <Sparkles size={18} />
                </div>
              )}

              <div className="space-y-2">
                {activeEgg.messages.map((msg, i) => (
                  <p
                    key={i}
                    className={`font-handwriting leading-snug ${
                      i === 0
                        ? 'text-2xl sm:text-3xl font-medium text-amber-950'
                        : 'text-lg sm:text-xl opacity-90 text-amber-900'
                    }`}
                  >
                    {msg}
                  </p>
                ))}
              </div>

              <button
                onClick={() => setActiveEgg(null)}
                className="mt-5 inline-flex items-center gap-1.5 rounded-full px-5 py-2 font-serif text-xs font-medium transition-colors bg-amber-800 text-amber-50 hover:bg-amber-900 active:scale-95 shadow-sm"
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