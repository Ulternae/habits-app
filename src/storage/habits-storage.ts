import type { Habit } from "@/constants/theme";
import { storage } from "./storage";

const HABITS_KEY = "@habitsapp/habits";

const loadHabits = async (): Promise<Habit[] | null> => {
  const value = await storage.getItem(HABITS_KEY);

  if (!value) return null;

  try {
    const res = JSON.parse(value) as Habit[];
    return res;
  } catch (error) {
    console.error("Error parsing habits from storage:", error);
    return null;
  }
};

const saveHabits = async ({ habits }: { habits: Habit[] }): Promise<void> => {
  await storage.setItem(HABITS_KEY, JSON.stringify(habits));
};

const clearHabits = async (): Promise<void> => {
  await storage.removeItem(HABITS_KEY);
};

export { clearHabits, loadHabits, saveHabits };

