import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import login from './login';
import dashboard from './dashboard';
import auth from '../components/auth';

class App extends React.Component {
  render(){
    return (
      <div>
        <Switch>
          <Route exact path="/" component={login}/>
          <Route path ="/user/dashboard" component={auth(dashboard)}/>
          <Route path = "*" component = {()=> "404 NOT FOUND"}/>
        </Switch>
      </div>
    );
  }
}

export default App;
