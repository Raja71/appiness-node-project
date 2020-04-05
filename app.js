let express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	cors = require("cors");

process.on("unhandledRejection", err => {
	//  fs.writeSync(1, `Caught exception: ${err}\n`);
	console.log(`Caught unhandledRejection: ${err}`);
});

process.on("uncaughtException", err => {
	console.log(`Caught uncaughtException:  ${err}`);
	console.log(err.stack);
});

// connections to mongodb
mongoose.connect("mongodb://localhost:27017/PRODUCTS", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

mongoose.connection.on("error", function() {
	console.log("MongoDB Connection Error. Please make sure that MongoDB is running.");
	process.exit(1);
});

app.use(cors());
let bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(require("./controllers/productsCtrl"));
app.use(require("./controllers/productsCategoryCtrl"));
// app.use(require("./utils/contct-us"));
//On which node js server Running
app.listen("3000", function() {
	console.log("Server running on port " + "3000");
});
