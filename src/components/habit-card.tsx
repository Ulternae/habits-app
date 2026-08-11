import { SymbolView } from "expo-symbols";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

type Props = {
  title: string;
  streak: number;
  isCompleted?: boolean;
};
const HabitCard = ({ title, streak, isCompleted }: Props) => {
  return (
    <View style={styles.card}>
      <ThemedText
        themeColor={isCompleted ? "textSecondary" : undefined}
        style={isCompleted ? styles.completedText : undefined}
      >
        {title}
      </ThemedText>
      <View style={styles.row}>
        <ThemedText
          themeColor={isCompleted ? "textSecondary" : undefined}
          style={isCompleted ? styles.completedText : undefined}
        >
          {streak}
        </ThemedText>
        <SymbolView
          name={{
            ios: "flame.fill",
            android: "mode_heat",
            web: "mode_heat",
          }}
          tintColor="#FF6B35"
          size={28}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardCompleted: {},
  completedText: {
    textDecorationLine: "line-through",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    color: "#FF6B35",
  },
});

export { HabitCard };
