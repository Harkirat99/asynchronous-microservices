import React, { useState } from "react";
import axios from "axios";

export default ({postId}) => {
  const [content, setContent] = useState("");
    
  const handleSubmit = async(e) => {
    e.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
        content
    });

  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>New Comment</label>
            <input value={content} onChange={(e)=> setContent(e.target.value)}type="text" className="form-control"/>
        </div>  
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
