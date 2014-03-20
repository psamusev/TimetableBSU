/**
 * Created by AA on 26.02.14.
 */
var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    url = require('url'),
    util = require('util'),
    User = require('./Libs/User/User');

var app = express();

app.configure(function (){
    app.set('title', 'Timetable BSU');
    app.use(express.logger());
    app.use(express.static(__dirname));
});

app.get('/', function (req, res){
    res.sendfile(__dirname + '/Frontend/index.html');
});

app.get('/index.html', function (req, res){
    res.sendfile(__dirname + '/Frontend/index.html');
});

app.get('/Frontend/*', function (req, res){
   res.writeHead(200, {'Context-Type': 'text/html'});
   res.end();
});

app.get('*', function (req, res){
    res.sendfile(__dirname + '/Frontend/templates/404.html');
});

app.post('/login/authentication', function (req, res){
    var username = 'test1';

    res.writeHead(200, {'Content-Type': 'application/javascript'});
    res.write(JSON.stringify({
        "username": username,
        "status": "AUTHORIZED"
    }));

    res.end();
//    var password = 'password';
//    User.addUser(username, password, function (err, user) {
//        if(err){
//            throw err;
//        } else {
//            res.writeHead(200, {'Content-Type': 'application/javascript'});
//            res.write(JSON.stringify(user));
//            res.end();
//        }
//    });
});

app.listen(8000);
