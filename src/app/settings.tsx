import { SymbolView } from "expo-symbols";
import type { ComponentProps } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

type SymbolName = ComponentProps<typeof SymbolView>["name"];

type SettingRowProps = {
  icon: SymbolName;
  label: string;
  description: string;
  value: string;
};

function SettingRow({
  icon,
  label,
  description,
  value,
}: SettingRowProps) {
  const theme = useTheme();

  return (
    <Pressable
      disabled
      accessibilityRole="button"
      accessibilityState={{ disabled: true }}
      style={[styles.settingRow, { borderBottomColor: theme.border }]}
    >
      <View
        style={[
          styles.settingIcon,
          { backgroundColor: theme.backgroundSelected },
        ]}
      >
        <SymbolView name={icon} tintColor={theme.primary} size={19} />
      </View>

      <View style={styles.settingCopy}>
        <ThemedText style={styles.settingLabel}>{label}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {description}
        </ThemedText>
      </View>

      <View style={styles.settingMeta}>
        <ThemedText type="small" themeColor="muted">
          {value}
        </ThemedText>
        <SymbolView
          name={{ ios: "chevron.right", android: "chevron_right", web: "chevron_right" }}
          tintColor={theme.muted}
          size={16}
        />
      </View>
    </Pressable>
  );
}

const SettingsScreen = () => {
  const theme = useTheme();

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.header}>
            <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
              <ThemedText style={[styles.avatarText, { color: theme.onPrimary }]}>
                U
              </ThemedText>
            </View>

            <View style={styles.headerCopy}>
              <ThemedText type="subtitle">Settings</ThemedText>
              <ThemedText themeColor="textSecondary">
                Personalize your habits experience.
              </ThemedText>
            </View>
          </View>

          <ThemedView
            type="backgroundElement"
            style={[styles.profileCard, { borderColor: theme.border }]}
          >
            <View style={styles.profileCopy}>
              <ThemedText type="smallBold" themeColor="muted">
                YOUR PROFILE
              </ThemedText>
              <ThemedText style={styles.profileName}>Ulternae</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Developer · 5 active habits
              </ThemedText>
            </View>

            <ThemedText
              type="smallBold"
              style={[styles.previewBadge, { color: theme.primary }]}
            >
              PREVIEW
            </ThemedText>
          </ThemedView>

          <View style={styles.section}>
            <ThemedText type="smallBold" themeColor="muted">
              PREFERENCES
            </ThemedText>
            <ThemedView
              type="backgroundElement"
              style={[styles.settingsGroup, { borderColor: theme.border }]}
            >
              <SettingRow
                icon={{ ios: "paintbrush", android: "palette", web: "palette" }}
                label="Appearance"
                description="Choose light, dark, or system theme"
                value="System"
              />
              <SettingRow
                icon={{ ios: "bell", android: "notifications", web: "notifications" }}
                label="Notifications"
                description="Plan reminders for your daily habits"
                value="Soon"
              />
              <SettingRow
                icon={{ ios: "calendar", android: "calendar_month", web: "calendar_month" }}
                label="Week starts on"
                description="Set the first day of your habit week"
                value="Monday"
              />
            </ThemedView>
          </View>

          <View style={styles.section}>
            <ThemedText type="smallBold" themeColor="muted">
              APP
            </ThemedText>
            <ThemedView
              type="backgroundElement"
              style={[styles.settingsGroup, { borderColor: theme.border }]}
            >
              <SettingRow
                icon={{ ios: "lock.shield", android: "lock", web: "lock" }}
                label="Data & privacy"
                description="Your habits are stored locally for now"
                value="Local"
              />
              <SettingRow
                icon={{ ios: "info.circle", android: "info", web: "info" }}
                label="About Habits"
                description="Version 1.0 · More details coming soon"
                value="Soon"
              />
            </ThemedView>
          </View>

          <ThemedText type="small" themeColor="muted" style={styles.footerNote}>
            Settings are a visual preview. Controls will be enabled in a future update.
          </ThemedText>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    paddingBottom: BottomTabInset + Spacing.three,
  },
  content: {
    gap: Spacing.four,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
    paddingBottom: Spacing.five,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
  },
  headerCopy: {
    flex: 1,
    gap: Spacing.one,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.four,
    borderWidth: 1,
  },
  profileCopy: {
    flex: 1,
    gap: Spacing.one,
  },
  profileName: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "700",
  },
  previewBadge: {
    letterSpacing: 0.8,
  },
  section: {
    gap: Spacing.two,
  },
  settingsGroup: {
    borderRadius: Spacing.four,
    borderWidth: 1,
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
    minHeight: 76,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderBottomWidth: 1,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  settingCopy: {
    flex: 1,
    gap: Spacing.half,
  },
  settingLabel: {
    fontWeight: "700",
  },
  settingMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.half,
  },
  footerNote: {
    textAlign: "center",
    paddingHorizontal: Spacing.three,
  },
});

export default SettingsScreen;
