
var express = require('express');
var router = express.Router();

var api_key = "AIzaSyB9FQSZUWndH5dSqIQCLF-XrOW3kJ6Hiyc";
var request = require('request');
/* GET users listing. */
router.get('/', function(req, res, next) {
    var position = req.query.latlng;

    var req_url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ position +"&key=" + api_key;
    request(req_url, function (error, response, body) {
        var content = JSON.parse(body).results;
        var placeId = "ojbk";
        if (content) {
            // res.send(body);
            placeId = content[0].place_id;
            // res.send(body);
        } else {
            // res.send(body);
            placeId = "";
        }
        res.send(JSON.stringify(placeId));
    });
       
});

module.exports = router;
