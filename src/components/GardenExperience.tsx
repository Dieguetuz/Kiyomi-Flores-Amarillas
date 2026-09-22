'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RecipientConfig } from '@/types';
import { PaperBackground } from '@/components/ui/PaperBackground';
import { ChapterProgress } from '@/components/ui/ChapterProgress';
import { IntroScene } from '@/components/chapters/IntroScene';
import { GardenChapter } from '@/components/chapters/GardenChapter';
import { MinecraftChapter } from '@/components/chapters/MinecraftChapter';
import { BouquetChapter } from '@/components/chapters/BouquetChapter';

interface GardenExperienceProps {
  config: RecipientConfig;
}

export const GardenExperience: React.FC<GardenExperienceProps> = ({ config }) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [maxUnlockedChapter, setMaxUnlockedChapter] = useState(0);

  const goToChapter = (chapterIndex: number) => {
    setCurrentChapter(chapterIndex);
    if (chapterIndex > maxUnlockedChapter) {
      setMaxUnlockedChapter(chapterIndex);
    }
  };

  const getActiveTheme = () => {
    if (currentChapter === 0) return 'dark';
    if (currentChapter === 2) return 'minecraft';
    if (currentChapter === 3) return 'bouquet';
    return 'light';
  };

  return (
    <PaperBackground theme={getActiveTheme()}>
      <ChapterProgress
        currentChapter={currentChapter}
        totalChapters={4}
        maxUnlockedChapter={maxUnlockedChapter}
        onChapterSelect={(ch) => setCurrentChapter(ch)}
      />

      <main className="relative flex-1 w-full flex flex-col justify-center overflow-x-hidden">
        <AnimatePresence mode="wait">
          {currentChapter === 0 && (
            <motion.div
              key="chapter-intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="w-full flex-1 flex flex-col justify-center"
            >
              <IntroScene
                salutation={config.intro.salutation}
                subtext={config.intro.subtext}
                callToAction={config.intro.callToAction}
                onComplete={() => goToChapter(1)}
              />
            </motion.div>
          )}

          {currentChapter === 1 && (
            <motion.div
              key="chapter-garden"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full flex-1 flex flex-col justify-center"
            >
              <GardenChapter
                chapterTag={config.chapter1.chapterTag}
                title={config.chapter1.title}
                instruction={config.chapter1.instruction}
                completedPrompt={config.chapter1.completedPrompt}
                flowers={config.chapter1.flowers}
                onComplete={() => goToChapter(2)}
              />
            </motion.div>
          )}

          {currentChapter === 2 && (
            <motion.div
              key="chapter-minecraft"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full flex-1 flex flex-col justify-center"
            >
              <MinecraftChapter
                chapterTag={config.chapter3.chapterTag}
                title={config.chapter3.title}
                subtitle={config.chapter3.subtitle}
                blockInstruction={config.chapter3.blockInstruction}
                pixelBadge={config.chapter3.pixelBadge}
                messages={config.chapter3.messages}
                onComplete={() => goToChapter(3)}
              />
            </motion.div>
          )}

          {currentChapter === 3 && (
            <motion.div
              key="chapter-bouquet"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="w-full flex-1 flex flex-col justify-center"
            >
              <BouquetChapter
                recipientName={config.name}
                chapterTag={config.chapter4.chapterTag}
                bouquetTitle={config.chapter4.bouquetTitle}
                staggeredLines={config.chapter4.staggeredLines}
                highlightLine={config.chapter4.highlightLine}
                signature={config.chapter4.signature}
                dateText={config.chapter4.dateText}
                epiloguePrompt={config.chapter4.epiloguePrompt}
                epilogueMessages={config.chapter4.epilogueMessages}
                finalFarewell={config.chapter4.finalFarewell}
                onRestart={() => goToChapter(0)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </PaperBackground>
  );
};