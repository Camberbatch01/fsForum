import React from 'react';

const postsView = (posts, author) => {
    if (!posts || posts.length === 0){
        return <h2>No posts currently available to see</h2>
    } else {
        console.log(posts);
        return posts.map(post => {
            return (
                <div className="postContainer">
                    <a href={`posts/${post.postID}`}>{post.title}</a>
                    <p>{author.name}</p>
                    <p>{post.date}</p>
                    <p>{post.rating}</p>
                    <p>{post.comments.length}</p>
                    {post.tags.map(tag => <p>{tag}</p>)}
                </div>
            );
        })
    }
}
export default postsView;