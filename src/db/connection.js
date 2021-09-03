const mongoose = require("mongoose");

mongoose.connect(process.env.HIDDEN_DB)
	.then(() => {
		console.log("successfully connectted to db");
	})
	.catch(() => console.log("failed to connect to db"));
