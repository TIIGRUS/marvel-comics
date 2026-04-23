import { useState } from "react";
import { Helmet } from "react-helmet";

import CharInfo from "../CharInfo/CharInfo";
import CharList from "../CharList/CharList";
import RandomChar from "../RandomChar/RandomChar";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import CharSearchForm from "../CharSearchForm/CharSearchForm";

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState<number | null>(null);

  const onCharSelected = (id: number) => {
    setSelectedChar(id);
  };

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
        <div>
          <ErrorBoundary>
            <CharInfo selectedCharId={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearchForm />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default MainPage;
