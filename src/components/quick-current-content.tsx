import { SuggestedHabit } from "@/constants/suggested";
import { Spacing } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

interface QuickCurrentContentProps {
  suggestedHabits: SuggestedHabit[];
}

const QuickCurrentContent = ({ suggestedHabits }: QuickCurrentContentProps) => {
  const currentHabits = suggestedHabits.filter((habit) => habit.isPicked);

  if (currentHabits.length === 0) {
    return (
      <ThemedText style={styles.emptyState}>No current habits.</ThemedText>
    );
  }

  return (
    <View style={styles.container}>
      {currentHabits.map((habit) => (
        <View key={habit.id} style={styles.item}>
          <ThemedText>{`● ${habit.name}`}</ThemedText>
        </View>
      ))}
    </View>
  );
};

export { QuickCurrentContent };

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
  },
  item: {
    paddingHorizontal: Spacing.two,
  },
  emptyState: {
    paddingVertical: Spacing.two,
  },
});
