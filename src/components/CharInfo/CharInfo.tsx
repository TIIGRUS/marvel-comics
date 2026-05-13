import { useState, useEffect } from "react";
import classNames from "classnames";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import { Character } from "../../types";

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

  const onCharLoaded = (char: Character) => {
    setChar(char);
  };

  useEffect(() => {
    const updateChar = () => {
      if (!selectedCharId) return;
      clearError();
      getCharacter(selectedCharId).then(onCharLoaded);
    };

    if (selectedCharId) {
      updateChar();
    }
  }, [selectedCharId, clearError, getCharacter]);

  useEffect(
    () => onStatusChange && onStatusChange(status),
    [status, onStatusChange],
  );

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
        process: status,
        Component: <View char={char!} />,
      })}
    </article>
  );
};

interface ViewProps {
  char: Character;
}

const View = ({ char }: ViewProps) => {
  const { name, description, thumbnail, wiki, homepage, comics } = char;

  return (
    <>
      <img src={thumbnail} alt={name} className="char-info__img" />
      <div className="char-info__name">{name}</div>
      <div className="char-info__descr">{description}</div>
      <div className="char-info__btns">
        <a href={homepage} className="button button__main">
          <div className="inner">homepage</div>
        </a>
        <a href={wiki} className="button button__secondary">
          <div className="inner">Wiki</div>
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
