const fs = require("fs");


function writeToLog(log) {
	const formatted = `${new Date()}: ${log}\n`;
	fs.appendFile("./log.txt", formatted, (err) => err);
}

module.exports = {
	writeToLog
};