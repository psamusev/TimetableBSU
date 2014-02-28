/**
 * Created by AA on 26.02.14.
 */
var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    url = require('url'),
    util = require('util');

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

app.get('*', function (req, res){
    res.sendfile(__dirname + '/Frontend/404.html');
});

app.listen(8000);

