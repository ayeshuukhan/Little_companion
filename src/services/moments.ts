// moments.ts
//
// Logs every happy/sad reaction (what the user wrote + what the
// companion said back) to localStorage, so the "Your Moments"
// dashboard has something to show. Separate from the existing
// Golden Moments / Let It Out journal storage in storage.ts — a
// moment here can later be "saved" into that journal too.

import { Mood } from "../data/responses";

export interface Moment {
  id: string;
  mood: Mood;
  query: string;
  spoken: string;
  written: string;
  createdAt: number;
  journaled: boolean;
}

const KEY = "companion:moments";

export function loadMoments(): Moment[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Moment[];
  } catch {
    return [];
  }
}

function saveMoments(moments: Moment[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(moments));
  } catch {
    // ignore — storage unavailable
  }
}

export function addMoment(mood: Mood, query: string, spoken: string, written: string): Moment[] {
  const moment: Moment = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    mood,
    query,
    spoken,
    written,
    createdAt: Date.now(),
    journaled: false,
  };
  const next = [moment, ...loadMoments()];
  saveMoments(next);
  return next;
}

export function markMomentJournaled(id: string): Moment[] {
  const next = loadMoments().map((m) => (m.id === id ? { ...m, journaled: true } : m));
  saveMoments(next);
  return next;
}

export function deleteMoment(id: string): Moment[] {
  const next = loadMoments().filter((m) => m.id !== id);
  saveMoments(next);
  return next;
}