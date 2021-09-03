require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
require("./db/connection");
const authrouter = require("./router/route");
const postRouter = require("./router/post");

app.use(express.json());

// app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/user", authrouter);
app.use("/api", postRouter);

app.listen(port, () => console.log(`app listening on port ${port}`));
