import { useState } from 'react';

import Header from '../Header/Header';
import CharInfo from '../CharInfo/CharInfo';
import CharList from '../CharList/CharList';
import RandomChar from '../RandomChar/RandomChar';
import './App.scss';
import vision from "../../assets/images/vision.png";
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const App = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar(id);
  }

  return (
    <div className="app">
      <Header />
      <main className='app__container'>
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>
        <div className='char__content'>
          <ErrorBoundary>
            <CharList onCharSelected={onCharSelected} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
        </div>
      </main>
      <img src={vision} alt='vision' className='app__decor' aria-hidden="true" />
    </div>
  );
}

export default App;
