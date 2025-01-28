import Header from '../Header/Header';
import CharInfo from '../CharInfo/CharInfo';
import CharList from '../CharList/CharList';
import RandomChar from '../RandomChar/RandomChar';
import './App.scss';
import vision from "../../assets/images/vision.png";

function App() {
  return (
    <div className="app">
      <Header />
      <main className='app__container'>
        <RandomChar />
        <div className='char__content'>
          <CharList />
          <CharInfo />
        </div>
      </main>
      <img src={vision} alt='vision' className='app__decor' aria-hidden="true" />
    </div>
  );
}

export default App;
