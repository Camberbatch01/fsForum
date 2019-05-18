import React from 'react';
import axios from 'axios';

class Dashboard extends React.Component {
  constructor(){
    super();
    this.state = {
      userID: '',
      userData: []
    }
  }
  componentDidMount = () => {   //callback of setState run axios for userdata using userID, set data state and render page
    axios.get('http://localhost:3001/user/dashboard', {withCredentials: true}).then(res => this.setState({userID: res.data}));
  }
    render(){
      return (
        <div>
            <a href="http://localhost:3001/auth/logout">log out</a>
        </div>
      );
    }
  }
  
  export default Dashboard;