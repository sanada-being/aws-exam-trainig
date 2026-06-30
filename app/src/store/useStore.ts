import { create } from "zustand";
import { persist } from "zustand/middleware";
import { applyAnswer, type Records } from "../domain/progress";

interface State {
  records: Records;
  bookmarks: Record<string, true>;
  recordAnswer: (id: string, correct: boolean, at?: number) => void;
  toggleBookmark: (id: string) => void;
  resetProgress: () => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      records: {},
      bookmarks: {},
      recordAnswer: (id, correct, at = Date.now()) =>
        set((s) => ({
          records: { ...s.records, [id]: applyAnswer(s.records[id], correct, at) },
        })),
      toggleBookmark: (id) =>
        set((s) => {
          const next = { ...s.bookmarks };
          if (next[id]) delete next[id];
          else next[id] = true;
          return { bookmarks: next };
        }),
      resetProgress: () => set({ records: {}, bookmarks: {} }),
    }),
    { name: "saa-progress-v1", version: 1 },
  ),
);
