var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../server/models/User');

router.get('/', function(req, res, next) {
  console.log('in route')
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

router.post('/add', function(req, res, next) {

  User.find({ email: req.body.email }, function (err, user) {
    if (err) return next(err);
    
    if(user){
      res.json({error:true});
    }
    else{
      User.create(req.body, function (err, user) {
        if (err) return next(err);
        res.json(user);
      });
    }
  });

 


});

router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;