import { SuggestedHabit } from "@/constants/suggested";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { FlatList, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

interface QuickAddContentProps {
  suggestedHabits: SuggestedHabit[];
}

const QuickAddContent = ({ suggestedHabits }: QuickAddContentProps) => {
  const theme = useTheme();

  const data = suggestedHabits.filter((s) => s.isPicked);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ThemedText>{`● ${item.name}`}</ThemedText>}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <ThemedText
            style={[styles.emptyState, { color: theme.textSecondary }]}
          >
            No selected habits
          </ThemedText>
        }
      />
    </View>
  );
};

export { QuickAddContent };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  emptyState: {
    justifyContent: "center",
    alignItems: "center",
  },
});
