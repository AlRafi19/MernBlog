import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const SingleBlogPost = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchBlog() {
            try {
                const response = await axios.get(`https://mernblog2.onrender.com/api/v1/readbyid/${blogId}`);
                setBlog(response.data["data"][0]);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        fetchBlog();
    }, [blogId]);

    const handleAddComment = async () => {
        if (comment.trim() !== '') {
            try {
                const response = await axios.post(`https://mernblog2.onrender.com/api/v1/addComment/${blogId}`, {
                    comment: comment
                });
                setComments([...comments, response.data]);
                setComment('');
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="container">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{blog.title}</h5>
                        <p className="card-text">{blog.content}</p>
                        <p className="card-text">Author: {blog.author}</p>
                    </div>
                    <div className="mt-3">
                        <h6>Comments:</h6>
                        {comments.map((cmt, index) => (
                            <div key={index} className="mb-2">{cmt.comment}</div>
                        ))}
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Add a comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-success" type="button" onClick={handleAddComment}>
                                    Add Comment
                                </button>
                            </div>
                        </div>
                    </div>
                    <Link to="/" className="btn btn-dark w-20">All Blogs</Link>
                </div>
            )}
        </div>
    );
};

export default SingleBlogPost;