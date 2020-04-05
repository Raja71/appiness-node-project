let productCategory = require("../models/productsCategories.model"),
	products = require("../models/products.model"),
	mongoose = require("mongoose");

module.exports.addProductCategory = incomingJson => {
	return new Promise((resolve, reject) => {
		let category = new productCategory(incomingJson);
		category.save((err, result) => {
			if (err) {
				console.log("err1", err);
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};

//********************************************************************************

module.exports.deleteProductCategoryAndAssociatedProducts = catId => {
	console.log("jjjjjj");
	return new Promise((resolve, reject) => {
		productCategory
			.findOneAndDelete({
				_id: mongoose.Types.ObjectId(catId.categoryId)
			})
			.exec((err, productCat) => {
				if (err) {
					reject(err);
				} else if (productCat !== null) {
					products
						.find({
							categoryId: productCat._id
						})
						.deleteMany()
						.exec((err, data) => {
							if (err) {
								console.log(err);
								reject(err);
							} else {
								resolve(productCat);
							}
						});
				} else {
					return new Error("no products");
				}
			});
	});
};
