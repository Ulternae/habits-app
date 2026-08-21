import { SuggestedHabit } from "@/constants/suggested";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

interface QuickAddContentProps {
  suggestedHabits: SuggestedHabit[];
}

const QuickAddContent = ({ suggestedHabits }: QuickAddContentProps) => {
  const theme = useTheme();

  const data = suggestedHabits.filter((habit) => habit.isPicked);

  if (data.length === 0) {
    return (
      <ThemedText type="small" themeColor="textSecondary">
        No new habits selected.
      </ThemedText>
    );
  }

  return (
    <View style={styles.container}>
      {data.map((habit) => (
        <View key={habit.id} style={styles.item}>
          <View style={[styles.dot, { backgroundColor: theme.primary }]} />
          <ThemedText>{habit.name}</ThemedText>
        </View>
      ))}
    </View>
  );
};

export { QuickAddContent };

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
