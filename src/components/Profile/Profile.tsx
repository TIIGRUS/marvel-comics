import type { User } from "../../types";
import "./Profile.scss";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));

interface ProfileProps {
  user: User;
}

const Profile = ({ user }: ProfileProps) => {
  const displayName =
    [user.first_name, user.last_name].filter(Boolean).join(" ") ||
    user.user_name;
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const profileFields = [
    { label: "Email", value: user.email },
    { label: "Username", value: user.user_name },
    { label: "First Name", value: user.first_name },
    { label: "Last Name", value: user.last_name },
    { label: "Age", value: user.age },
    { label: "Account Created", value: formatDate(user.created_at) },
  ].filter(({ value }) => value);

  return (
    <section className="profile-page">
      <div className="profile-page__summary">
        <div className="profile-page__avatar" aria-hidden="true">
          {initials}
        </div>
        <div className="profile-page__heading">
          <h1 className="profile-page__title">User Profile</h1>
          <p className="profile-page__name">{displayName}</p>
        </div>
      </div>

      <dl className="profile-page__details">
        {profileFields.map(({ label, value }) => (
          <div className="profile-page__detail" key={label}>
            <dt className="profile-page__term">{label}</dt>
            <dd className="profile-page__value">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Profile;
