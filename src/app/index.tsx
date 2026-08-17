import { Platform, StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { HabitCard } from "@/components/habit-card";
import { HabitDate } from "@/components/habit-date";
import { HabitNew } from "@/components/habit-new";
import { ProfileHeader } from "@/components/profile-header";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import {
  BottomTabInset,
  Habit,
  MaxContentWidth,
  Spacing,
} from "@/constants/theme";
import { useCallback, useState } from "react";

const DEFAULT_HABITS: Habit[] = [
  { id: 1, title: "Drink water", streak: 1, isCompleted: true },
  { id: 2, title: "Meditate", streak: 4, priority: "high" },
  { id: 3, title: "Walk 10k steps", streak: 10, isCompleted: true },
  { id: 4, title: "Study Physics", streak: 10, priority: "low" },
  { id: 5, title: "Workout", streak: 10, priority: "medium" },
];

interface HandleSubmit {
  habit: Habit;
}

const HomeScreen = () => {
  const name = "Ulternae";
  const role = "Developer";

  const insets = useSafeAreaInsets();
  const [habits, setHabits] = useState(DEFAULT_HABITS);

  const handleSubmit = useCallback(({ habit }: HandleSubmit) => {
    setHabits((prev) => [...prev, habit]);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ProfileHeader
          name={name}
          role={role}
          style={{ marginTop: insets.top }}
        />
        <ThemedView style={styles.heroSection}>
          <ThemedText type="title" style={styles.title}>
            HABITS
          </ThemedText>
          <ThemedText>Your app for generate habits</ThemedText>
        </ThemedView>

        <HabitNew onSubmit={handleSubmit} />

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              id={habit.id}
              title={habit.title}
              streak={habit.streak}
              isCompleted={habit.isCompleted}
              priority={habit.priority}
            />
          ))}
        </ThemedView>

        {Platform.OS === "web" && <WebBadge />}
        <HabitDate />
      </SafeAreaView>
    </ThemedView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
