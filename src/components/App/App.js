import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from '../Header/Header';
// import { MainPage, ComicsPage, NoMatch, SingleComicPage } from '../pages';
import Spinner from "../Spinner/Spinner";
import vision from '../../assets/images/vision.png';
import './App.scss';

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const NoMatch = lazy(() => import('../pages/NoMatch'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className='app__container'>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />}></Route>
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/comics/:comicId" element={<SingleComicPage />} />
              <Route path="*" element={<NoMatch />}></Route>
            </Routes>
          </Suspense>
        </main>
        <img src={vision} alt='vision' className='app__decor' aria-hidden="true" />
      </div>
    </Router>
  );
}

export default App;
