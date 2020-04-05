const _ = require("lodash");
let mongoose = require("mongoose"),
	Product = require("../models/products.model"),
	helper = require("../utils/helper");

//-------------------------------------------------------------------------------------------
//add product information
module.exports.addProduct = incomingJson => {
	return new Promise((resolve, reject) => {
		let product = new Product(incomingJson);

		product.save((err, product) => {
			if (err) {
				console.log("err1", err);
				reject(err);
			} else {
				resolve(product);
			}
		});
	}).catch(err => {
		console.log(err);
		reject(err);
	});
};
