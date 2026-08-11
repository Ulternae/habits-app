import * as Device from "expo-device";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { HabitCard } from "@/components/habit-card";
import { HabitDate } from "@/components/habit-date";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";

function getDevMenuHint() {
  if (Platform.OS === "web") {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const name = 4;
  const isPremium = false;
  const totalMessages = 1;
  const date = new Date();
  const hour = date.getHours();
  const greeting =
    hour < 12 ? "Good day" : hour < 18 ? "Good afternoon" : "Good night";

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <ThemedText type="title" style={styles.title}>
            HABTS
          </ThemedText>
          <ThemedText>Your app for generate habits</ThemedText>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          Quick Cards
        </ThemedText>

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
}

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
