let express = require("express"),
	router = express.Router(),
	helpers = require("../utils/helper"),
	msg = require("../utils/messages"),
	categoryMgr = require("../datamanagers/productsCategoryDataMgr"),
	mongoose = require("mongoose");

//-----------------------------------------------------------------------------------------
//add product category
router.post("/product/category", (req, res) => {
	let data = req.body;
	try {
		categoryMgr
			.addProductCategory(data)
			.then(category => {
				helpers.sendResponse(res, 200, msg.messages.productCategories.productCategoriesAdded, category);
			})
			.catch(err => {
				console.log("inside catch", err);
				// res.send(err)
				helpers.sendResponse(res, 401, msg.messages.common.err_in_adding, err.errmsg);
			});
	} catch (e) {
		helpers.sendResponse(res, 500, msg.messages.common.err_in_adding, err);
	}
});

/*********************************************************************************************** */

router.delete("/products/category", (req, res) => {
	let headers = req.headers;
	let role = headers["role"];
	console.log(role);
	let query = { categoryId: mongoose.Types.ObjectId(req.headers.categoryid) };
	if (role === "") {
		helpers.sendResponse(res, 401, msg.messages.common.roleRequired);
	}
	if (role !== "admin") {
		helpers.sendResponse(res, 401, msg.messages.common.notadmin);
	}
	try {
		categoryMgr
			.deleteProductCategoryAndAssociatedProducts(query)
			.then(productsCategory => {
				helpers.sendResponse(res, 200, msg.messages.productCategories.productCategoriesDelete, productsCategory);
			})
			.catch(err => {
				console.log("inside catch", err);
				// res.send(err)
				helpers.sendResponse(res, 401, msg.messages.common.err_in_deleting, err.errmsg);
			});
	} catch (e) {
		helpers.sendResponse(res, 500, msg.messages.common.err_in_deleting, err);
	}
});

// ***************************************************************************************************/

module.exports = router;
