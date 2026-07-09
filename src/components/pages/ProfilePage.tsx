import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import type { UserProfileUpdates } from "../../types";
import Profile from "../Profile/Profile";
import ProfileForm from "../Profile/ProfileForm";
import ProfilePasswordForm from "../Profile/ProfilePasswordForm";

type ProfileMode = "view" | "edit" | "password";

const ProfilePage = () => {
  const { user, error, updateProfile, updatePassword, uploadAvatar } =
    useAuthContext();
  const [mode, setMode] = useState<ProfileMode>("view");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!user) {
    return null;
  }

  const handleSubmit = async (
    updates: UserProfileUpdates,
    avatarFile?: File | null,
  ) => {
    await updateProfile(updates);
    if (avatarFile) {
      await uploadAvatar(avatarFile);
    }
    setSuccessMessage("Profile updated successfully.");
    setMode("view");
  };

  const handlePasswordSubmit = async (password: string) => {
    await updatePassword(password);
    setSuccessMessage("Password updated successfully.");
    setMode("view");
  };

  if (mode === "edit") {
    return (
      <ProfileForm
        user={user}
        error={error}
        onCancel={() => setMode("view")}
        onSubmit={handleSubmit}
      />
    );
  }

  if (mode === "password") {
    return (
      <ProfilePasswordForm
        error={error}
        onCancel={() => setMode("view")}
        onSubmit={handlePasswordSubmit}
      />
    );
  }

  return (
    <Profile
      user={user}
      successMessage={successMessage}
      onEdit={() => {
        setSuccessMessage(null);
        setMode("edit");
      }}
      onChangePassword={() => {
        setSuccessMessage(null);
        setMode("password");
      }}
    />
  );
};

export default ProfilePage;
