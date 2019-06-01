import React from 'react';
import axios from 'axios';
import Header from '../components/header';
import {withRouter} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faTags} from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';

library.add(faArrowUp, faArrowDown, faTags);

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
        //const noPost = <h1>Post could not be found, does not exist</h1>;
        const data = this.state.post;
        const rating = data.ratings ? (data.ratings).reduce((total, current) => total + current.rating , 0) : 0
        const post = (data) => {
            if (!data._id){
                return <h1>Post could not be found, does not exist</h1>
            } else {
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
                        <p id="tags"><FontAwesomeIcon icon={faTags}/>{data.tags ? data.tags[0].tag : 'Unavailable'}</p>
                        <p>{data.content}</p>
                    </div>
                    <div id="commentsContainer">
                        {!data.comments ?
                            <h1>No comments</h1> : 
                            data.comments.map(comment => {
                                return (
                                    <div>
                                        <p>{comment.rating ? comment.rating : 0}</p>
                                        <p>{comment.author}</p>
                                        <p>{comment.date}</p>
                                        <p>{comment.content}</p>
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