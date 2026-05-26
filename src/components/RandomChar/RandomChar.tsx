import { useState, useCallback } from "react";
import mjolnir from "../../assets/images/mjolnir.png";
import CharInfo from "../CharInfo/CharInfo";
import "./RandomChar.scss";

const getRandomId = () => Math.floor(Math.random() * 20) + 1;

const RandomChar = () => {
  const [status, setStatus] = useState<string>("loading");
  const [selectedCharId, setSelectedCharId] = useState<number | null>(() =>
    getRandomId(),
  );
  const isLoading = status === "loading";

  const updateChar = () => {
    // const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    // const id = Math.floor(Math.random() * (20 - 1 + 1) + 1); // Include max and min values
    setSelectedCharId((prev) => {
      let id = getRandomId();
      while (id === prev) id = getRandomId();
      return id;
    });
  };

  const onStatusChange = useCallback((status: string) => setStatus(status), []);

  return (
    <section className="randomchar" aria-labelledby="randomchar-title">
      <div className="randomchar__banner randomchar__column">
        <h2 className="randomchar__title" id="randomchar-title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </h2>
        <h3 className="randomchar__title">Or choose another one</h3>
        <button
          className={`button button__main`}
          onClick={updateChar}
          disabled={isLoading}
          type="button"
          aria-label="Try it button to get a random character"
        >
          <span className="button__inner">try it</span>
        </button>
        <img
          src={mjolnir}
          alt="mjolnir decoration"
          aria-hidden
          className="randomchar__decoration"
        />
      </div>
      <CharInfo
        className="char-info_short randomchar__column"
        selectedCharId={selectedCharId}
        onStatusChange={onStatusChange}
      />
    </section>
  );
};

export default RandomChar;
