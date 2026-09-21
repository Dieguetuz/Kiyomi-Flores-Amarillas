'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sounds } from '@/utils/sound';
import { Volume2, VolumeX } from 'lucide-react';

interface ChapterProgressProps {
  currentChapter: number;
  totalChapters?: number;
  onChapterSelect?: (chapter: number) => void;
  maxUnlockedChapter?: number;
}

export const ChapterProgress: React.FC<ChapterProgressProps> = ({
  currentChapter,
  totalChapters = 5,
  onChapterSelect,
  maxUnlockedChapter = 0,
}) => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(sounds.getMuted());
  }, []);

  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sounds.playBloom(0);
    }
  };

  if (currentChapter === 0) {
    return (
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={handleToggleSound}
          aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
          className="rounded-full bg-charcoal-dark/20 p-2 text-amber-200/60 backdrop-blur-sm transition-colors hover:text-amber-200"
        >
          {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
      </div>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 pointer-events-none">
      <nav aria-label="Progreso de la historia" className="flex items-center gap-2.5 pointer-events-auto">
        {Array.from({ length: totalChapters }).map((_, idx) => {
          const isPassed = idx < currentChapter;
          const isCurrent = idx === currentChapter;
          const isUnlocked = idx <= maxUnlockedChapter;

          return (
            <button
              key={`progress-step-${idx}`}
              disabled={!isUnlocked}
              onClick={() => onChapterSelect && isUnlocked && onChapterSelect(idx)}
              aria-label={`Capítulo ${idx + 1}`}
              className={`group relative flex items-center justify-center transition-all ${
                isUnlocked ? 'cursor-pointer' : 'cursor-default opacity-40'
              }`}
            >
              {isPassed || isCurrent ? (
                <motion.span
                  initial={{ scale: 0.6, rotate: -20 }}
                  animate={{
                    scale: isCurrent ? 1.25 : 1,
                    rotate: isCurrent ? [0, 8, -8, 0] : 0,
                  }}
                  transition={{
                    scale: { duration: 0.3 },
                    rotate: { repeat: isCurrent ? Infinity : 0, duration: 4, ease: 'easeInOut' },
                  }}
                  className="text-base leading-none select-none drop-shadow-sm filter"
                >
                  🌼
                </motion.span>
              ) : (
                <span
                  className="h-2 w-2 rounded-full border border-amber-800/30 bg-amber-900/10 transition-colors group-hover:border-amber-700/60"
                />
              )}
            </button>
          );
        })}
      </nav>

      <button
        onClick={handleToggleSound}
        aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
        className="pointer-events-auto rounded-full bg-amber-900/10 p-2 text-amber-900/60 backdrop-blur-sm transition-all hover:bg-amber-900/20 hover:text-amber-900"
      >
        {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
      </button>
    </header>
  );
};