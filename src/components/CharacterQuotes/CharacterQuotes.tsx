import classNames from "classnames";

import { Tables } from "../../types/supabase";

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
          <p key={quote.id} className="character-quotes__item">
            "{quote.quote_en}"
          </p>
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
