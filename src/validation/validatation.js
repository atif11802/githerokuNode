const Joi = require("joi");

const signUpValidate = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(30),
		password: Joi.string().min(6).max(1200),
		email: Joi.string().email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		}),
	});

	return schema.validate(data);
};

const loginValidate = (data) => {
	const schema = Joi.object({
		password: Joi.string().min(6).max(1200),
		email: Joi.string().email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		}),
	});

	return schema.validate(data);
};

module.exports = { signUpValidate, loginValidate };
