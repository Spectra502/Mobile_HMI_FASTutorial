import React, { createContext, useContext, useState } from 'react';
import { TourChapter } from '../constants/types';

interface ProfileStore {
  finishedChapters: TourChapter[];
  isChapterFinished(ch: TourChapter): boolean;
  markChapterFinished(ch: TourChapter): void;
  areAllChaptersFinished(): boolean;
  // …other methods you need
}

const ctx = createContext<ProfileStore | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [finished, setFinished] = useState<TourChapter[]>([]);

  const store: ProfileStore = {
    finishedChapters: finished,
    isChapterFinished: (ch) => finished.includes(ch),
    markChapterFinished: (ch) =>
      setFinished((fs) => fs.includes(ch) ? fs : [...fs, ch]),
    areAllChaptersFinished: () => finished.length === /* total count */ 4,
  };

  return <ctx.Provider value={store}>{children}</ctx.Provider>;
}

export function useProfile() {
  const store = useContext(ctx);
  if (!store) throw new Error('Wrap your App in <ProfileProvider>');
  return store;
}
