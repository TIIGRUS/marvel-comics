import { useState, useEffect, useCallback } from "react";
import classNames from "classnames";

import CharInfo from "../../CharInfo/CharInfo";
import CharList from "../../CharList/CharList";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";
import CharSearchForm from "../../CharSearchForm/CharSearchForm";

import vision from "../../../assets/images/vision.png";
import "./CharSection.scss";

const CharSection = () => {
  const [selectedChar, setSelectedChar] = useState<number | null>(null);
  const [isAsideVisible, setIsAsideVisible] = useState(false);

  const onCharSelected = useCallback((id: number) => {
    setSelectedChar(id);

    if (window.innerWidth < 768) {
      setIsAsideVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsAsideVisible(false);
      document.body.style.overflow = "";
    }
  }, []);

  console.log("render CharSection");

  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
    document.body.style.overflow = !isAsideVisible ? "hidden" : "";
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section className="char-section">
      <ErrorBoundary>
        <CharList onCharSelected={onCharSelected} />
      </ErrorBoundary>
      <aside
        className={classNames("char-section__aside", {
          "char-section__aside_open": isAsideVisible,
        })}
      >
        <button
          className="char-section__aside-close"
          type="button"
          onClick={toggleAside}
          aria-label="Close panel"
        >
          &#x2715;
        </button>
        <ErrorBoundary>
          <CharInfo
            className="char-section__aside-inner"
            selectedCharId={selectedChar}
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <CharSearchForm />
        </ErrorBoundary>
      </aside>
      <div
        className={classNames("char-section__overlay", {
          "char-section__overlay_open": isAsideVisible,
        })}
        onClick={toggleAside}
        aria-hidden="true"
      ></div>
      <img
        src={vision}
        alt="vision"
        className="char-section__decor"
        aria-hidden="true"
      />
    </section>
  );
};

export default CharSection;
