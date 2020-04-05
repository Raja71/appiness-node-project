let mongoose = require("mongoose"),
	Schema = mongoose.Schema;

let category_Schema = new Schema({
	category: { type: String, required: true, trim: true },
	createdAt: { type: Date, default: Date.now() }
});

category_Schema.pre("save", function(next) {
	next();
});

// Create a Model
let productCategory = mongoose.model("productCategory", category_Schema);

//make model available everywhere in app
module.exports = productCategory;
