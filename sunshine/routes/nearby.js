
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
var router = express.Router();

var position = "";
var keyword = "";
var category = "";
var distance = "";
var address = "";
var api_key = "AIzaSyB9FQSZUWndH5dSqIQCLF-XrOW3kJ6Hiyc";
var request = require('request');
/* GET users listing. */
router.get('/', function(req, res, next) {
    position = req.query.position;
    keyword = req.query.keyword;
    category = req.query.category;
    distance = req.query.distance;
    address = req.query.address;

    if (address != "") {
        var req_url = "https://maps.googleapis.com/maps/api/geocode/json?address=" 
                    + address + "&key=" + api_key;
        getPosition(req_url, res, request);
    } else {
        var req_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
        + position + "&radius=" + distance + "&type="
        + category + "&keyword=" + keyword + "&key=" + api_key;
        query(req_url, res, request);
    }
});

function getPosition(request_url, res, request) {
    
    request(request_url, function (error, response, body) {
        var content = JSON.parse(body).results;
        if (content && content.length > 0) {
            // res.send(body);
            var geo = content[0].geometry.location;
            position = geo.lat + "," + geo.lng;
            // res.send(body);
        } else {
            // res.send(body);
            position = "";
        }

        var req_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
        + position + "&radius=" + distance + "&type="
        + category + "&keyword=" + keyword + "&key=" + api_key;
        query(req_url, res, request);
    });
}

function query(request_url, res, request) {
    request(request_url, function (error, response, body) {
        if (!error) {
        // res.send(body);
            try {
                // res.send(body);
                var data = JSON.parse(body);
                if (data && data.results.length > 0) {
                    // console.log(data.results);
                    var output = {};
                    output.error = 0;
                    output["data"] = body;
                    res.send(JSON.stringify(output));
                } else {
                    var output = {};
                    output.error = 1;
                    output["error message"] = "not correct1";
                    output["data"] = body;
                    // output["response"] = response;
                    JSON.stringify(output);
                    res.send(JSON.stringify(output));
                }
            }
            catch (e) {
                var output = {};
                output.error = 2;
                output["error message"] = "not correct2";
                JSON.stringify(output);
                res.send(JSON.stringify(output));
            }
        } else {
            var output = {};
            output.error = 2;
            output["error message"] = "not correct3";
            JSON.stringify(output);
            res.send(JSON.stringify(output));
        }
    });
}

module.exports = router;
