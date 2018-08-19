
var express = require('express');
var router = express.Router();

var address = "";
var api_key = "AIzaSyB9FQSZUWndH5dSqIQCLF-XrOW3kJ6Hiyc";
var request = require('request');
/* GET users listing. */
router.get('/', function(req, res, next) {
    address = req.query.address;

    var req_url = "https://maps.googleapis.com/maps/api/geocode/json?address="
    + address + "&key=" + api_key;
    query(req_url, res, request);
});


function query(request_url, res, request) {
    request(request_url, function (error, response, body) {
        if (!error) {
        // res.send(body);
            try {

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
