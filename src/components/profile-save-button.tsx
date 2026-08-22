import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useProfileStore } from "@/store/profile.store";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

const ProfileSaveButton = () => {
  const theme = useTheme();
  const temporalAvatar = useProfileStore((state) => state.temporalAvatar);
  const setAvatar = useProfileStore((state) => state.setAvatar);
  const setTemporalAvatar = useProfileStore((state) => state.setTemporalAvatar);
  const hasUnsavedChanges = temporalAvatar !== null;

  if (!hasUnsavedChanges) return null;

  const handleSaveProfile = () => {
    if (temporalAvatar === null) return;

    setAvatar({
      avatar: temporalAvatar,
    });
  };

  const handleCancelProfile = () => {
    setTemporalAvatar({
      temporalAvatar: null,
    });
  };

  return (
    <View pointerEvents="box-none" style={[styles.container]}>
      <View style={styles.actions}>
        <Pressable
          onPress={handleCancelProfile}
          accessibilityRole="button"
          accessibilityLabel="Cancel profile changes"
          style={({ pressed }) => [
            styles.button,
            styles.cancelButton,
            { borderColor: theme.border, backgroundColor: theme.surface },
            pressed && styles.pressed,
          ]}
        >
          <ThemedText>Cancel</ThemedText>
        </Pressable>

        <Pressable
          onPress={handleSaveProfile}
          accessibilityRole="button"
          accessibilityLabel="Save profile changes"
          style={({ pressed }) => [styles.button, { backgroundColor: theme.primary }, pressed && styles.pressed]}
        >
          <SymbolView
            name={{
              ios: "checkmark",
              android: "check",
              web: "check",
            }}
            tintColor={theme.onPrimary}
            size={20}
          />
          <ThemedText style={{ color: theme.onPrimary }}>Save changes</ThemedText>
        </Pressable>
      </View>
    </View>
  );
};

export { ProfileSaveButton };

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: Spacing.four,
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: 999,
  },
  cancelButton: {
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.8,
  },
});
