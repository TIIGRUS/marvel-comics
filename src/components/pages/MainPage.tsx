import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import CharInfo from "../CharInfo/CharInfo";
import CharList from "../CharList/CharList";
import RandomChar from "../RandomChar/RandomChar";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import CharSearchForm from "../CharSearchForm/CharSearchForm";

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState<number | null>(null);
  const [isAsideVisible, setIsAsideVisible] = useState(false);

  const onCharSelected = (id: number) => {
    setSelectedChar(id);

    if (window.innerWidth <= 768) {
      setIsAsideVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsAsideVisible(false);
      document.body.style.overflow = "";
    }
  };

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
    <>
      <Helmet>
        <meta name="description" content="Marvel information Portal" />
        <title>Marvel information portal</title>
      </Helmet>
      <RandomChar />
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <aside className={isAsideVisible ? "aside_open" : ""}>
          <ErrorBoundary>
            <CharInfo selectedCharId={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearchForm />
          </ErrorBoundary>
        </aside>
        <div
          className={`char__overlay ${isAsideVisible ? "char__overlay_visible" : ""}`}
          onClick={toggleAside}
        ></div>
      </div>
    </>
  );
};

export default MainPage;
