import React from 'react';
import axios from 'axios';
import Header from '../components/header';
import postsView from '../components/posts';
import '../styles/profile.scss';

class Dashboard extends React.Component {
  constructor(){
    super();
    this.state = {
      personalInfo: null,
      postsInfo: null
    }
  }
  componentDidMount = () => {   //callback of setState run axios for userdata using userID, set data state and render page
    axios.get('http://localhost:3001/user/profile', {withCredentials: true})
    .then(res => this.setState({
      personalInfo: res.data.personal,
      postsInfo: res.data.posts
    }));
  }
    render(){
        let display;
        let posts = [];
        let profImg = '/default-user.png';

        if (this.state.personalInfo === null || this.state.postsInfo === null){
            display = "Name Unavailable";
        } else {
            display = this.state.personalInfo;
            posts = this.state.postsInfo;
        }
        
        if (display.displayImage){
            profImg = display.displayImage;
        } 

      return (
        <div>
            <Header/>
            <div id="profileBanner">
              <img id="profImg" src={profImg}/>
              <h1>{display.name}</h1>
            </div>
            {postsView(posts)}
        </div>
      );
    }
  }
  
  export default Dashboard;