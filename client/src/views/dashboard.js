import React from 'react';
import axios from 'axios';
import Header from '../components/header';
import postsView from '../components/posts';
import Popup from 'reactjs-popup';
import '../styles/dashboard.scss';

class Dashboard extends React.Component {
  constructor(){
    super();
    this.state = {
      Data: []
    }
  }
  componentDidMount = () => {   //callback of setState run axios for userdata using userID, set data state and render page
    axios.get('http://localhost:3001/user/dashboard', {withCredentials: true})
    .then(res => this.setState({
      Data: res.data
    }));
  }
    render(){
      return (
        <div>
          <Header/>
          <Popup className="postForm" trigger={<button id="postCreate">Create Post?</button>} modal>
            <div id="popup">
              <form id="postForm">
                <h2>Your post</h2>
                <input type="text" className="postInput" name="title" placeholder="Title" required/>
                <input type="text" name="tags" className="postInput" placeholder="Tags" required/>
                <textarea type="text" name="body" className="postInput" placeholder="Body" required/>
                <button type="submit">Submit</button>
              </form>
            </div>
          </Popup>
          {postsView(this.state.posts)}
        </div>
      );
    }
  }
  
  export default Dashboard;