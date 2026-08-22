import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { getUserAvatar } from "@/services/avatar.service";
import { useProfileStore } from "@/store/profile.store";
import { SymbolView } from "expo-symbols";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { SvgUri, SvgXml } from "react-native-svg";

const DEFAULT_AVATAR_URI = Image.resolveAssetSource(require("@/assets/avatar/avatar.svg")).uri;

const Avatar = () => {
  const avatar = useProfileStore((state) => state.avatar);
  const temporalAvatar = useProfileStore((state) => state.temporalAvatar);
  const theme = useTheme();
  const setTemporalAvatar = useProfileStore((state) => state.setTemporalAvatar);
  const currentAvatar = temporalAvatar || avatar;

  const handleChangeAvatar = async () => {
    const { avatarUrl } = await getUserAvatar();

    setTemporalAvatar({
      temporalAvatar: avatarUrl,
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, { borderColor: theme.text }]}>
        {currentAvatar ? (
          <SvgXml xml={currentAvatar} width="100%" height="100%" />
        ) : (
          <SvgUri uri={DEFAULT_AVATAR_URI} width="100%" height="100%" />
        )}

        <Pressable
          onPress={handleChangeAvatar}
          accessibilityRole="button"
          accessibilityLabel="Change avatar"
          style={() => [
            styles.changeButton,
            {
              backgroundColor: theme.primary,
              borderColor: theme.background,
            },
          ]}
        >
          <SymbolView
            name={{
              ios: "camera.fill",
              android: "photo_camera",
              web: "photo_camera",
            }}
            tintColor={theme.onPrimary}
            size={18}
          />
        </Pressable>
      </View>
    </View>
  );
};

export { Avatar };

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: Spacing.six,
  },

  imageContainer: {
    borderRadius: "100%",
    width: 130,
    height: 130,
    borderWidth: 2,
    position: "relative",
  },
  changeButton: {
    position: "absolute",
    right: -Spacing.two,
    bottom: -Spacing.two,
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
