import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default () => {

    const [posts, setPosts] = useState({});

    const handleServerRequest = async () =>{
        const res = await axios.get("http://localhost:4000/posts");
        setPosts(res.data);
    }

    useEffect(() => {
        handleServerRequest();
    }, []);

    const renderedPosts = Object.values(posts).map((post) => {
        return (
            <div 
                className="card"
                style={{width: "20%", marginBottom: "200x"}}
                key={post.id}
            >
                <div className="card_body">
                    <h3>{post.title}</h3>
                    <CommentList postId={post.id}/>
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        )
    })
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
    </div>
  );
};
