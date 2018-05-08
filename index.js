var express = require('express');
var app = express();
const Feed = require('feed-to-json-promise')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.set('port', process.env.PORT || 5000);

app.get('/', function (req, res, next) {
    const feed = new Feed();
    if (req.query.feedURL) {
        feed.load(req.query.feedURL, {timeout: 500}).then(feed => {
            res.send(feed);
        }).catch(error => {
            res.send({"error": 'true', "items": []});
        })
    } else {
        res.status(400).send({'error': 'feedURL is required'});
    }
});

app.get('/hi', function (req, res, next) {
    res.status(200).send({'ping': 'pong'});
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
