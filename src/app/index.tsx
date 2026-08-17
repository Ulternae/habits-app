import { Platform, Pressable, StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { HabitCard } from "@/components/habit-card";
import { HabitDate } from "@/components/habit-date";
import { ProfileHeader } from "@/components/profile-header";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useState } from "react";

const HomeScreen = () => {
  const [click, setClick] = useState(0);
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(true);

  const name = "Ulternae";
  const role = "Developer";

  const insets = useSafeAreaInsets();

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
            HABITS {click}
          </ThemedText>
          <ThemedText>Your app for generate habits</ThemedText>
        </ThemedView>

        <Pressable onPress={() => setClick((p) => p + 1)}>
          <ThemedText type="code" style={styles.code}>
            Quick Cards
          </ThemedText>
        </Pressable>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <HabitCard title="Drink water" streak={1} isCompleted={true} />
          <HabitCard title="Meditate" streak={4} priority="high" />
          <HabitCard title="Walk 10k steps" streak={10} isCompleted={true} />
          <HabitCard title="Study Physics" streak={10} priority="low" />
          <HabitCard title="Workout" streak={10} priority="medium" />
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
