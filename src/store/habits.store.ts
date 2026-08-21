import type { Habit } from "@/constants/theme";
import { storage } from "@/storage/storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type HabitsStore = {
  habits: Habit[];
  addHabit: ({ habit }: { habit: Habit }) => void;
  toggleHabit: ({ id }: { id: number }) => void;
  removeHabit: ({ id }: { id: number }) => void;
  removeAllHabits: () => void;
};

export const useHabitsStore = create<HabitsStore>()(
  persist(
    immer((set) => ({
      habits: [],

      addHabit: ({ habit }) =>
        set((state) => {
          state.habits.push(habit);
        }),

      toggleHabit: ({ id }) =>
        set((state) => {
          const habit = state.habits.find((h) => h.id === id);

          if (!habit) return;

          habit.isCompleted = !habit.isCompleted;
          habit.streak = habit.isCompleted
            ? habit.streak + 1
            : habit.streak - 1;
        }),

      removeHabit: ({ id }) =>
        set((state) => {
          const idx = state.habits.findIndex((h) => h.id === id);
          if (idx !== -1) {
            state.habits.splice(idx, 1);
          }
        }),

      removeAllHabits: () =>
        set((state) => {
          state.habits = [];
        }),
    })),
    {
      name: "@habitsapp/habits-store",
      storage: createJSONStorage(() => storage),
      partialize: (state) => ({ habits: state.habits }),
    },
  ),
);
