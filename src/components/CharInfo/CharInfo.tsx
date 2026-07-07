import { useState, useEffect } from "react";
import classNames from "classnames";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import { AsyncStatus, Character } from "../../types";
import { Tables } from "../../types/supabase";
import CharacterQuotes from "../CharacterQuotes/CharacterQuotes";
import { useCharacterQuotes } from "../../hooks";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

import "./CharInfo.scss";

interface CharInfoProps {
  selectedCharId: number | null;
  className?: string;
  onStatusChange?: (status: string) => void;
  onReturnFocus?: () => void;
  ref?: React.Ref<HTMLElement>;
}

const CharInfo = ({
  selectedCharId,
  className,
  onStatusChange,
  onReturnFocus,
  ref,
}: CharInfoProps) => {
  const [char, setChar] = useState<Character | null>(null);
  const { status, getCharacter, clearError } = useMarvelService();
  const {
    quotes: charQuotes,
    isQuotesLoading,
    loadedCharacterName,
  } = useCharacterQuotes(char?.name);

  useEffect(() => {
    let isCancelled = false;

    const updateChar = async () => {
      if (!selectedCharId) return;

      clearError();
      setChar(null);

      try {
        const loadedChar = await getCharacter(selectedCharId);

        if (!isCancelled) {
          setChar(loadedChar);
        }
      } catch {
        if (!isCancelled) setChar(null);
      }
    };

    if (selectedCharId) {
      updateChar();
    }

    return () => {
      isCancelled = true;
    };
  }, [selectedCharId, clearError, getCharacter]);

  useEffect(
    () => onStatusChange && onStatusChange(status),
    [status, onStatusChange],
  );

  const isQuotesReady =
    Boolean(char?.name) &&
    loadedCharacterName === char?.name &&
    !isQuotesLoading;
  const contentStatus: AsyncStatus =
    status === "confirmed" && !isQuotesReady ? "loading" : status;

  return (
    <article
      ref={ref}
      tabIndex={-1}
      className={classNames("char-info", className)}
      onKeyDown={(e) => {
        if (e.key === "Escape") onReturnFocus?.();
      }}
    >
      {setContent({
        process: contentStatus,
        Component: <View char={char!} charQuotes={charQuotes} />,
      })}
    </article>
  );
};

interface ViewProps {
  char: Character;
  charQuotes: Tables<"marvel_quotes">[];
}

const View = ({ char, charQuotes }: ViewProps) => {
  const { name, description, thumbnail, wiki, homepage, comics } = char;

  return (
    <>
      <img
        src={thumbnail}
        alt={`Image of ${name}`}
        className="char-info__img"
      />
      <h3 className="char-info__name">
        {name}
        <FavoriteButton
          type="characters"
          item={{ id: char.id, name, thumbnail }}
          size={20}
        />
      </h3>
      <p className="char-info__descr">{description}</p>
      <CharacterQuotes quotes={charQuotes} className="char-info__quotes" />
      <div className="char-info__btns">
        <a
          href={homepage}
          aria-label={`Visit ${name}'s homepage`}
          className="button button_theme_main"
        >
          <span className="button__inner">homepage</span>
        </a>
        <a
          href={wiki}
          aria-label={`Visit ${name}'s wiki`}
          className="button button_theme_secondary"
        >
          <span className="button__inner">Wiki</span>
        </a>
      </div>
      <div className="char-info__comics">
        <h4 className="char-info__title">Comics:</h4>
        <ul className="char-info__comics-list">
          {comics.length > 0 ? (
            comics.slice(0, 10).map((item, i) => (
              <li key={i} className="char-info__comics-item">
                {item}
              </li>
            ))
          ) : (
            <span>Comics not found for this character.</span>
          )}
        </ul>
      </div>
    </>
  );
};

export default CharInfo;
