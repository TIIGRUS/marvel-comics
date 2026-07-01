import type { User } from "../../types";
import {
  getProfileDisplayName,
  getProfileFields,
  getProfileInitials,
} from "./profileUtils";
import "./Profile.scss";

interface ProfileProps {
  user: User;
  onEdit: () => void;
}

const Profile = ({ user, onEdit }: ProfileProps) => {
  const displayName = getProfileDisplayName(user);
  const initials = getProfileInitials(displayName);
  const profileFields = getProfileFields(user);

  return (
    <section className="profile-page">
      <div className="profile-page__summary">
        <div className="profile-page__avatar" aria-hidden="true">
          {user.avatar_url ? (
            <img
              className="profile-page__avatar-image"
              src={user.avatar_url}
              alt={"Avatar of " + displayName}
            />
          ) : (
            initials
          )}
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

      <div className="profile-page__actions">
        <button
          className="button button_theme_main"
          type="button"
          onClick={onEdit}
        >
          <span className="button__inner">Edit</span>
        </button>
      </div>
    </section>
  );
};

export default Profile;
