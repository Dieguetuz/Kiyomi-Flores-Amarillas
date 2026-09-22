'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowerSVG } from '@/components/ui/FlowerSVG';
import { PostcardModal } from '@/components/ui/PostcardModal';
import { sounds } from '@/utils/sound';
import { Sparkles, RefreshCw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import Image from 'next/image';

interface BouquetChapterProps {
  recipientName: string;
  chapterTag: string;
  bouquetTitle: string;
  staggeredLines: string[];
  highlightLine: string;
  signature: string;
  dateText: string;
  epiloguePrompt: string;
  epilogueMessages: string[];
  finalFarewell: string;
  onRestart: () => void;
}

export const BouquetChapter: React.FC<BouquetChapterProps> = ({
  recipientName,
  chapterTag,
  bouquetTitle,
  staggeredLines,
  highlightLine,
  signature,
  dateText,
  epiloguePrompt,
  epilogueMessages,
  finalFarewell,
  onRestart,
}) => {
  const [revealedLinesCount, setRevealedLinesCount] = useState(1);
  const [showEpilogue, setShowEpilogue] = useState(false);
  const [epilogueBloomed, setEpilogueBloomed] = useState(false);
  const [showPostcard, setShowPostcard] = useState(false);

  useEffect(() => {
    sounds.playBouquetArrival();

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.4 },
        colors: ['#FBBF24', '#F59E0B', '#FEF08A', '#EAB308'],
      });
    } catch {}

    // Faster pacing: reveals lines every 800ms
    const interval = setInterval(() => {
      setRevealedLinesCount((prev) => {
        if (prev < staggeredLines.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [staggeredLines.length]);

  const handleBouquetTap = () => {
    sounds.vibrate(20);
    sounds.playBloom(3);
    try {
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { y: 0.4 },
        colors: ['#FDE047', '#F59E0B', '#FEF08A'],
      });
    } catch {}
    // Also reveal all lines if user taps
    setRevealedLinesCount(staggeredLines.length);
  };

  const handleEpilogueFlowerClick = () => {
    if (!epilogueBloomed) {
      setEpilogueBloomed(true);
      sounds.vibrate([20, 30]);
      sounds.playBloom(4);
      try {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.8 },
          colors: ['#FBBF24', '#F59E0B', '#FEF08A'],
        });
      } catch {}
    }
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col justify-between px-3 sm:px-6 pt-12 pb-6 select-none">
      {/* Chapter Tag & Title */}
      <div className="mx-auto w-full max-w-md text-center space-y-1 pt-1">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-serif text-[11px] uppercase tracking-widest text-amber-900/60 font-semibold"
        >
          {chapterTag}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-serif text-2xl sm:text-3xl text-charcoal tracking-tight font-medium"
        >
          {bouquetTitle}
        </motion.h2>
      </div>

      {/* Main Bouquet Illustration */}
      <div className="relative mx-auto my-auto flex flex-col items-center justify-center py-2 max-w-sm w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onClick={handleBouquetTap}
          className="relative cursor-pointer group flex flex-col items-center active:scale-95 transition-transform"
        >
          {/* Radiant golden glow aura behind bouquet */}
          <div className="absolute top-4 h-48 w-48 rounded-full bg-amber-300/35 blur-2xl pointer-events-none" />

          {/* Real Illustrated Storybook Bouquet */}
          <div className="relative h-56 w-56 sm:h-64 sm:w-64 overflow-hidden rounded-3xl border-2 border-[#D4BF96] shadow-xl bg-[#FBF6EC]">
            <Image
              src="/images/yellow_bouquet.jpg"
              alt="Ramo ilustrado de flores amarillas"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
            {/* Ambient golden glimmer particles */}
            <motion.div
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              className="absolute top-2 right-2 text-yellow-300 text-sm"
            >
              ✨
            </motion.div>
          </div>

          <span className="mt-1.5 font-handwriting text-xs text-amber-900/65">
            Toca el ramo 💐
          </span>
        </motion.div>

        {/* Staggered Narrative Card */}
        <div
          onClick={() => setRevealedLinesCount(staggeredLines.length)}
          className="mt-3 w-full rounded-2xl bg-[#FAF4E6]/95 p-4 sm:p-5 border border-[#E8DCBF] shadow-paper text-center space-y-2 cursor-pointer"
        >
          <div className="space-y-1.5">
            {staggeredLines.slice(0, revealedLinesCount).map((line, idx) => {
              const isHighlight = line.includes(highlightLine) || line.includes('solamente tuyas');
              return (
                <motion.p
                  key={`line-${idx}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`font-handwriting leading-snug ${
                    isHighlight
                      ? 'text-2xl sm:text-3xl text-amber-950 font-semibold'
                      : 'text-xl sm:text-2xl text-amber-900/90'
                  }`}
                >
                  {line}
                </motion.p>
              );
            })}
          </div>

          {/* Author Signature & Date */}
          {revealedLinesCount >= staggeredLines.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="pt-2 border-t border-amber-800/15 flex items-center justify-between px-2"
            >
              <span className="font-serif text-xs text-amber-900/65 tracking-wider">
                {dateText}
              </span>
              <span className="font-serif text-base font-semibold text-amber-900">
                {signature}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Actions & Epilogue */}
      <div className="mx-auto w-full max-w-sm flex flex-col items-center gap-2 pt-1">
        <button
          onClick={() => {
            sounds.vibrate(20);
            sounds.playSecretFound();
            setShowPostcard(true);
          }}
          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-800 py-3.5 px-6 font-serif text-sm font-medium text-amber-50 shadow-md hover:bg-amber-900 transition-all active:scale-95"
        >
          <Sparkles size={16} className="text-amber-300" />
          <span>Guardar mis flores 💛</span>
        </button>

        {/* Epilogue */}
        <div className="text-center w-full">
          {!showEpilogue ? (
            <button
              onClick={() => setShowEpilogue(true)}
              className="font-handwriting text-sm text-amber-900/70 hover:text-amber-900 underline underline-offset-4 transition-colors pt-1"
            >
              {epiloguePrompt}
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-amber-900/5 border border-amber-900/10 mt-1"
            >
              <div
                onClick={handleEpilogueFlowerClick}
                className="cursor-pointer group flex flex-col items-center active:scale-95"
              >
                <FlowerSVG
                  type="sunflower"
                  isOpen={epilogueBloomed}
                  petalColor="#FBBF24"
                  centerColor="#78350F"
                  stemHeight={35}
                  scale={0.8}
                />
                {!epilogueBloomed && (
                  <span className="font-handwriting text-xs text-amber-800/80 mt-0.5">
                    Tócame una última vez 🌼
                  </span>
                )}
              </div>

              {epilogueBloomed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-1"
                >
                  {epilogueMessages.map((msg, i) => (
                    <p key={i} className="font-handwriting text-base text-amber-900 leading-snug">
                      {msg}
                    </p>
                  ))}
                  <p className="font-serif text-sm text-amber-950 font-medium pt-1">
                    {finalFarewell}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        <button
          onClick={onRestart}
          className="inline-flex items-center gap-1 font-serif text-[11px] text-amber-900/45 hover:text-amber-900/80 transition-colors pt-0.5"
        >
          <RefreshCw size={11} />
          <span>Volver al inicio</span>
        </button>
      </div>

      {showPostcard && (
        <PostcardModal
          recipientName={recipientName}
          senderName={signature}
          dateText={dateText}
          dedicationText="Estas no son de verdad, pero sí son solamente tuyas."
          onClose={() => setShowPostcard(false)}
        />
      )}
    </div>
  );
};