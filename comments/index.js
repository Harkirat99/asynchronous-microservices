const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(bodyParser.json());

app.use(cors());

const commentsByPostId = {};
app.get('/posts/:id/comments', (req, res) => {
    res.status(201).send( commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const id = randomBytes(4).toString("hex");
    const {content} = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({
        id: id,
        content
    });
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: "CommentCreated",
        data: {
            id: id,
            content,
            postId: req.params.id
        }
    }).catch((error) => {})
    res.status(201).send(comments);
});


app.post('/events', (req, res) => {
    console.log("Received Events", req.body.type);
    res.send({});
});

app.listen(4001, () => {
    console.log("Listening on 4001");
})