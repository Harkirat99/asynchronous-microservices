const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(cors());



app.post("/events", async (req, res) => {
    const {data, type} = req.body;

    if(type == "CommentCreated") {
        const status = data.content.includes("orange") ? "rejected" : "approved";

        console.log("status", status);
        
        await axios.post("http://localhost:4005/events", {
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                content: data.content,
                status: status
            }
        })
    }
    res.send({});
})

app.listen(4003, () => {
    console.log("Listening on 4003");
})