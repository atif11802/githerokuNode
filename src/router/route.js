const express = require("express");
const user = require("../model/user");
const bcrypt = require("bcrypt");
const router = express.Router();
const Joi = require("joi");
const { signUpValidate, loginValidate } = require("../validation/validatation");
var jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
	const { error } = signUpValidate(req.body);
	// console.log(error);
	if (error) return res.status(400).send(error.details[0].message);

	const exist = await user.findOne({ email: req.body.email });

	if (exist) return res.status(400).send("email already exists");

	try {
		const newUser = new user({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});

		const savedUser = await newUser.save();
		res.status(200).send(savedUser._id);
	} catch (err) {
		res.status(400).send("signUp Failed");
		console.log(err);
	}
});

router.post("/login", async (req, res) => {
	try {
		const { error } = await loginValidate(req.body);
		if (error)
			return res
				.status(400)
				.send(
					`loggin failed ${error.details[0].message}`
				);

		const User = await user.findOne({ email: req.body.email });

		if (!User)
			return res
				.status(400)
				.send(`loggin failed email not found`);

		const validPassword = await bcrypt.compare(
			req.body.password,
			User.password
		);
		// console.log(`ddsdsd ${validPassword}`);

		if (!validPassword)
			return res.status(400).send("password mismatch");

		var token = jwt.sign({ _id: User._id }, process.env.SECRET_KEY);
		res.header("auth-token", token).send(token);
		// res.cookie("auth-token", token);
		// res.send("logged in");
	} catch (err) {
		res.status(400).send("auth failed: " + err);
	}
});

module.exports = router;
