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
    updateEntry = (e) => {
      const value = e.target.value;
      const target = e.target.id;
      this.setState({[target]: value});
    }
    render(){
      return (
        <div className="App">
          <form>
            <h1>Login</h1>
            <input type="text" id="username" placeholder="Username..." required onChange={this.updateEntry} />
            <input type="password" id="password" placeholder="Password..." required onChange={this.updateEntry} />
            <button id="loginBtn">login</button>
            <Link to='/create'>Create New?</Link>
          </form> 
        </div>
      );
    }
  }
  
  export default Login;