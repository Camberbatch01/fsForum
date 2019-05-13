import React from 'react';
import '../styles/login.scss';
import axios from 'axios';
import { Switch, Route, Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';

library.add(faGithub);
library.add(faGooglePlusG);

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
          <form className='signIn'>
            <h1>Sign in with</h1>
            <div className="loginContainer">
              <input type="text" className="local username" placeholder="username..."/>
              <input type="password" className="local password" placeholder="password..."/>
              <button id="btnSubmit">Login</button>
              <a id="createNew" href="/create">Sign Up?</a>
            </div>
            <div className="trdPartyAuth">
              <a className="login Google" href="http://localhost:3001/auth/google"><FontAwesomeIcon className="loginIcon" icon={faGooglePlusG} />Google</a>
              <a className="login Github" href="http://localhost:3001/auth/github"><FontAwesomeIcon className="loginIcon" icon={faGithub} />Github</a>
            </div>
          </form> 
        </div>
      );
    }
  }
  
  export default Login;