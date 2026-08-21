import { FlatList, Platform, StyleSheet } from "react-native";
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
import { useTheme } from "@/hooks/use-theme";
import { loadHabits, saveHabits } from "@/storage/habits-storage";
import { useCallback, useEffect, useState } from "react";

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

interface HandleCompleted {
  id: number;
}

const HomeScreen = () => {
  const name = "Ulternae";
  const role = "Developer";
  const theme = useTheme();

  const insets = useSafeAreaInsets();
  const [habits, setHabits] = useState(DEFAULT_HABITS);
  const [isHydrated, setHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const hydrateHabits = async () => {
      try {
        const saveHabits = await loadHabits();

        if (!isMounted) return;

        if (saveHabits) {
          setHabits(saveHabits);
        }
      } catch {
        console.error("Error loading habits from storage");
      } finally {
        if (isMounted) {
          setHydrated(true);
        }
      }
    };

    hydrateHabits();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    saveHabits({ habits }).catch((error) => {
      console.error("Error saving habits to storage:", error);
    });
  }, [habits, isHydrated]);

  const handleSubmit = useCallback(({ habit }: HandleSubmit) => {
    setHabits((prev) => [...prev, habit]);
  }, []);

  const handleCompleted = useCallback(({ id }: HandleCompleted) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              isCompleted: !h.isCompleted,
              streak: h.isCompleted ? h.streak - 1 : h.streak + 1,
            }
          : h,
      ),
    );
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

        <ThemedView
          type="backgroundElement"
          style={[
            styles.stepContainer,
            {
              borderColor: theme.border,
            },
          ]}
        >
          <FlatList
            data={habits}
            keyExtractor={(habit) => String(habit.id)}
            renderItem={({ item: habit }) => (
              <HabitCard habit={habit} onCompleted={handleCompleted} />
            )}
            style={styles.habitsScroll}
            contentContainerStyle={styles.habitsContent}
            showsVerticalScrollIndicator={false}
          />
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
    flex: 1,
    minHeight: 0,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
    borderWidth: 1,
  },
  habitsScroll: {
    flex: 1,
    width: "100%",
  },
  habitsContent: {
    gap: Spacing.three,
    paddingBottom: Spacing.one,
  },
});
