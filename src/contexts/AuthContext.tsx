import React, { createContext, useState, useEffect, ReactNode } from "react";
import userApi, { RegisterData, LoginData, UserProfile } from "../api/user";
import type {
  UserProfileUpdates,
  FavoriteCharacter,
  FavoriteComic,
  FavoriteQuote,
} from "../types";
import { supabase } from "../utils/supabase";

export interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: UserProfileUpdates) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
  toggleFavorite: (
    type: "characters" | "comics" | "quotes",
    item: FavoriteCharacter | FavoriteComic | FavoriteQuote,
  ) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Инициализируем пользователя при загрузке приложения
  useEffect(() => {
    const initUser = async () => {
      try {
        const currentUser = await userApi.getCurrentUser();
        setUser(currentUser);
        setLoading(false);
      } catch (err) {
        console.error("Failed to initialize user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, []);

  // Слушаем изменения состояния аутентификации
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && session.user) {
        void userApi
          .getCurrentUser()
          .then(setUser)
          .catch((err) => {
            console.error("Failed to fetch user on auth change:", err);
            setUser(null);
          });
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const register = async (data: RegisterData) => {
    try {
      setError(null);
      const newUser = await userApi.register(data);
      setUser(newUser);
    } catch (err) {
      const error = err as Error | { message: string };
      const errorMessage =
        "message" in error ? error.message : "Registration failed";
      setError(errorMessage);
      throw err;
    }
  };

  const login = async (data: LoginData) => {
    try {
      setError(null);
      const result = await userApi.login(data);
      setUser(result.user);
    } catch (err) {
      const error = err as Error | { message: string };
      const errorMessage = "message" in error ? error.message : "Login failed";
      setError(errorMessage);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await userApi.logout();
      setUser(null);
    } catch (err) {
      const error = err as Error | { message: string };
      const errorMessage = "message" in error ? error.message : "Logout failed";
      setError(errorMessage);
      throw err;
    }
  };

  const updateProfile = async (updates: UserProfileUpdates) => {
    if (!user) {
      throw new Error("Cannot update profile without authenticated user");
    }

    try {
      setError(null);
      const updatedUser = await userApi.updateUserProfile(user.id, updates);

      if (!updatedUser) {
        throw new Error("Profile update failed");
      }

      setUser(updatedUser);
    } catch (err) {
      const error = err as Error | { message: string };
      const errorMessage =
        "message" in error ? error.message : "Profile update failed";
      setError(errorMessage);
      throw err;
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user) {
      throw new Error("Cannot upload avatar without authenticated user");
    }

    try {
      setError(null);
      const updatedUser = await userApi.uploadAvatar(
        user.id,
        file,
        user.avatar_url,
      );

      setUser(updatedUser);
    } catch (err) {
      const error = err as Error | { message: string };
      const errorMessage =
        "message" in error ? error.message : "Avatar upload failed";
      setError(errorMessage);
      throw err;
    }
  };

  const toggleFavorite = async (
    type: "characters" | "comics" | "quotes",
    item: FavoriteCharacter | FavoriteComic | FavoriteQuote,
  ) => {
    if (!user) {
      throw new Error("Cannot toggle favorite without authenticated user");
    }

    // Задаем базовую структуру, если favorites отсутствует
    const currentFavorites = user.favorites || {
      characters: [],
      comics: [],
      quotes: [],
    };

    // 1. Динамически получаем нужный массив по ключу (type)
    // TypeScript может ругаться на strict-типы внутри массива, поэтому используем any[] для гибкости логики
    const targetList = currentFavorites[type] as any[];

    // 2. Проверяем наличие элемента (логика едина для всех типов, так как у всех есть .id)
    const exists = targetList.some((element) => element.id === item.id);

    // 3. Формируем обновленный список (удаляем или добавляем)
    const updatedList = exists
      ? targetList.filter((element) => element.id !== item.id)
      : [...targetList, item];

    // 4. Сохраняем обновленный объект в профиль
    await updateProfile({
      favorites: {
        ...currentFavorites,
        [type]: updatedList,
      },
    });
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    uploadAvatar,
    toggleFavorite,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
