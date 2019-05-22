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
      detailInfo: null
    }
  }
  componentDidMount = () => {   //callback of setState run axios for userdata using userID, set data state and render page
    axios.get('http://localhost:3001/user/profile', {withCredentials: true})
    .then(res => this.setState({
      personalInfo: res.data.personal,
      detailInfo: res.data.detail
    }));
  }
    render(){
        let display;
        let posts = [];
        let profImg = '/default-user.png';

        if (this.state.personalInfo === null || this.state.detailInfo === null){
            display = "Name Unavailable";
        } else {
            display = this.state.personalInfo;
            posts = this.state.detailInfo.posts;
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