import { Platform, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { QuickAddChips } from "@/components/quick-add-chips";
import { QuickAddContent } from "@/components/quick-add-content";
import { QuickCurrentContent } from "@/components/quick-current-content";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { SUGGESTED_HABITS, SuggestedHabit } from "@/constants/suggested";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useHabitsStore } from "@/store/habits.store";
import { useEffect, useMemo, useState } from "react";

const ExploreScreen = () => {
  const currentHabits = useHabitsStore((state) => state.habits);
  const addHabit = useHabitsStore((state) => state.addHabit);
  const removeHabit = useHabitsStore((state) => state.removeHabit);

  const currentHabitNames = useMemo(
    () =>
      new Set(
        currentHabits.map((habit) => habit.title.trim().toLowerCase()),
      ),
    [currentHabits],
  );

  const habitsPickedCurrent = useMemo(() => {
    return SUGGESTED_HABITS.map((habit) => ({
      ...habit,
      isPicked: currentHabitNames.has(habit.name.trim().toLowerCase()),
    }));
  }, [currentHabitNames]);

  const [habitsPicked, setHabitsPicked] =
    useState<SuggestedHabit[]>(SUGGESTED_HABITS);
  const [hasEditedSuggestions, setHasEditedSuggestions] = useState(false);

  useEffect(() => {
    if (!hasEditedSuggestions) {
      setHabitsPicked(habitsPickedCurrent);
    }
  }, [habitsPickedCurrent, hasEditedSuggestions]);

  const togglePick = ({ id }: Pick<SuggestedHabit, "id">) => {
    setHasEditedSuggestions(true);
    setHabitsPicked((prev) =>
      prev.map((h) => (h.id === id ? { ...h, isPicked: !h.isPicked } : h)),
    );
  };

  const pendingChanges = useMemo(() => {
    if (!hasEditedSuggestions) {
      return { additions: [], removals: [] };
    }

    const pickedByName = new Map(
      habitsPicked.map((habit) => [habit.name.trim().toLowerCase(), habit]),
    );

    return {
      additions: habitsPicked.filter(
        (habit) =>
          habit.isPicked &&
          !currentHabitNames.has(habit.name.trim().toLowerCase()),
      ),
      removals: currentHabits.filter((habit) => {
        const suggestion = pickedByName.get(habit.title.trim().toLowerCase());
        return suggestion && !suggestion.isPicked;
      }),
    };
  }, [currentHabitNames, currentHabits, habitsPicked, hasEditedSuggestions]);

  const pendingChangesCount =
    pendingChanges.additions.length + pendingChanges.removals.length;

  const handleUpdate = () => {
    const timestamp = Date.now();

    pendingChanges.removals.forEach((habit) => {
      removeHabit({ id: habit.id });
    });

    pendingChanges.additions.forEach((suggestion, index) => {
      addHabit({
        habit: {
          id: timestamp + index,
          title: suggestion.name,
          streak: 0,
          priority: "medium",
        },
      });
    });

    setHasEditedSuggestions(false);
  };

  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    ios: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ThemedView style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.container, contentPlatformStyle]}
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Explore</ThemedText>
          <ThemedText style={styles.centerText} themeColor="textSecondary">
            See what is already part of your routine and what you can add next.
          </ThemedText>
        </ThemedView>

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="muted">
            CURRENT HABITS
          </ThemedText>
          <QuickCurrentContent suggestedHabits={habitsPickedCurrent} />
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="muted">
            SUGGESTED HABITS
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Choose which suggested habits should belong to your routine.
          </ThemedText>
        </View>

        <QuickAddChips
          suggestedHabits={habitsPicked}
          onTogglePick={togglePick}
        />
        <QuickAddContent suggestedHabits={habitsPicked} />

        {pendingChangesCount > 0 && (
          <Pressable
            onPress={handleUpdate}
            accessibilityRole="button"
            accessibilityLabel="Update habits"
            style={({ pressed }) => [
              styles.updateButton,
              { backgroundColor: theme.primary },
              pressed && styles.updateButtonPressed,
            ]}
          >
            <ThemedText type="smallBold" style={{ color: theme.onPrimary }}>
              Update habits ({pendingChangesCount})
            </ThemedText>
          </Pressable>
        )}
      </ScrollView>
    </ThemedView>
  );
};

export default ExploreScreen;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    gap: Spacing.four,
  },
  titleContainer: {
    gap: Spacing.three,
    alignItems: "center",
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.six,
    paddingBottom: Spacing.three,
  },
  centerText: {
    textAlign: "center",
  },
  section: {
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
  },
  divider: {
    height: 1,
    marginHorizontal: Spacing.four,
  },
  updateButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    marginHorizontal: Spacing.four,
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
  updateButtonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
});
