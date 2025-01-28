import AppHeader from '../AppHeader/AppHeader';
import CharInfo from '../CharInfo/CharInfo';
import CharList from '../CharList/CharList';
import RandomChar from '../RandomChar/RandomChar';
import './App.scss';
import vision from "../../assets/images/vision.png";

function App() {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <RandomChar />
        <div className='char__content'>
          <CharList />
          <CharInfo />
        </div>
        <img src={vision} alt='vision' className='bg-decoration' aria-hidden="true" />
      </main>
    </div>
  );
}

export default App;
