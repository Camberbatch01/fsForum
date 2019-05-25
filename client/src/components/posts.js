import React from 'react';

const postsView = (posts) => {
    if (!posts || posts.length === 0){
        return <h2>No posts currently available to see</h2>
    } else {
        return posts.map(post => {
            return (
                <div className="postContainer">
                    <p id="rating">Rating: {post.rating}</p>
                    <a id="title" href={`posts/${post._id}`}>{post.title}</a>
                    <p id="name">by {post.authorName}</p>
                    <p id="date">{post.date}</p>
                    <p id="tags">Tags: {post.tags[0].tag}</p>
                    <p id="comments">Comments: {post.comments ? post.comments.length : 0}</p>
                </div>
            );
        })
    }
}
export default postsView;