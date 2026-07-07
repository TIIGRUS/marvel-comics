import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import type { FavoriteCharacter, FavoriteComic, FavoriteQuote } from "../../types";
import HeartIcon from "../HeartIcon/HeartIcon";
import "./FavoriteButton.scss";

type FavoriteType = "characters" | "comics" | "quotes";
type FavoriteItem = FavoriteCharacter | FavoriteComic | FavoriteQuote;

interface FavoriteButtonProps {
  /** The category of the favoritable item */
  type: FavoriteType;
  /** The full item data to store or remove */
  item: FavoriteItem;
  /** Size of the heart icon in pixels */
  size?: number;
  /** Extra class names for the wrapping button */
  className?: string;
}

const FavoriteButton = ({
  type,
  item,
  size = 20,
  className,
}: FavoriteButtonProps) => {
  const { user, toggleFavorite } = useAuthContext();
  const navigate = useNavigate();

  const isFavorited = (() => {
    if (!user) return false;
    if (type === "characters") {
      return user.favorites.characters.some(
        (c) => c.id === (item as FavoriteCharacter).id,
      );
    }
    if (type === "comics") {
      return user.favorites.comics.some(
        (c) => c.id === (item as FavoriteComic).id,
      );
    }
    return user.favorites.quotes.some(
      (q) => q.id === (item as FavoriteQuote).id,
    );
  })();

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    void toggleFavorite(type, item);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <button
      className={classNames("favorite-btn", className, {
        "favorite-btn_active": isFavorited,
      })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      title={isFavorited ? "Remove from favorites" : "Add to favorites"}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorited}
      type="button"
    >
      <HeartIcon filled={isFavorited} size={size} />
    </button>
  );
};

export default FavoriteButton;
