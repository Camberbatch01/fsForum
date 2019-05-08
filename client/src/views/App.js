import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import login from './login';
import dashboard from './dashboard';

const PrivateRoute = ({component: Component, ...rest}) => {
  return <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (<Component {...props}/>): (<Redirect to={{pathname: '/'}}/>)
    }
  />
}

class App extends React.Component {
  componentWillMount(){
    //token will always be the only query param right after logging in. afterwards, never shown, so will fail.
    const url = window.location.href;
    if (url.split('user/dashboard?token=')){
      const tokenQuery = url.split('=');
      const token = tokenQuery[1];
      if (token) {
        window.localStorage.setItem("token", token);
        window.location.href = "/user/dashboard";
      }
    }
  }
  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={login}/>
          <PrivateRoute path ="/user/dashboard" component={dashboard}/>
        </Switch>
      </div>
    );
  }
}

export default App;
