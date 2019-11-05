import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Habits from './components/Habits.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Habits}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
