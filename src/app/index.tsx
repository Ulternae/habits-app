import { HabitCard } from "@/components/habit-card";
import { HabitDate } from "@/components/habit-date";
import { HabitNew } from "@/components/habit-new";
import { ProfileHeader } from "@/components/profile-header";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useHabitsStore } from "@/store/habits.store";
import { SymbolView } from "expo-symbols";
import { useEffect, useRef } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import { Confetti, type ConfettiMethods } from "react-native-fast-confetti";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const HomeScreen = () => {
  const name = "Ulternae";
  const role = "Developer";
  const theme = useTheme();

  const insets = useSafeAreaInsets();
  const habits = useHabitsStore((state) => state.habits);
  const confettiRef = useRef<ConfettiMethods>(null);
  const hasUserInteractedRef = useRef(false);

  const allHabitsCompleted =
    habits.length > 0 && habits.every((habit) => habit.isCompleted === true);
  const wasAllHabitsCompletedRef = useRef(allHabitsCompleted);

  useEffect(() => {
    if (
      hasUserInteractedRef.current &&
      allHabitsCompleted &&
      !wasAllHabitsCompletedRef.current
    ) {
      requestAnimationFrame(() => confettiRef.current?.restart());
    }
    wasAllHabitsCompletedRef.current = allHabitsCompleted;
  }, [allHabitsCompleted]);

  const handleHabitToggle = () => {
    hasUserInteractedRef.current = true;
  };

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

        <HabitNew />

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
              <HabitCard habit={habit} onToggle={handleHabitToggle} />
            )}
            style={styles.habitsScroll}
            contentContainerStyle={[
              styles.habitsContent,
              habits.length === 0 && styles.habitsEmptyContent,
            ]}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <SymbolView
                  name={{
                    ios: "checkmark.circle",
                    android: "check_circle",
                    web: "check_circle",
                  }}
                  tintColor={theme.primary}
                  size={36}
                />
                <ThemedText type="subtitle" style={styles.emptyTitle}>
                  No habits yet
                </ThemedText>
                <ThemedText
                  themeColor="textSecondary"
                  style={styles.emptyDescription}
                >
                  Add your first habit above to start building your routine.
                </ThemedText>
              </View>
            }
          />
        </ThemedView>

        {Platform.OS === "web" && <WebBadge />}
        <HabitDate />
      </SafeAreaView>

      {Platform.OS !== "web" && (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <Confetti
            ref={confettiRef}
            autoplay={false}
            count={160}
            fadeOutOnEnd
            reduceMotion="system"
            colors={[theme.primary, theme.success, theme.warning, theme.tint]}
            containerStyle={StyleSheet.absoluteFill}
          >
            <Confetti.Flake size={8} radius={3} />
            <Confetti.Flake width={8} height={14} radius={4} />
          </Confetti>
        </View>
      )}
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
  habitsEmptyContent: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
  },
  emptyTitle: {
    fontSize: 24,
    lineHeight: 30,
    textAlign: "center",
  },
  emptyDescription: {
    maxWidth: 280,
    textAlign: "center",
  },
});
