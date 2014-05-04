/**
 * Created by AA on 26.02.14.
 */
var express = require('express'),
    /*http = require('http'),
 fs = require('fs'),
 url = require('url'),
 util = require('util'),*/

    routes = require('./routes/routes');

var app = express();

app.configure(function (){
    app.set('title', 'Timetable BSU');
    app.use(express.logger());
    app.use(express.static(__dirname));
    app.use(express.bodyParser());
    app.use(express.errorHandler())
});

routes.attachRequests(app);

app.listen(8000);
