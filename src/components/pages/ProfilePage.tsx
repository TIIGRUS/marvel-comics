import { useAuthContext } from "../../hooks/useAuthContext";
import Profile from "../Profile/Profile";

const ProfilePage = () => {
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  return <Profile user={user} />;
};

export default ProfilePage;
