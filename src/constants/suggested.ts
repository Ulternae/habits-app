type SuggestedHabit = {
  id: number;
  name: string;
  isPicked: boolean;
};

const SUGGESTED_HABITS: SuggestedHabit[] = [
  { id: 1, name: "Drink water", isPicked: false },
  { id: 2, name: "Meditate", isPicked: false },
  { id: 3, name: "Walk 10k steps", isPicked: false },
  { id: 4, name: "Study Physics", isPicked: false },
  { id: 5, name: "Workout", isPicked: false },
] as const;

export { SUGGESTED_HABITS };
export type { SuggestedHabit };
