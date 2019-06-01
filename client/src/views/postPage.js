import React from 'react';
import axios from 'axios';
import Header from '../components/header';
import {withRouter} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faTags, faClock} from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import postDayTime from '../components/time';
import '../styles/post.scss';

library.add(faArrowUp, faArrowDown, faTags, faClock);

class PostPage extends React.Component{
    constructor(){
        super();
        this.state = {
            post: []
        }
    }
    componentDidMount = () => {
        const postID = (this.props.location.pathname).split('/')[3] //url format is /user/posts/:postID
        axios.get(`/user/posts/${postID}`).then(res => this.setState({post: res.data}));
    }

    ratingChange = (rating, postID) => {
        axios.post('http://localhost:3001/user/postRating', {value: rating, post: postID}, {withCredentials: true})
        .then(res => window.location.reload());
    }

    render(){
        const data = this.state.post;
        const rating = data.ratings ? (data.ratings).reduce((total, current) => total + current.rating , 0) : 0
        const post = (data) => {
            if (!data._id){
                return <h1>Post could not be found, does not exist</h1>
            } else {
                const date = new Date(data.date)
                return (
                <div>
                    <div id="postContainer">
                        <div>
                            <button className="ratingBtn" onClick={() => this.ratingChange(1, data._id)}><FontAwesomeIcon icon={faArrowUp}/></button>
                            <p id="rating">{rating}</p>
                            <button className="ratingBtn" onClick={() => this.ratingChange(-1, data._id)}><FontAwesomeIcon icon={faArrowDown}/></button>
                        </div>
                        <h1>{data.title}</h1>
                        <p>by {data.authorName}</p>
                        <p><FontAwesomeIcon icon={faClock}/> {postDayTime(date, new Date())}</p>
                        <p id="tags"><FontAwesomeIcon icon={faTags}/>{data.tags ? data.tags[0].tag : 'Unavailable'}</p>
                        <p>{data.content}</p>
                    </div>
                    <div id="commentsContainer">
                        <h1>Comments</h1>
                        {!data.comments ?
                            <h1>No comments</h1> : 
                            data.comments.map(comment => {
                                const commentDate = new Date(comment.date);
                                return (
                                    <div className="comment">
                                        <div>
                                            <button><FontAwesomeIcon icon={faArrowUp}/></button>
                                            <p>{comment.rating ? comment.rating : 0}</p> 
                                            <button><FontAwesomeIcon icon={faArrowDown}/></button>
                                        </div>
                                        <div className="commentContent">
                                            <div>
                                                <p>{comment.author}</p>
                                                <p className="clock"><FontAwesomeIcon icon={faClock}/> {postDayTime(commentDate, new Date())}</p>
                                            </div>
                                            <p className="reply">{comment.content}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <Popup className="postForm" trigger={<button id="commentCreate">Add Comment?</button>} modal>
                            <div id="popup">
                                <form id="commentForm" action= {`http://localhost:3001/user/posts/${data._id}/comment`} method="POST">
                                    <h2>Your Comment</h2>
                                    <textarea type="text" name="comment" className="commentInput" placeholder="Comment" required/>
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        </Popup>
                    </div>
                </div>
                )
            }
        };
        return (
            <div>
                <Header/>
                {post(data)}
            </div>
        )
    }
}

export default withRouter(PostPage);