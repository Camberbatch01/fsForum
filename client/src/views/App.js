import React from 'react';
import { Switch, Route } from 'react-router-dom';
import login from './login';
import dashboard from './dashboard';
import auth from '../components/auth';
import signUp from './signUp';

class App extends React.Component {
  render(){
    return (
      <div>
        <Switch>
          <Route exact path="/" component={login}/>
          <Route exact path="/create" component={signUp}/>
          <Route path="/user/dashboard" component={auth(dashboard)}/>
          <Route path= "*" component = {()=> "404 NOT FOUND"}/>
        </Switch>
      </div>
    );
  }
}

export default App;
