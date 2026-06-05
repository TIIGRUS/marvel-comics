import { User as SupabaseUser } from "@supabase/supabase-js";
import { User as AppUser } from "../types";
import serializeUser from "../utils/serializeUser";
import { supabase } from "../utils/supabase";

export type UserProfile = AppUser;

export interface RegisterData {
  email: string;
  password: string;
  user_name: string;
  first_name?: string;
  last_name?: string;
  age?: number;
}

export interface LoginData {
  email: string;
  password: string;
}

const buildUserPayload = (
  authUser: SupabaseUser,
  profileData?: Partial<RegisterData>,
) => {
  const metadata = authUser.user_metadata || {};

  return {
    id: authUser.id,
    email: authUser.email || profileData?.email || "",
    user_name: profileData?.user_name || metadata.user_name || "",
    first_name: profileData?.first_name || metadata.first_name || null,
    last_name: profileData?.last_name || metadata.last_name || null,
    age: profileData?.age ?? metadata.age ?? null,
    avatar_url: null,
  };
};

const fetchUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? serializeUser(data) : null;
};

const profilePromises = new Map<string, Promise<AppUser>>();
const profileDataCache = new Map<string, Partial<RegisterData>>();

const getOrCreateUserProfile = (
  authUser: SupabaseUser,
  profileData?: Partial<RegisterData>,
): Promise<AppUser> => {
  const userId = authUser.id;

  if (profileData) {
    profileDataCache.set(userId, {
      ...profileDataCache.get(userId),
      ...profileData,
    });
  }

  if (profilePromises.has(userId)) {
    return profilePromises.get(userId)!;
  }

  const promise = (async (): Promise<AppUser> => {
    try {
      const existingUser = await fetchUserProfile(userId);

      if (existingUser) {
        return existingUser;
      }

      const mergedProfileData = profileDataCache.get(userId);

      const { data: userRecord, error: insertError } = await supabase
        .from("users")
        .insert([buildUserPayload(authUser, mergedProfileData)])
        .select()
        .single();

      if (insertError) {
        if (insertError.code === "23505") {
          const createdUser = await fetchUserProfile(userId);

          if (createdUser) {
            return createdUser;
          }
        }

        throw insertError;
      }

      const serialized = serializeUser(userRecord);
      if (!serialized) {
        throw new Error("Failed to serialize user record");
      }
      return serialized;
    } finally {
      profilePromises.delete(userId);
      profileDataCache.delete(userId);
    }
  })();

  profilePromises.set(userId, promise);
  return promise;
};

const register = async (data: RegisterData) => {
  const { email, password, user_name, first_name, last_name, age } = data;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        user_name,
        first_name,
        last_name,
        age,
      },
    },
  });

  if (authError) {
    throw authError;
  }

  if (!authData.user) {
    throw new Error("Registration failed: no user returned");
  }

  if (!authData.session) {
    throw new Error(
      "Registration succeeded. Please confirm your email before signing in.",
    );
  }

  return getOrCreateUserProfile(authData.user, {
    email,
    user_name,
    first_name,
    last_name,
    age,
  });
};

const login = async (data: LoginData) => {
  const { email, password } = data;

  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError) {
    throw authError;
  }

  if (!authData.user) {
    throw new Error("Login failed: no user returned");
  }

  return {
    user: await getOrCreateUserProfile(authData.user),
    session: authData.session,
  };
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

const getCurrentUser = async () => {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      throw authError;
    }

    if (!user) {
      return null;
    }

    return getOrCreateUserProfile(user);
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

const updateUserProfile = async (userId: string, updates: Partial<AppUser>) => {
  const { data: userRecord, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return serializeUser(userRecord);
};

const userApi = {
  register,
  login,
  logout,
  getCurrentUser,
  updateUserProfile,
};

export default userApi;
