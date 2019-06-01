import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faCommentAlt, faTags, faClock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

library.add(faArrowUp, faArrowDown, faCommentAlt, faTags, faClock);

const postDayTime = (postDate, dateNow) => {
    const msPerDay = 1000 * 60 * 60 * 24;
    const utcD1 = Date.UTC(postDate.getFullYear(), postDate.getMonth(), postDate.getDate());
    const utcD2 = Date.UTC(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());
    const ans = Math.floor((utcD2 - utcD1) / msPerDay);

    if (ans === 0) {
        if (postDate.getUTCHours() < dateNow.getUTCHours()){    //if hours greater but minutes not then not truly an hour
            if (postDate.getUTCMinutes() <= dateNow.getUTCMinutes()){    //eg. 12:50, 13:10
                return `${dateNow.getUTCHours() - postDate.getUTCHours()}hr ago`;
            }   //check if actually an hour difference in minutes
            if (dateNow.getUTCHours() - postDate.getUTCHours() === 1){
                if (postDate.getUTCMinutes() > dateNow.getUTCMinutes()){
                    return `${60 - (postDate.getUTCMinutes() - dateNow.getUTCMinutes())}m ago`
                }
            }
            return `${(dateNow.getUTCHours() - postDate.getUTCHours()) - 1}hr ago`
        }
        return `${dateNow.getUTCMinutes() - postDate.getUTCMinutes()}m ago`
    } else {
        return `${ans}d ago`
    }
}

const ratingChange = (rating, postID) => {
    axios.post('http://localhost:3001/user/postRating', {value: rating, post: postID}, {withCredentials: true})
    .then(res => window.location.reload());
}

const postsView = (posts) => {
    if (!posts || posts.length === 0){
        return <h2>No posts currently available to see</h2>
    } else {
        return posts.map(post => {
            const date = new Date(post.date);
            let rating = 0;
            if (post.ratings){
                rating = (post.ratings).reduce((total, current) => total + current.rating , 0);
            }
            return (
                <div className="postContainer">
                    <div>
                        <button className="ratingBtn" onClick={() => ratingChange(1, post._id)}><FontAwesomeIcon icon={faArrowUp}/></button>
                        <p id="rating">{rating}</p>
                        <button className="ratingBtn" onClick={() => ratingChange(-1, post._id)}><FontAwesomeIcon icon={faArrowDown}/></button>
                    </div>
                    <div id="title-name">
                        <a id="title" href={`posts/${post._id}`}>{post.title}</a>
                        <p id="name"><i>by {post.authorName}</i></p>
                    </div>
                    <p id="date"><FontAwesomeIcon icon={faClock}/>{postDayTime(date, new Date())}</p>
                    <p id="tags"><FontAwesomeIcon icon={faTags}/>{post.tags[0].tag}</p>
                    <p id="comments"><FontAwesomeIcon icon={faCommentAlt}/>{post.comments ? post.comments.length : 0}</p>
                </div>
            );
        })
    }
}
export default postsView;