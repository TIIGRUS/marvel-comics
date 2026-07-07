import { User } from "../types";

const serializeUser = (user: Record<string, unknown> | null): User | null => {
  if (!user) return null;

  const userMetadata = (user.user_metadata as Record<string, unknown>) || {};
  const rawFavorites = (user.favorites as Record<string, unknown>) || {};

  return {
    id: user.id as string,
    email: (user.email as string) || "",
    user_name:
      (user.user_name as string) || (userMetadata.user_name as string) || "",
    first_name:
      (user.first_name as string | null) ||
      (userMetadata.first_name as string) ||
      undefined,
    last_name:
      (user.last_name as string | null) ||
      (userMetadata.last_name as string) ||
      undefined,
    age: (user.age as number | null) || (userMetadata.age as number) || undefined,
    avatar_url: (user.avatar_url as string | null) || undefined,
    created_at: (user.created_at as string) || new Date().toISOString(),
    favorites: {
      characters: Array.isArray(rawFavorites.characters) ? rawFavorites.characters : [],
      comics: Array.isArray(rawFavorites.comics) ? rawFavorites.comics : [],
      quotes: Array.isArray(rawFavorites.quotes) ? rawFavorites.quotes : [],
    },
  };
};

export default serializeUser;
