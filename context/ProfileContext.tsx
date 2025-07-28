import React, { createContext, useContext, useState } from 'react';
import { TourChapter, allChapters } from '../constants/types';

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

    isChapterFinished: (ch) => 
      // only true if it’s really in our canonical list
      finished.includes(ch) && allChapters.includes(ch),

    markChapterFinished: (ch) =>
      setFinished((prev) => {
        // guard against duplicates
        if (!allChapters.includes(ch) || prev.includes(ch)) {
          return prev;
        }
        return [...prev, ch];
      }),

    areAllChaptersFinished: () => 
      // compare against the real number of chapters
      finished.filter((ch) => allChapters.includes(ch)).length ===
      allChapters.length,
  };

  return <ctx.Provider value={store}>{children}</ctx.Provider>;
}

export function useProfile() {
  const store = useContext(ctx);
  if (!store) throw new Error('Wrap your App in <ProfileProvider>');
  return store;
}
