const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");

router.get("/post", verifyToken, (req, res) => {
	res.json({
		name: "atif",
		post: "this is my first post",
	});
});

module.exports = router;
