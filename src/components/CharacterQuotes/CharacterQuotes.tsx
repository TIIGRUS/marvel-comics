import classNames from "classnames";
import { Tables } from "../../types/supabase";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import "./CharacterQuotes.scss";

interface CharacterQuotesProps {
  quotes: Tables<"marvel_quotes">[];
  className?: string;
  isLoading?: boolean;
}

const CharacterQuotes = ({
  quotes,
  className,
  isLoading = false,
}: CharacterQuotesProps) => {
  if (isLoading) {
    return null;
  }

  return (
    <blockquote className={classNames("character-quotes", className)}>
      {quotes.length > 0 ? (
        quotes.map((quote) => (
          <div key={quote.id} className="character-quotes__item-wrapper">
            <p className="character-quotes__item">"{quote.quote_en}"</p>
            <FavoriteButton
              type="quotes"
              item={{
                id: quote.id,
                quote_en: quote.quote_en,
                quote_ru: quote.quote_ru,
                character: quote.character,
              }}
              size={16}
            />
          </div>
        ))
      ) : (
        <p className="character-quotes__item">
          No quotes available for this character.
        </p>
      )}
    </blockquote>
  );
};

export default CharacterQuotes;
