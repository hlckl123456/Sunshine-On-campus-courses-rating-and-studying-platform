// const express = require("express");
// const app = express();
// app.use(express.static(__dirname));


var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("jjasd");
  res.sendFile(path.join(__dirname + '/front/index.html'));  
  //res.render('index', { title: 'Express' });
});

router.get('/style.css', function(req, res, next) {
  console.log("jjasd");
  res.sendFile(path.join(__dirname + '/front/css/style.css'));  
  //res.render('index', { title: 'Express' });
});

router.get('/Twitter.png', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/front/images/Twitter.png'));  
  //res.render('index', { title: 'Express' });
});

router.get('/Pegman.png', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/front/images/Pegman.png'));  
  //res.render('index', { title: 'Express' });
});

router.get('/Map.png', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/front/images/Map.png'));  
  //res.render('index', { title: 'Express' });
});


module.exports = router;
