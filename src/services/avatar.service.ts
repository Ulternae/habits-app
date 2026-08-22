type AvatarResponse = {
  avatarUrl: string | null;
};

const getUserAvatar = async (): Promise<AvatarResponse> => {
  const seed = Math.floor(Math.random() * 1000000);

  const response = await fetch(
    `https://api.dicebear.com/10.x/lorelei/svg?seed=${seed}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch avatar");
  }

  const data = await response.text();
  return { avatarUrl: data };
};

export { getUserAvatar };
export type { AvatarResponse };

