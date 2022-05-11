const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());

const dbo = require("./db/conn");

app.listen(port, () => {
	dbo.connectToServer(function (err) {
		if (err) console.error(err);
	});
	console.log(`Server running on port: ${port}`);
});
