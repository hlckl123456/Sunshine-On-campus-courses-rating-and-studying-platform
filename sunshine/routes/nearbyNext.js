
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
var router = express.Router();

var nextToken = "";
var api_key = "AIzaSyB9FQSZUWndH5dSqIQCLF-XrOW3kJ6Hiyc";
var request = require('request');
/* GET users listing. */
router.get('/', function(req, res, next) {
    nextToken = req.query.nextToken;

    var req_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken="
    + nextToken + "&key=" + api_key;
    query(req_url, res, request);
});


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
