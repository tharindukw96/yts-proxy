var express = require('express');
const https = require('https');

const baseURL_1 = "https://yts.ae/api/v2/list_movies.json?";
const baseURL_2 = "https://yts.ae/api/v2/movie_details.json?";

var app = express();


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/movie/list', function (req, res) {
    var params = {
        movie_id: req.query.movie_id,
        limit: req.query.limit,
        page: req.query.page,
        quality: req.query.quality,
        minimum_rating: req.query.minimum_rating,
        query_term: req.query.query_term,
        genre: req.query.genre,
        sort_by: req.query.sort_by,
        order_by: req.query.order_by,
        with_rt_ratings: req.query.with_rt_ratings
    }
    var url = baseURL_1 + generateURL(params);
    console.log(url);
    https.get(url, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            //console.log(JSON.parse(data).explanation);
            res.send(JSON.parse(data));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
})

app.get('/movie/details', function (req, res) {
    var params = {
        movie_id: req.query.movie_id,
        with_images: req.query.with_images,
        with_cast: req.query.with_cast,
    }
    var url = baseURL_2 + generateURL(params);
    console.log(url);
    https.get(url, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            //console.log(JSON.parse(data).explanation);
            res.send(JSON.parse(data));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
})

function generateURL(params) {
    var keys = Object.keys(params);
    var parts = [];
    var partURL = "";
    keys.forEach(key => {
        if (typeof params[key] !== 'undefined') {
            parts.push(key + "=" + params[key]);
        }
    });
    partURL = parts.join("&");
    return partURL;
}
var server = app.listen(80, function () { });
