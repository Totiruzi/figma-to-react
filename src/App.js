import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNavBar';
import Movies from './Pages/Movies/Movies';
import Trending from './Pages/Trending/Trending';
import Series from './Pages/Series/Series';
import Search from './Pages/Search/Search';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route exact path='/' component={Trending} />
            <Route path='/movies' component={Movies} />
            <Route path='/series' component={Series} />
            <Route path='/search' component={Search} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
