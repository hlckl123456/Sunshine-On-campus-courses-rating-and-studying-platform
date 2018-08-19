var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
var name = escape(req.query.name);
var city= escape(req.query.city);
var state = req.query.state;
var country = req.query.country;
var address1 = escape(req.query.address1);
const request_url = "https://api.yelp.com/v3/businesses/matches/best?name="
+name+"&city="+city+"&state="+state+"&country="+country+"&address1="+address1;

// {"businesses":[]}

query(request_url, res);
});

function query(request_url, res) {
    var request = require('request');

    var options = {
        url: request_url,
        headers: {Authorization: "Bearer wzhYeJXqr1J8scqfCkGQE-6XsUAw8qcoLKOXSYnkLCSW1DIdO2kmLTpuOClHANbWkBJjj-jknEM7Y2lu25CGByp-QjaagG1cUWNBt5vwXGfNZDSKovHp024Ssge0WnYx"}
    }
    request.get(options, function (error, response, body) {
        var data = JSON.parse(body);
        if (data && data.businesses.length > 0 ) { 
            var review_id = data.businesses[0].id;
            var req_url = "https://api.yelp.com/v3/businesses/"+ review_id + "/reviews";
            getReview(req_url, res, request);
        } else {
            var output = {};
            output.error = 1;
            output["error message"] = "not correct1";
            output["data"] = body;
            // output["response"] = response;
            JSON.stringify(output);
            res.send(JSON.stringify(output));
        }
    });
}

function getReview(request_url, res, request) {

    var options = {
        url: request_url,
        headers: {Authorization: "Bearer wzhYeJXqr1J8scqfCkGQE-6XsUAw8qcoLKOXSYnkLCSW1DIdO2kmLTpuOClHANbWkBJjj-jknEM7Y2lu25CGByp-QjaagG1cUWNBt5vwXGfNZDSKovHp024Ssge0WnYx"}
    }

    request.get(options, function (error, response, body) {
        if (!error) {
        // res.send(body);
            try {
                // res.send(body);
                var data = JSON.parse(body);
                if (data && data.reviews.length > 0) {
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
                res.send(body);
            }
        } else {
            var output = {};
            output.error = 2;
            output["error message"] = "not correct3";
            JSON.stringify(output);
            // res.send(JSON.stringify(responss));
            res.send(JSON.stringify(output));
        }
    });
}

module.exports = router;
