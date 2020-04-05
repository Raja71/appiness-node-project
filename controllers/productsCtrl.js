let express = require("express"),
	router = express.Router(),
	helpers = require("../utils/helper"),
	msg = require("../utils/messages"),
	productMgr = require("../datamanagers/productsDataMgr");

//-----------------------------------------------------------------------------------------
//add products
router.post("/product", (req, res) => {
	let data = req.body;
	// console.log("data",data)
	let requiredFields = {
		name: "name",
		price: "price"
	};

	//here below functio will check for all required fields
	let missing = helpers.checkMissingFields(requiredFields, data);
	if (missing) {
		return res.status(400).json({
			success: false,
			msg: "missing " + missing
		});
	} else if (data) {
		try {
			productMgr
				.addProduct(data)
				.then(product => {
					helpers.sendResponse(res, 200, msg.messages.common.add_success, product);
				})
				.catch(err => {
					console.log("inside catch", err);
					helpers.sendResponse(res, 401, msg.messages.common.err_in_adding, err.errmsg);
				});
		} catch (e) {
			helpers.sendResponse(res, 500, msg.messages.common.err_in_adding, err);
		}
	}
});

// ***************************************************************************************************/

module.exports = router;
