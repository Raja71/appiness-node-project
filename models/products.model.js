let mongoose = require("mongoose"),
	produCategory = require("./productsCategories.model");

let Schema = mongoose.Schema;

let productSchema = new Schema({
	name: { type: String, required: true, trim: true },
	price: { type: Number, required: true }, // if the product is single or configured, price will be there. otherwise ( for grouped product)it will not be there
	sku_code: { type: String },
	weight: { type: Number, required: false }, //it will be in lbs,kgs etc
	description: { type: String, required: false },
	categoryId: { type: Schema.Types.ObjectId, ref: "produCategory" },
	image_urls: [{ type: String, required: false, default: null }],
	isEnable: { type: Boolean },
	createdAt: { type: Date, default: Date.now() }
});

productSchema.pre("save", function(next) {
	next();
});

// Create a Model
let Product = mongoose.model("Product", productSchema);

//make model available everywhere in app
module.exports = Product;
