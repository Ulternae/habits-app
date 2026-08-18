import { Habit, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

interface HabitCard {
  habit: Habit;
  onCompleted: ({ id }: { id: number }) => void;
}

const HabitCard = ({ habit, onCompleted }: HabitCard) => {
  const { title, streak, isCompleted, priority = "low" } = habit;

  const theme = useTheme();
  const priorityAppearance = theme.priority[priority];
  const completedLabelStyle = isCompleted ? styles.completedLabel : undefined;
  const labelThemeColor = isCompleted ? "textSecondary" : undefined;

  return (
    <Pressable
      onPress={() => onCompleted({ id: habit.id })}
      style={({ pressed }) => [
        styles.cardContainer,
        pressed && styles.cardPressed,
      ]}
    >
      <ThemedText themeColor={labelThemeColor} style={completedLabelStyle}>
        {title}
      </ThemedText>
      <View style={styles.cardDetails}>
        <View style={styles.streakGroup}>
          <ThemedText themeColor={labelThemeColor} style={completedLabelStyle}>
            {streak}
          </ThemedText>
          <SymbolView
            name={{
              ios: "flame.fill",
              android: "mode_heat",
              web: "mode_heat",
            }}
            tintColor={isCompleted ? theme.textSecondary : theme.warning}
            size={24}
          />
        </View>
        <View
          style={[
            styles.priorityBadge,
            {
              backgroundColor: priorityAppearance.background,
              borderColor: priorityAppearance.border,
            },
          ]}
        >
          <View
            style={[
              styles.priorityIndicator,
              { backgroundColor: priorityAppearance.indicator },
            ]}
          />
          <ThemedText
            style={[styles.priorityLabel, { color: priorityAppearance.text }]}
          >
            {priority}
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.three,
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  completedLabel: {
    textDecorationLine: "line-through",
  },
  cardDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
  streakGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  priorityBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.one,
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    width: 80,
  },
  priorityIndicator: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  priorityLabel: {
    textTransform: "uppercase",
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
});

export { HabitCard };
