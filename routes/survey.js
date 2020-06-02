var express = require('express');
const http = require('http');
var cors = require('cors');

var router = express.Router();


const dbHostname = "www.xdnfirst.xyz";
const dbPort = 3000;
const dbPath = "/db";

QUESTIONS={
    1: "1. Responsiveness: how responsive the game is"
};


router.get('', function(req, res){
    console.log(req.params.l+','+req.params.ping);
    res.render('question', { title: 'Survey', questions:QUESTIONS});
});

router.get('/', function(req, res){
    console.log(req.params.l+','+req.params.ping);
    res.render('question', { title: 'Survey', questions:QUESTIONS});
});
router.get(':id/:name/:l/:time/:ping', function(req, res){
    // console.log(req.params.l+','+req.params.ping);
    res.render('question', { title: 'Survey', id: req.param.id, name:req.param.name, l: req.params.l, time:req.params.time, ping: req.param.ping, questions:QUESTIONS});
});

router.post('/:id/:name/:score/:time', function(req, res){
    var result = JSON.parse(JSON.stringify(req.body));
    result.l = req.params.l;
    result.ping = req.params.ping;
    result.remoteTime = new Date();
    result.clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    result.agent = req.get('user-agent');
    // console.log(req);
    // console.log(req.get('user-agent'));

    var post_data = JSON.stringify(result);
    var post_options = {
        hostname: dbHostname,
        port: dbPort,
        path: dbPath,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };

    // Set up the request
    var post_req = http.request(post_options, function(resp) {
        resp.setEncoding('utf8');
        resp.on('data', function (chunk) {
            // console.log('Response: ' + chunk);
            res.redirect('/');
        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();

});

router.get('/speedtest', function(req, res){
    // console.log("req:"+req);
    res.sendStatus(200);
});

module.exports = router;
