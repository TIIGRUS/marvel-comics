import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useAuthContext } from "../../hooks/useAuthContext";
import type {
  FavoriteQuote,
  FavoriteCharacter,
  User,
  FavoriteComic,
} from "../../types";
import {
  getProfileDisplayName,
  getProfileFields,
  getProfileInitials,
} from "./profileUtils";
import "./Profile.scss";

interface ProfileProps {
  user: User;
  onEdit: () => void;
  onChangePassword: () => void;
  successMessage?: string | null;
}
interface RemoveButtonProps {
  onClick: (e: React.MouseEvent) => void;
  className: string;
}

const Profile = ({
  user,
  onEdit,
  onChangePassword,
  successMessage,
}: ProfileProps) => {
  const [activeTab, setActiveTab] = useState<
    "characters" | "comics" | "quotes"
  >("characters");
  const { toggleFavorite } = useAuthContext();

  const TABS_CONFIG = [
    { id: "characters", label: "Characters", searchLink: "/" },
    { id: "comics", label: "Comics", searchLink: "/comics" },
    { id: "quotes", label: "Quotes", searchLink: "/" },
  ] as const;

  const displayName = getProfileDisplayName(user);
  const initials = getProfileInitials(displayName);
  const profileFields = getProfileFields(user);

  const handleRemove = (
    type: "characters" | "comics" | "quotes",
    item: FavoriteCharacter | FavoriteComic | FavoriteQuote,
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    void toggleFavorite(type, item);
  };

  const renderEmptyState = (categoryName: string, searchLink: string) => (
    <div className="profile-page__detail profile-page__favorites-empty">
      <p>Your list of favorite {categoryName} is empty.</p>
      <Link
        to={searchLink}
        className="button button_theme_main button_size_small"
      >
        <span className="button__inner">Find some</span>
      </Link>
    </div>
  );

  const RemoveButton = ({ onClick, className }: RemoveButtonProps) => (
    <button
      className={className}
      onClick={onClick}
      title="Remove from favorites"
      type="button"
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );

  return (
    <section className="profile-page">
      <div className="profile-page__info-section">
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

        {successMessage && (
          <div className="form__alert form__alert_success">
            {successMessage}
          </div>
        )}

        <div className="profile-page__actions">
          <button
            className="button button_theme_secondary"
            type="button"
            onClick={onChangePassword}
          >
            <span className="button__inner">Change Password</span>
          </button>
          <button
            className="button button_theme_main"
            type="button"
            onClick={onEdit}
          >
            <span className="button__inner">Edit Profile</span>
          </button>
        </div>
      </div>

      <div className="profile-page__favorites">
        <h2 className="profile-page__title">Favorites</h2>

        {/* 1. РЕНДЕРИМ ТАБЫ ЦИКЛОМ */}
        <div className="profile-page__tabs">
          {TABS_CONFIG.map(({ id, label }) => (
            <button
              key={id}
              className={classNames("profile-page__tab-btn", {
                "profile-page__tab-btn_active": activeTab === id,
              })}
              disabled={activeTab === id}
              onClick={() => setActiveTab(id)}
              type="button"
            >
              {label} ({user.favorites[id].length})
            </button>
          ))}
        </div>

        {/* 2. ОДНА ПРОВЕРКА НА EMPTY STATE ДЛЯ ВСЕХ ТАБОВ */}
        <div className="profile-page__favorites-content">
          {user.favorites[activeTab].length === 0 ? (
            renderEmptyState(
              activeTab,
              TABS_CONFIG.find((t) => t.id === activeTab)?.searchLink || "/",
            )
          ) : (
            <>
              {/* Рендеринг карточек Персонажей */}
              {activeTab === "characters" && (
                <div className="profile-page__favorites-grid">
                  {user.favorites.characters.map((char) => (
                    <div key={char.id} className="profile-page__favorite-card">
                      <RemoveButton
                        className="profile-page__favorite-card-remove"
                        onClick={(e) => handleRemove("characters", char, e)}
                      />
                      <Link
                        to={`/characters/${char.id}`}
                        className="profile-page__favorite-card-link"
                      >
                        <img
                          src={char.thumbnail}
                          alt={char.name}
                          className="profile-page__favorite-card-img"
                        />
                        <div className="profile-page__favorite-card-body">
                          <h4 className="profile-page__favorite-card-title">
                            {char.name}
                          </h4>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {/* Рендеринг карточек Комиксов */}
              {activeTab === "comics" && (
                <div className="profile-page__favorites-grid">
                  {user.favorites.comics.map((comic) => (
                    <div key={comic.id} className="profile-page__favorite-card">
                      <RemoveButton
                        className="profile-page__favorite-card-remove"
                        onClick={(e) => handleRemove("comics", comic, e)}
                      />
                      <Link
                        to={`/comics/${comic.id}`}
                        className="profile-page__favorite-card-link"
                      >
                        <img
                          src={comic.thumbnail}
                          alt={comic.title}
                          className="profile-page__favorite-card-img"
                        />
                        <div className="profile-page__favorite-card-body">
                          <h4 className="profile-page__favorite-card-title">
                            {comic.title}
                          </h4>
                          <div className="profile-page__favorite-card-price">
                            {comic.price}$
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {/* Рендеринг Цитат */}
              {activeTab === "quotes" && (
                <div className="profile-page__favorites-quotes">
                  {user.favorites.quotes.map((quote) => (
                    <div
                      key={quote.id}
                      className="profile-page__favorite-quote-card"
                    >
                      <RemoveButton
                        className="profile-page__favorite-quote-card-remove"
                        onClick={(e) => handleRemove("quotes", quote, e)}
                      />
                      <p className="profile-page__favorite-quote-card-text">
                        "{quote.quote_en}"
                      </p>
                      <span className="profile-page__favorite-quote-card-author">
                        {quote.character}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
