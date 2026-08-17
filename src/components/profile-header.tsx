import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { ThemedText } from "./themed-text";

type Props = {
  name: string;
  role: string;
  style?: StyleProp<ViewStyle>;
};

const ProfileHeader = ({ name, role, style }: Props) => {
  const theme = useTheme();
  const initials =
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("") || "?";

  return (
    <View
      accessible
      accessibilityRole="header"
      accessibilityLabel={`${name}, ${role}`}
      style={[
        styles.headerContainer,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
        style,
      ]}
    >
      <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
        <ThemedText style={[styles.avatarLabel, { color: theme.onPrimary }]}>
          {initials}
        </ThemedText>
      </View>

      <View style={styles.identityBlock}>
        <ThemedText numberOfLines={1} style={styles.nameLabel}>
          {name}
        </ThemedText>
        <ThemedText
          type="small"
          themeColor="muted"
          numberOfLines={1}
          style={styles.nameSublabel}
        >
          {role}
        </ThemedText>
      </View>
    </View>
  );
};

export { ProfileHeader };

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
    paddingRight: Spacing.four,
    borderWidth: 1,
    borderRadius: 999,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLabel: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  identityBlock: {
    flexShrink: 1,
  },
  nameLabel: {
    fontSize: 18,
    lineHeight: 16,
    fontWeight: "700",
  },
  nameSublabel: {
    lineHeight: 16,
  },
});
