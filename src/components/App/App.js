import AppHeader from '../AppHeader/AppHeader';
import RandomChar from '../RandomChar/RandomChar';
import './App.scss';

function App() {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <RandomChar />
      </main>
    </div>
  );
}

export default App;
