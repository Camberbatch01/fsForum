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
            <a className="login Google" href="http://localhost:3001/auth/google">Google+</a>
            <a className="login Github" href="http://localhost:3001/auth/github">Github</a>
            <a className="login Facebook" href="http://localhost:3001/auth/facebook">Facebook</a>
          </form> 
        </div>
      );
    }
  }
  
  export default Login;