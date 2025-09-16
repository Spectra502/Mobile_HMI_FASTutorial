// context/ProfileContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { TourChapter } from '../constants/types';

export interface Profile {
  id: string;
  profileCode: string;
  bookmarkedChapters: TourChapter[];
  finishedChapters: TourChapter[];
  hasSeenTutorialFinishedPopup: boolean;
  hasSeenQuizFinishedPopup: boolean;
}

export interface ProfileStore {
  profiles: Profile[];
  activeProfile: Profile | null;
  loadProfile: (code: string) => Promise<boolean>;
  createProfile: (code: string) => Promise<void>;
  toggleBookmark: (ch: TourChapter) => void;
  isBookmarked: (ch: TourChapter) => boolean;
  markChapterFinished: (ch: TourChapter) => void;
  isChapterFinished: (ch: TourChapter) => boolean;
  areAllChaptersFinished: () => boolean;
  markPopupAsSeen: (type: 'tutorial' | 'quiz') => void;
  resetProfiles: () => Promise<void>;
  deleteActiveProfile: () => Promise<void>;
}

const STORAGE_KEY = 'ProfileStore.profiles';
const CONTEXT_KEY  = 'ProfileStore.active';

const ProfileContext = createContext<ProfileStore | undefined>(undefined);

export const ProfileProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeProfile, setActiveProfile] = useState<Profile|null>(null);

  useEffect(() => {
    console.log('💾 [ProfileContext] profiles state is now:', profiles);
  }, [profiles]);

  const [loaded, setLoaded] = useState(false);

  // load on mount
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const storedProfiles: Profile[] = raw ? JSON.parse(raw) : [];
        console.log('🔄 [ProfileContext] loaded from storage:', storedProfiles);
        setProfiles(storedProfiles);
        // also load last active code
        const lastCode = await AsyncStorage.getItem(CONTEXT_KEY);
        if (lastCode) {
          const found = storedProfiles.find(p => p.profileCode === lastCode);
          if (found) setActiveProfile(found);
        }
      } catch { 
        /* ignore */ 
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (loaded && !activeProfile) {
      // create a quick “guest” profile
      const guestCode = 'guest_' + uuidv4().slice(0, 6);
      createProfile(guestCode).catch(console.warn);
    }
  }, [loaded, activeProfile]);

  // persist profiles whenever they change
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  }, [profiles]);

  // persist activeProfile code
  useEffect(() => {
    if (activeProfile) {
      AsyncStorage.setItem(CONTEXT_KEY, activeProfile.profileCode);
    }
  }, [activeProfile]);

  const upsert = (profile: Profile) => {
    setProfiles(ps => {
      const idx = ps.findIndex(p => p.id === profile.id);
      if (idx >= 0) {
        ps[idx] = profile;
        return [...ps];
      } else {
        return [...ps, profile];
      }
    });
    setActiveProfile(profile);
  };

  const loadProfile = async (code: string): Promise<boolean> => {
    console.log('🔍 loadProfile, looking for code:', code);
    console.log('📦 current profiles:', profiles);
    const found = profiles.find(p => p.profileCode === code);
    console.log('🔍   found? →', found);
    if (found) setActiveProfile(found);
    return !!found;
  };

  const createProfile = async (code: string) => {
    const cleanCode = code.trim();
    console.log('➕ createProfile with code:', cleanCode);
    console.log('📦 before create, profiles:', profiles);

    // Check if profile exists before creating
    if (profiles.some(p => p.profileCode === cleanCode)) {
      console.warn('⛔ profile exists, throwing error');
      throw new Error('Profile exists');
    }

    // Create the new Profile object with its actual properties
    const newProf: Profile = {
      id: uuidv4(), // Generate a unique ID for the new profile
      profileCode: cleanCode, // Use the cleaned code
      bookmarkedChapters: [],
      finishedChapters: [],
      hasSeenTutorialFinishedPopup: false,
      hasSeenQuizFinishedPopup: false,
    };

    upsert(newProf); // Add the new profile to collection/storage
    console.log('✅ profile created, now profiles:', [...profiles, newProf]);
  };

  const toggleBookmark = (ch: TourChapter) => {
    if (!activeProfile) return;
    const cur = { ...activeProfile };
    const idx = cur.bookmarkedChapters.indexOf(ch);
    if (idx >= 0) cur.bookmarkedChapters.splice(idx, 1);
    else cur.bookmarkedChapters.push(ch);
    upsert(cur);
  };
  const isBookmarked = (ch: TourChapter) =>
    activeProfile?.bookmarkedChapters.includes(ch) ?? false;

  const markChapterFinished = (ch: TourChapter) => {
    if (!activeProfile) return;
    if (!activeProfile.finishedChapters.includes(ch)) {
      const cur = { ...activeProfile };
      cur.finishedChapters.push(ch);
      upsert(cur);
    }
  };
  const isChapterFinished = (ch: TourChapter) =>
    activeProfile?.finishedChapters.includes(ch) ?? false;
  const areAllChaptersFinished = () => {
    if (!activeProfile) return false;
    return (Object.values(TourChapter) as TourChapter[]).every(ch =>
      activeProfile.finishedChapters.includes(ch)
    );
  };

  const markPopupAsSeen = (type: 'tutorial' | 'quiz') => {
    if (!activeProfile) return;
    const cur = { ...activeProfile };
    if (type === 'tutorial') cur.hasSeenTutorialFinishedPopup = true;
    else cur.hasSeenQuizFinishedPopup = true;
    upsert(cur);
  };

  // Don’t provide the context until loaded from storage
  if (!loaded) {
    return null; // or a splash / ActivityIndicator
  }

  const resetProfiles = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY)
    await AsyncStorage.removeItem(CONTEXT_KEY)
    setProfiles([])
    setActiveProfile(null)
  }

  const deleteActiveProfile = async () => {
    if (!activeProfile) return;

    const toDelete = activeProfile;
    const remaining = profiles.filter(p => p.id !== toDelete.id);

    // Persist remaining list
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));

    if (remaining.length > 0) {
      // Pick the first remaining as new active
      const next = remaining[0];
      await AsyncStorage.setItem(CONTEXT_KEY, next.profileCode);
      setProfiles(remaining);
      setActiveProfile(next);
    } else {
      // No profiles left → clear and create a fresh guest
      await AsyncStorage.removeItem(CONTEXT_KEY);
      setProfiles([]);
      setActiveProfile(null);
      const guestCode = 'guest_' + uuidv4().slice(0, 6);
      await createProfile(guestCode);
    }
  };


  return (
    <ProfileContext.Provider value={{
      profiles,
      activeProfile,
      loadProfile,
      createProfile,
      toggleBookmark,
      isBookmarked,
      markChapterFinished,
      isChapterFinished,
      areAllChaptersFinished,
      markPopupAsSeen,
      resetProfiles,
      deleteActiveProfile,
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('Wrap your App in <ProfileProvider>');
  return ctx;
}
