import React from 'react';
import '../styles/login.scss';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faJediOrder, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';

library.add(faGithub);
library.add(faGooglePlusG);
library.add(faJediOrder);

class Login extends React.Component {
    componentDidMount = () => {
      axios.get('http://localhost:3001/')
      .then(response => console.log(response.data));
    }
    render(){
      return (
        <div className="App">
          <FontAwesomeIcon className="authTitle" icon={faJediOrder} />
          <form className='signIn' action="http://localhost:3001/auth/login" method="POST">
            <div className="loginContainer">
              <input type="text" className="local username" name="username" placeholder="Username"  required/>
              <input type="password" className="local password" name="password" placeholder="Password"  required/>
              <button id="btnSubmit" type="submit">Login</button>
              <a id="createNew" href="/create">Don't have an account? Sign Up</a>
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
  
  export default withRouter(Login);