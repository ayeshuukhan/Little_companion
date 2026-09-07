// storage.ts
//
// Small localStorage wrapper. This is a real standalone app (not a Claude
// artifact), so browser storage is the right tool here — it's what lets
// the person's name, voice, theme, and journal entries survive a reload.

import { Mood, ThemeId } from "../data/responses";

export interface Profile {
  onboarded: boolean;
  name: string;
  voiceURI: string | null;
  theme: ThemeId;
  soundEnabled: boolean;
}

export interface JournalEntry {
  id: string;
  text: string;
  createdAt: number;
}

const PROFILE_KEY = "companion:profile";
const journalKey = (mood: Mood) => `companion:journal:${mood}`;

export const defaultProfile: Profile = {
  onboarded: false,
  name: "",
  voiceURI: null,
  theme: "dusk",
  soundEnabled: true,
};

export function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return { ...defaultProfile };
    return { ...defaultProfile, ...(JSON.parse(raw) as Partial<Profile>) };
  } catch {
    return { ...defaultProfile };
  }
}

export function saveProfile(profile: Profile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    // Storage unavailable (private browsing, quota, etc.) — fail silently,
    // the app still works for the current session.
  }
}

export function loadJournal(mood: Mood): JournalEntry[] {
  try {
    const raw = localStorage.getItem(journalKey(mood));
    if (!raw) return [];
    return JSON.parse(raw) as JournalEntry[];
  } catch {
    return [];
  }
}

export function saveJournal(mood: Mood, entries: JournalEntry[]): void {
  try {
    localStorage.setItem(journalKey(mood), JSON.stringify(entries));
  } catch {
    // ignore
  }
}

export function addJournalEntry(mood: Mood, text: string): JournalEntry[] {
  const entries = loadJournal(mood);
  const entry: JournalEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text,
    createdAt: Date.now(),
  };
  const next = [entry, ...entries];
  saveJournal(mood, next);
  return next;
}

export function deleteJournalEntry(mood: Mood, id: string): JournalEntry[] {
  const next = loadJournal(mood).filter((e) => e.id !== id);
  saveJournal(mood, next);
  return next;
}
