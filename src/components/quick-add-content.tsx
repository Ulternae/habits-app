import { SuggestedHabit } from "@/constants/suggested";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { FlatList, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";

interface QuickAddContentProps {
  suggestedHabits: SuggestedHabit[];
}

const QuickAddContent = ({ suggestedHabits }: QuickAddContentProps) => {
  const theme = useTheme();

  const data = suggestedHabits.filter((s) => s.isPicked);

  return (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ThemedText>{`● ${item.name}`}</ThemedText>}
      ListEmptyComponent={
        <ThemedText style={[styles.emptyState, { color: theme.textSecondary }]}>
          No selected habits
        </ThemedText>
      }
      contentContainerStyle={[
        styles.listContent,
        data.length === 0 && styles.emptyList,
      ]}
      showsVerticalScrollIndicator={false}
    />
  );
};

export { QuickAddContent };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
  listContent: {
    gap: Spacing.two,
    paddingBottom: Spacing.four,
  },
  emptyList: {
    paddingVertical: Spacing.four,
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  emptyState: {
    textAlign: "center",
  },
});
