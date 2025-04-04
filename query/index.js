const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());
app.use(cors());


const posts = {};

app.get("/posts", (req, res) => {
    res.send(posts);
})


const handleEvent = (type, data) => {
    console.log("data", data)
    if(type == "PostCreated") {
        const { id, title } = data;
        posts[id] = {
            id, title, comments: []
        }
    }
    if(type == "CommentCreated") {
        const { id, content, postId, status } = data;
        const post =  posts[postId];
        post.comments.push({id, content, status})
    }

    if(type == "CommentUpdated") {

        const { id, content, postId, status} = data;

        const post = posts[postId];
        console.log("post", post)
        console.log("ID", id);
        let comment = post.comments.find((item) => item.id == id);
        comment.content = content;
        comment.status = status;

    }
}
app.post("/events", (req, res) => {
    const { type, data } = req.body;
    handleEvent(type, data);
    res.send({});
})

app.listen(4002, async () => {
    console.log("Listening on 4002");
    const res = await axios.get("http://localhost:4005/events");
    for (const event of res.data) {
        console.log("processing event", event.type);
        handleEvent(event.type, event.data);
    }
})