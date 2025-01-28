import AppHeader from '../AppHeader/AppHeader';
import CharList from '../CharList/CharList';
import RandomChar from '../RandomChar/RandomChar';
import './App.scss';

function App() {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <RandomChar />
        <div className='char__content'>
          <CharList />
        </div>
      </main>
    </div>
  );
}

export default App;
