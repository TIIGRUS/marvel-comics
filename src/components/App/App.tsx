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
const LoginPage = lazy(() => import("../pages/LoginPage.tsx"));
const RegisterPage = lazy(() => import("../pages/RegisterPage.tsx"));
const ProfilePage = lazy(() => import("../pages/ProfilePage.tsx"));
import { Comic, Character } from "../../types/index.ts";
import { CharactersProvider } from "../../contexts/CharactersContext.tsx";
import { ComicsProvider } from "../../contexts/ComicsContext.tsx";
import { AuthProvider } from "../../contexts/AuthContext.tsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.tsx";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <SpeedInsights />
        <Analytics />
        <main className="app__main app__container">
          <CharactersProvider>
            <ComicsProvider>
              <Suspense fallback={<Spinner />}>
                <Routes>
                  <Route path="/" element={<MainPage />}></Route>
                  <Route path="/comics" element={<ComicsPage />} />
                  <Route
                    path="/comics/:comicId"
                    element={
                      <SingleLayoutPage
                        Component={({ data }) => (
                          <SingleComic data={data as Comic} />
                        )}
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
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NoMatch />}></Route>
                </Routes>
              </Suspense>
            </ComicsProvider>
          </CharactersProvider>
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;
