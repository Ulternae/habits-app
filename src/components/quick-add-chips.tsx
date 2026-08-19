import { SuggestedHabit } from "@/constants/suggested";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

interface QuickAddChipsProps {
  onTogglePick: ({ id }: Pick<SuggestedHabit, "id">) => void;
  suggestedHabits: SuggestedHabit[];
}

const QuickAddChips = ({
  onTogglePick,
  suggestedHabits,
}: QuickAddChipsProps) => {
  const theme = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {suggestedHabits.map((habit) => (
        <View
          key={habit.id}
          style={habit.isPicked ? styles.shadowContainer : undefined}
        >
          <View style={styles.rippleContainer}>
            <Pressable
              onPress={() => onTogglePick({ id: habit.id })}
              accessibilityRole="button"
              accessibilityState={{
                selected: habit.isPicked,
              }}
              android_ripple={{
                color: habit.isPicked ? theme.primary : theme.border,
                borderless: false,
              }}
              style={({ pressed }) => [
                styles.item,
                {
                  backgroundColor: habit.isPicked
                    ? theme.backgroundSelected
                    : theme.surface,
                  borderColor: habit.isPicked ? theme.primary : theme.border,
                },
                pressed && styles.itemPressed,
              ]}
            >
              <ThemedText
                style={habit.isPicked ? styles.activeLabel : undefined}
              >
                {habit.name}
              </ThemedText>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },

  shadowContainer: {
    borderRadius: Spacing.four,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,

    elevation: 1,
  },

  rippleContainer: {
    borderRadius: Spacing.four,
    overflow: "hidden",
  },

  item: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,

    borderRadius: Spacing.four,
    borderWidth: 1,
  },

  itemPressed: {
    opacity: 0.82,
  },

  activeLabel: {
    fontWeight: "700",
  },
});

export { QuickAddChips };
