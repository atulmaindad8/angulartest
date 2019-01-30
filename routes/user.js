var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../server/models/User');
var CityMaster = require('../server/models/City');
var SkillMaster = require('../server/models/Skill');
var multer = require("multer");
const fs = require('fs-extra');

router.get('/', function(req, res, next) {
  console.log('in route')
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

router.post('/add', function(req, res, next) {
let userData =JSON.parse(req.body.user);
  User.find({ email: userData.email }, function (err, user) {
    if (err) return next(err);
    
    if(user && user.length>0){
      res.json({error:true});
    }
    else{
      console.log(req.files.file)
      let imageFile = req.files && req.files.file && req.files.file.data;
      let imageName = req.files && req.files.file && req.files.file.name;
      userData.profileurl = 'assets/'+userData.email+'/'+imageName
      User.create(userData, function (err, user) {
        if (err) return next(err);
        var dir = '../src/assets/'+userData.email;
          if (!fs.existsSync(dir)){
              fs.mkdirSync(dir);
          }
          let dirName = dir + "/" + imageName;
          try {
            if(imageFile){
               fs.outputFile(dirName, imageFile);
            }
          } catch (err) {
              return res.json(err);
          }
        res.json(user);
      });
    }
  });
});

router.get('/edit/:email', function(req, res, next) {
  let email = req.params.email;
  User.find({ email: email },function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

router.put('/update/:id', function(req, res, next) {
  let userData =JSON.parse(req.body.user);
  let imageFile =req.files && req.files.file && req.files.file.data;
  let imageName =req.files && req.files.file && req.files.file.name;
  var dirName="";
  if(imageFile){
    userData.profileurl = 'assets/'+userData.email+'/'+imageName;
     dirName = '../src/assets/'+userData.email+ "/" + imageName;
  }
  User.findByIdAndUpdate(userData._id, userData, function (err, user) {
    if (err) return next(err);
    try {
      if(imageFile){
         fs.outputFile(dirName, imageFile);
      }
    } catch (err) {
        return res.json(err);
    }
    res.json(user);
  });
});


router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


router.post('/addCity', function(req, res, next) {
  let city = req.body.cityName
    CityMaster.find({ name: city }, function (err, result) {
      if (err) return next(err);
        CityMaster.create({ name: city }, function (err, data) {
          if (err) return next(err);
          res.json(data);
        });
      
    });
  });

  router.get('/getCities', function(req, res, next) {
//     CityMaster.remove({}, function(err) {
//       if (err) {
//           console.log(err)
//       } else {
//           res.end('success');
//       }
//   }
// );
    CityMaster.find(function (err, data) {
      if (err) return next(err);
      res.json(data);
    });
  });

  router.post('/addSkill', function(req, res, next) {
    let skill = req.body.skillName
    SkillMaster.find({ name: skill }, function (err, result) {
        if (err) return next(err);
        SkillMaster.create({ name: skill }, function (err, data) {
            if (err) return next(err);
            res.json(data);
          });
        
      });
    });

    router.get('/getSkills', function(req, res, next) {
      SkillMaster.find(function (err, data) {
            if (err) return next(err);
            res.json(data);
          });
        });
module.exports = router;