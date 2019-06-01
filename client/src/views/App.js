import React from 'react';
import { Switch, Route } from 'react-router-dom';
import login from './login';
import dashboard from './dashboard';
import profile from './profile';
import auth from '../components/auth';
import signUp from './signUp';
import PostPage from './postPage';

class App extends React.Component {
  render(){
    return (
      <div>
        <Switch>
          <Route exact path="/" component={login}/>
          <Route exact path="/create" component={signUp}/>
          <Route exact path="/user/dashboard" component={auth(dashboard)}/>
          <Route exact path="/user/profile" component={auth(profile)} />
          <Route exact path="/user/posts/:postID" component={auth(PostPage)}/>
          <Route path= "*" component = {()=> "404 NOT FOUND"}/>
        </Switch>
      </div>
    );
  }
}

export default App;
