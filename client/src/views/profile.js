import React from 'react';
import axios from 'axios';
import Header from '../components/header';
import postsView from '../components/posts';

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
        let displayName;
        let posts;
        console.log([this.state.detailInfo])
        if (this.state.personalInfo === null || this.state.detailInfo === null){
            console.log('correct ran')
            displayName = "Name Unavailable";
            posts = [];
        } else {
            displayName = this.state.personalInfo;
            posts = this.state.detailInfo.posts;
        }

      return (
        <div>
            <Header/>
            <div id="profileBanner">
                <h2>{displayName}</h2>
            </div>
            {postsView(posts, displayName)}
        </div>
      );
    }
  }
  
  export default Dashboard;