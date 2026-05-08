import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "../Header/Header.tsx";
// import { MainPage, ComicsPage, NoMatch, SingleComicPage } from '../pages';
import Spinner from "../Spinner/Spinner";
import "./App.scss";

const MainPage = lazy(() => import("../pages/MainPage.tsx"));
const ComicsPage = lazy(() => import("../pages/ComicsPage.tsx"));
const NoMatch = lazy(() => import("../pages/NoMatch.tsx"));
const SingleLayoutPage = lazy(() => import("../pages/SingleLayoutPage.tsx"));
const SingleComic = lazy(() => import("../SingleComic/SingleComic"));
const SingleChar = lazy(() => import("../SingleChar/SingleChar"));
import { Comic, Character } from "../../types/index.ts";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="app__main app__container">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/comics" element={<ComicsPage />} />
            <Route
              path="/comics/:comicId"
              element={
                <SingleLayoutPage
                  Component={({ data }) => <SingleComic data={data as Comic} />}
                />
              }
            />
            <Route
              path="/characters/:charId"
              element={
                <SingleLayoutPage
                  Component={({ data }) => (
                    <SingleChar data={data as Character} />
                  )}
                />
              }
            />
            <Route path="*" element={<NoMatch />}></Route>
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
};

export default App;
