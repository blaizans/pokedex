import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Pokedex from './components/Pokedex';
import  PokemonDetail from './components/PokemonDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Pokedex} />
        <Route path="/about/:id" component={PokemonDetail} />
      </Switch>
    </Router>
  );
}

export default App;
