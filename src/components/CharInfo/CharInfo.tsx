import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import { Character } from "../../types";
import "./CharInfo.scss";

interface CharInfoProps {
  selectedCharId: number | null;
}

const CharInfo = ({ selectedCharId }: CharInfoProps) => {
  const [char, setChar] = useState<Character | null>(null);
  const { status, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    const updateChar = () => {
      if (!selectedCharId) {
        return;
      }

      clearError();

      getCharacter(selectedCharId).then(onCharLoaded);
    };

    if (selectedCharId) {
      updateChar();
    }
  }, [selectedCharId, clearError, getCharacter]);

  const onCharLoaded = (char: Character) => {
    setChar(char);
  };

  return (
    <div className="char__info">
      {setContent({
        process: status,
        Component: <View char={char!} />,
      })}
    </div>
  );
};

interface ViewProps {
  char: Character;
}

const View = ({ char }: ViewProps) => {
  const { name, description, thumbnail, wiki, homepage, comics } = char;

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? (
          comics.slice(0, 10).map((item, i) => (
            <li key={i} className="char__comics-item">
              {/* {item.name}  This to Marvel API*/}
              {item}
            </li>
          ))
        ) : (
          <span>Comics not found for this character.</span>
        )}
      </ul>
    </>
  );
};

export default CharInfo;
