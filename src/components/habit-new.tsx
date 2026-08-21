import type { Habit } from "@/constants/theme";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useHabitsStore } from "@/store/habits.store";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

const HabitNew = () => {
  const theme = useTheme();
  const [text, setText] = useState("");
  const addHabit = useHabitsStore((state) => state.addHabit);

  const canSubmit = text.trim().length > 0;

  const handleSubmit = () => {
    const title = text.trim();
    if (!title) return;

    const habit: Habit = {
      id: Date.now(),
      title,
      streak: 0,
      priority: "medium",
    };
    addHabit({ habit });
    setText("");
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Add a new habit"
        placeholderTextColor={theme.muted}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        selectionColor={theme.primary}
        underlineColorAndroid="transparent"
        style={[styles.input, { color: theme.text }]}
        accessibilityLabel="Habit name"
      />
      <Pressable
        onPress={handleSubmit}
        disabled={!canSubmit}
        accessibilityRole="button"
        accessibilityLabel="Add habit"
        style={({ pressed }) => [
          styles.submitButton,
          {
            backgroundColor: canSubmit ? theme.primary : theme.border,
          },
          pressed && canSubmit && styles.submitButtonPressed,
        ]}
      >
        <SymbolView
          name={{
            ios: "plus",
            android: "add",
            web: "add",
          }}
          tintColor={canSubmit ? theme.onPrimary : theme.muted}
          size={24}
        />
      </Pressable>
    </View>
  );
};

export { HabitNew };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    gap: Spacing.two,
    minHeight: 64,
    paddingLeft: Spacing.three,
    paddingRight: Spacing.one,
    paddingVertical: Spacing.one,
    borderWidth: 1,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: 0,
    paddingVertical: Spacing.one,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
  },
  submitButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
  },
  submitButtonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.96 }],
  },
});
