import { StyleSheet, View } from "react-native";

import { useTheme } from "@/hooks/use-theme";
import { ThemedText } from "./themed-text";

const HabitDate = () => {
  const theme = useTheme();

  const date = new Date();

  return (
    <View style={styles.container}>
      <ThemedText style={{ color: theme.textSecondary }}>
        {date.toLocaleDateString()} - {date.toLocaleTimeString()}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "flex-end",
  },
});

export { HabitDate };
