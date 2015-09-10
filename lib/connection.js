var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost:27017/teams';
mongoose.connect(dbUrl);

process.on('SIGINT', function(){
	mongoose.connection.close(function(){
		console.log('Mongoose default connection closed!!');
		process.exit(0);
	});
});

require('../models/team');