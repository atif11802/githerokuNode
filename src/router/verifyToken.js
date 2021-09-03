var jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
	try {
		const token =
			req.header("auth-token") || req.cookies.auth - token;

		if (!token) return res.status(401).send("token error");

		var verifiedToken = jwt.verify(token, process.env.SECRET_KEY);

		if (verifiedToken) {
			next();
		}
	} catch (err) {
		res.status(400).send(err);
	}
};

module.exports = verifyToken;
