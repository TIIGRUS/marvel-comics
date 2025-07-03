import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from '../Header/Header';
import { MainPage, ComicsPage } from "../pages";
import vision from "../../assets/images/vision.png";
import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className='app__container'>
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route exact path="/comics">
              <ComicsPage />
            </Route>
          </Switch>
        </main>
        <img src={vision} alt='vision' className='app__decor' aria-hidden="true" />
      </div>
    </Router>
  );
}

export default App;
