const getFileExt = (file) => {
	if (!file) return "";

	const {originalname} = file[0];

	if (originalname.split(".")[1] === "js") {	
		return "javascript";
	}

	if (originalname.split(".")[1] === "css") {
		return "cascade";
	}
};

const checkIfFileIsBufferable = (cb, file, awsKey) => {
	return new Promise(function(resolve) {
		if (typeof file === "string" || !file) {
			if (!file) {
				return resolve("");
			}
			return resolve(file);
		}

		resolve(cb(file, awsKey));
	});
};

module.exports = {
	checkIfFileIsBufferable, getFileExt
};