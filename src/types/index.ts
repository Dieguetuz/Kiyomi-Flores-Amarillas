export type FlowerType = 'sunflower' | 'daisy' | 'wildflower' | 'tulip';

export interface FlowerItem {
  id: string;
  number: number;
  note: string;
  shortLabel: string;
  petalColor: string;
  centerColor: string;
  stemHeight: number;
  scale: number;
  rotation: number;
  swayDelay: number;
  position: {
    x: number; // 0 - 100 (%)
    y: number; // 0 - 100 (%)
  };
  type: FlowerType;
}

export type EasterEggType = 'mikey' | 'tigger' | 'luneta' | 'dark-romance' | 'chocolate';

export interface EasterEggItem {
  id: EasterEggType;
  title: string;
  badge: string;
  hint: string;
  messages: string[];
  accentColor: string;
  iconType: string;
  position: {
    x: number; // 0 - 100 (%)
    y: number; // 0 - 100 (%)
  };
}

export interface RecipientConfig {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  intro: {
    salutation: string;
    subtext: string;
    callToAction: string;
  };
  chapter1: {
    chapterTag: string;
    title: string;
    instruction: string;
    completedPrompt: string;
    flowers: FlowerItem[];
  };
  chapter2: {
    chapterTag: string;
    title: string;
    instruction: string;
    counterLabel: string;
    completedPrompt: string;
    easterEggs: EasterEggItem[];
  };
  chapter3: {
    chapterTag: string;
    title: string;
    subtitle: string;
    blockInstruction: string;
    pixelBadge: string;
    messages: string[];
  };
  chapter4: {
    chapterTag: string;
    bouquetTitle: string;
    staggeredLines: string[];
    highlightLine: string;
    signature: string;
    dateText: string;
    epiloguePrompt: string;
    epilogueMessages: string[];
    finalFarewell: string;
  };
  postcard: {
    header: string;
    forText: string;
    date: string;
    dedication: string;
    author: string;
  };
}
