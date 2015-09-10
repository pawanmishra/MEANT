var express = require('express');
var mongoose = require('mongoose');
var Team = mongoose.model('Team');
var router = express.Router();

router.post('/teams', function(req, res, next) {
  	Team.create(req.body, function (error, team1) {
    	if (error) {
			return res.sendStatus(500);
    	} 
    	res.sendStatus(200);
  });
});

router.get('/teams/:teamName', function(req, res, next) {
	Team.find({name: new RegExp(req.params.teamName, 'i')}).exec(function(error, result) {
		if(error) {
			return next(error);
		}
		
		if(!result) {
			res.status(404);
		}
		
		res.json(result);
	});
});

router.put('/teams/:teamName', function(req, res, next) {
	delete req.body._id;
	
	Team.update({name : req.params.teamName}, req.body, function(error, affectedRows, response) {
		if(error) {
			return next(error);
		}
		res.sendStatus(200);
	});
});

router.delete('/teams/:teamName', function(req, res, next) {
	Team.findOne({name : req.params.teamName}).remove().exec(function(error, result) {
		if(error) {
			return next(error);
		}
		
		res.sendStatus(200);
	})
})

router.get('/teams', function(req, res, next) {
	Team.find().sort({member_count: 1}).exec(function(error, result){
		if(error) {
			return next(error);
		}
		
		res.json(result);
	});
});

router.get('/', function(req, res, next) {
	res.redirect('/teams');
});

module.exports = router;