import React from 'react';
import '../App.css';
import axios from 'axios';
import { Switch, Route, Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(){
      super();
      this.state = {
        username: '',
        password: ''
      }
    }
    componentDidMount = () => {
      axios.get('http://localhost:3001/')
      .then(response => console.log(response.data));
    }
    render(){
      return (
        <div className="App">
          <form>
            <h1>Sign in with</h1>
            <div>
              <input type="text" className="local username" placeholder="username..."/>
              <input type="text" className="local password" placeholder="password..."/>
              <button id="btnSubmit">Login</button>  
            </div>
            <div>
              <a className="login Google" href="http://localhost:3001/auth/google">Google+</a>
              <a className="login Github" href="http://localhost:3001/auth/github">Github</a>
            </div>
          </form> 
        </div>
      );
    }
  }
  
  export default Login;