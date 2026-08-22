import { storage } from "@/storage/storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type ProfileStore = {
  avatar: string | null;
  temporalAvatar: string | null;
  setAvatar: ({ avatar }: { avatar: string | null }) => void;
  setTemporalAvatar: ({ temporalAvatar }: { temporalAvatar: string | null }) => void;
  clearAll: () => void;
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    immer((set) => ({
      avatar: null,
      temporalAvatar: null,

      setAvatar: ({ avatar }) =>
        set((state) => {
          state.avatar = avatar;
          state.temporalAvatar = null;
        }),

      setTemporalAvatar: ({ temporalAvatar }) =>
        set((state) => {
          state.temporalAvatar = temporalAvatar;
        }),

      clearAll: () =>
        set((state) => {
          state.avatar = null;
          state.temporalAvatar = null;
        }),
    })),
    {
      name: "@habitsapp/profile-store",
      storage: createJSONStorage(() => storage),
      partialize: (state) => ({ avatar: state.avatar }),
    },
  ),
);
