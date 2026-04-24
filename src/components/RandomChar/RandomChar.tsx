import { useState, useEffect, useCallback } from "react";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import thor from "../../assets/images/thor.jpeg";
import mjolnir from "../../assets/images/mjolnir.png";
import { Character } from "../../types";
import "./RandomChar.scss";

const RandomChar = () => {
  const [char, setChar] = useState<Character | null>(null);
  const { status, getCharacter, clearError } = useMarvelService();
  const isLoading = status === "loading";

  const onCharLoaded = (char: Character) => {
    setChar(char);
  };

  const updateChar = useCallback(() => {
    // const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    const id = Math.floor(Math.random() * (20 - 1 + 1) + 1); // Include max and min values
    clearError(); // Clear any previous error before making a new request

    getCharacter(id).then(onCharLoaded);
  }, [clearError, getCharacter]);

  useEffect(() => {
    updateChar();
  }, [updateChar]);

  // const errorMessage = error ? <ErrorMessage /> : null;
  // const spinner = isLoading ? <Spinner /> : null;
  // const content = !(isLoading || error) ? <View char={char} /> : null;
  // const classNamesButton = error ? "button_disabled" : "";
  // const { char: { name, description, thumbnail, homepage, wiki }, loading } = this.state;
  // const { char } = this.state;
  // const { name, description, thumbnail, homepage, wiki } = char;

  // if (loading) {
  //     return <Spinner />
  // }

  return (
    <div className="randomchar">
      {setContent({
        process: status,
        Component: <View char={char} />,
      })}

      {/* {loading ? <Spinner /> : <View char={char} />} */}
      {/* {spinner}
            {errorMessage}
            {content} */}

      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button
          className={`button button__main`}
          onClick={updateChar}
          disabled={isLoading}
        >
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

interface ViewProps {
  char: Character | null;
}

const View = ({ char }: ViewProps) => {
  if (!char) return null;

  const { name, description, thumbnail, homepage, wiki } = char;

  return (
    <div className="randomchar__block">
      <img src={thumbnail || thor} alt={name} className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name || "Tor"}</p>
        <p className="randomchar__descr">
          {description}
          {/* {description ? `${description.slice(0, 210)}...` : "There is no description for this character"} */}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
