//check whether the mandatory feilds are present in incoming json or not
let _ = require("lodash");

let checkMissingFields = (fields, body) => {
	if (Array.isArray(body) === true) {
		let missingElement;
		_.each(body, item => {
			console.log(item);
			missingElement = checkMissingFields(fields, item);
			if (missingElement) {
				return false;
			}
		});
		return missingElement;
	}

	let missing;
	_.each(fields, (value, field) => {
		if (_.has(body, field) === false || body[field] === undefined || body[field] === null || body[field].length < 1) {
			missing = value ? value : field;
			return false;
		}
	});
	return missing;
};

//----------------------------------------------------------------------------------------

exports.checkMissingFields = checkMissingFields;

//-----------------------------------------------------------------------------------------
//send response with proper convention
module.exports.sendResponse = (res, code, message, result) => {
	console.log("inside send response");
	let response = {
		code: code,
		message: message,
		data: result
	};

	res.status(code);
	res.json(response);

	return response;
};
