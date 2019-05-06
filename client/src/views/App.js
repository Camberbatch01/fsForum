import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import createAcc from './createAcc';
import login from './login';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={login}/>
          <Route path='/create' component={createAcc}/>
        </Switch>
      </div>
    );
  }
}

export default App;
