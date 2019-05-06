import React from 'react';
import '../App.css';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';

class CreateUser extends React.Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: ''
    }
  }
  componentDidMount = () => {
    axios.get('http://localhost:3001/create')
    .then(response => console.log(response.data));
  }
  updateEntry = (e) => {
    const value = e.target.value;
    const target = e.target.id;
    this.setState({[target]: value});
  }
  render(){
    return (
      <div className="createUser">
        <form>
          <h1>Create</h1>
          <input type="text" id="username" placeholder="Username..." required onChange={this.updateEntry} />
          <input type="password" id="password" placeholder="Password..." required onChange={this.updateEntry} />
          <button id="createBtn">Create</button>
          <Link to='/'>Go back?</Link>
        </form> 
      </div>
    );
  }
}

export default CreateUser;