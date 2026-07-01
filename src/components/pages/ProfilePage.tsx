import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import type { UserProfileUpdates } from "../../types";
import Profile from "../Profile/Profile";
import ProfileForm from "../Profile/ProfileForm";

const ProfilePage = () => {
  const { user, error, updateProfile, uploadAvatar } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);

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
    setIsEditing(false);
  };

  return isEditing ? (
    <ProfileForm
      user={user}
      error={error}
      onCancel={() => setIsEditing(false)}
      onSubmit={handleSubmit}
    />
  ) : (
    <Profile user={user} onEdit={() => setIsEditing(true)} />
  );
};

export default ProfilePage;
