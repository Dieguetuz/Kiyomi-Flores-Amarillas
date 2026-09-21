'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FlowerSVG } from '@/components/ui/FlowerSVG';
import { PostcardModal } from '@/components/ui/PostcardModal';
import { sounds } from '@/utils/sound';
import { Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

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
        particleCount: 45,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#FBBF24', '#F59E0B', '#FEF08A', '#EAB308'],
      });
    } catch {}

    const interval = setInterval(() => {
      setRevealedLinesCount((prev) => {
        if (prev < staggeredLines.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [staggeredLines.length]);

  const handleEpilogueFlowerClick = () => {
    if (!epilogueBloomed) {
      setEpilogueBloomed(true);
      sounds.vibrate([20, 30, 20]);
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
    <div className="relative flex min-h-screen w-full flex-col justify-between px-4 sm:px-6 pt-16 pb-12 select-none">
      <div className="mx-auto w-full max-w-lg text-center space-y-1">
        <motion.span
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-xs uppercase tracking-widest text-amber-900/60"
        >
          {chapterTag}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-2xl sm:text-3xl text-charcoal tracking-tight font-medium"
        >
          {bouquetTitle}
        </motion.h2>
      </div>

      <div className="relative mx-auto my-auto flex flex-col items-center justify-center py-2 max-w-md w-full">
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center"
        >
          <div className="absolute top-10 h-48 w-48 rounded-full bg-amber-300/30 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex items-end justify-center -space-x-14">
            <div className="rotate-[-18deg] translate-y-3 origin-bottom scale-90">
              <FlowerSVG
                type="wildflower"
                isOpen={true}
                petalColor="#FDE047"
                centerColor="#78350F"
                stemHeight={85}
              />
            </div>

            <div className="rotate-[-8deg] translate-y-1 origin-bottom scale-95">
              <FlowerSVG
                type="daisy"
                isOpen={true}
                petalColor="#F59E0B"
                centerColor="#451A03"
                stemHeight={95}
              />
            </div>

            <div className="rotate-[0deg] -translate-y-3 origin-bottom scale-110 z-20">
              <FlowerSVG
                type="sunflower"
                isOpen={true}
                petalColor="#FBBF24"
                centerColor="#78350F"
                stemHeight={105}
                showPollen={true}
              />
            </div>

            <div className="rotate-[10deg] translate-y-2 origin-bottom scale-100">
              <FlowerSVG
                type="tulip"
                isOpen={true}
                petalColor="#FEF08A"
                centerColor="#B45309"
                stemHeight={95}
              />
            </div>

            <div className="rotate-[20deg] translate-y-4 origin-bottom scale-90">
              <FlowerSVG
                type="sunflower"
                isOpen={true}
                petalColor="#FCD34D"
                centerColor="#92400E"
                stemHeight={85}
              />
            </div>
          </div>

          <div className="relative z-30 -mt-16">
            <svg width="220" height="150" viewBox="0 0 220 150" className="overflow-visible drop-shadow-lg">
              <defs>
                <linearGradient id="kraft-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D9C2A0" />
                  <stop offset="50%" stopColor="#C4AA84" />
                  <stop offset="100%" stopColor="#A88B64" />
                </linearGradient>
                <linearGradient id="kraft-fold" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E5D3B8" />
                  <stop offset="100%" stopColor="#BA9E76" />
                </linearGradient>
              </defs>

              <polygon points="10,20 110,140 210,20" fill="url(#kraft-grad)" stroke="#947752" strokeWidth="1" />
              <polygon points="10,20 110,140 70,30" fill="url(#kraft-fold)" opacity="0.9" />
              <polygon points="210,20 110,140 150,30" fill="url(#kraft-grad)" opacity="0.85" />
              <line x1="80" y1="40" x2="105" y2="120" stroke="#8A6E4A" strokeWidth="0.8" opacity="0.4" />
              <line x1="140" y1="40" x2="115" y2="120" stroke="#8A6E4A" strokeWidth="0.8" opacity="0.4" />
              <path
                d="M 65 65 Q 110 75 155 65 Q 110 55 65 65"
                fill="none"
                stroke="#6B4A28"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="110" cy="65" r="5" fill="#6B4A28" />
              <path d="M 110 65 Q 95 85 85 105" fill="none" stroke="#6B4A28" strokeWidth="2.5" />
              <path d="M 110 65 Q 125 85 135 100" fill="none" stroke="#6B4A28" strokeWidth="2.5" />
            </svg>
          </div>
        </motion.div>

        <div className="mt-4 w-full max-w-sm rounded-3xl bg-[#FAF4E6]/90 p-6 border border-[#E8DCBF] shadow-paper text-center space-y-3">
          <div className="space-y-2">
            {staggeredLines.slice(0, revealedLinesCount).map((line, idx) => {
              const isHighlight = line.includes(highlightLine) || line.includes('solamente tuyas');
              return (
                <motion.p
                  key={`line-${idx}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className={`font-handwriting leading-relaxed ${
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

          {revealedLinesCount >= staggeredLines.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="pt-3 border-t border-amber-800/15 flex items-center justify-between px-2"
            >
              <span className="font-serif text-xs text-amber-900/60 tracking-wider">
                {dateText}
              </span>
              <span className="font-serif text-base font-semibold text-amber-900">
                {signature}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mx-auto w-full max-w-md flex flex-col items-center gap-3 pt-2">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          onClick={() => {
            sounds.vibrate(20);
            sounds.playSecretFound();
            setShowPostcard(true);
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-amber-800 px-7 py-3.5 font-serif text-sm font-medium text-amber-50 shadow-md hover:bg-amber-900 transition-all active:scale-95"
        >
          <Sparkles size={16} className="text-amber-300" />
          <span>Guardar mis flores 💛</span>
        </motion.button>

        <div className="mt-2 text-center">
          {!showEpilogue ? (
            <button
              onClick={() => setShowEpilogue(true)}
              className="font-handwriting text-base text-amber-900/70 hover:text-amber-900 underline underline-offset-4 transition-colors"
            >
              {epiloguePrompt}
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-amber-900/5 border border-amber-900/10"
            >
              <div
                onClick={handleEpilogueFlowerClick}
                className="cursor-pointer group flex flex-col items-center"
              >
                <FlowerSVG
                  type="sunflower"
                  isOpen={epilogueBloomed}
                  petalColor="#FBBF24"
                  centerColor="#78350F"
                  stemHeight={45}
                  scale={0.8}
                />
                {!epilogueBloomed && (
                  <span className="font-handwriting text-xs text-amber-800/80 mt-1">
                    Tócame una última vez 🌼
                  </span>
                )}
              </div>

              {epilogueBloomed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-1.5"
                >
                  {epilogueMessages.map((msg, i) => (
                    <p key={i} className="font-handwriting text-lg text-amber-900">
                      {msg}
                    </p>
                  ))}
                  <p className="font-serif text-base text-amber-950 font-medium pt-2">
                    {finalFarewell}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        <button
          onClick={onRestart}
          className="mt-1 inline-flex items-center gap-1.5 font-serif text-xs text-amber-900/40 hover:text-amber-900/80 transition-colors"
        >
          <RefreshCw size={12} />
          <span>Volver a recorrer el jardín</span>
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