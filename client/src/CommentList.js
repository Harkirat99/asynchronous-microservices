import React, { useEffect, useState } from "react";
import axios from "axios";

export default ({ postId }) => {
  const [comments, setComments] = useState([]);

  const handleServerRequest = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(res.data);
  };
  useEffect(() => {
    handleServerRequest();
  }, []);

  const renderComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      <ul>{renderComments}</ul>
    </div>
  );
};
