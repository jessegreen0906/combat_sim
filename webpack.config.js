const path = require('path');

module.exports = {
	entry: './application/client/build/start.js',
//	mode: 'development',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'application/client/dist')
	}
};