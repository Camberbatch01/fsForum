import React from 'react';
import axios from 'axios';

class Dashboard extends React.Component {
    render(){
      return (
        <div className="App">
            hi
            <a href="http://localhost:3001/auth/logout" onClick={() => window.localStorage.removeItem('token')}>log out</a>
        </div>
      );
    }
  }
  
  export default Dashboard;