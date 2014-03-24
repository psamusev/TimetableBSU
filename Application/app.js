/**
 * Created by AA on 26.02.14.
 */
var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    url = require('url'),
    util = require('util'),
    User = require('./Libs/User/User');
    db = require('./Libs/db/db');

var app = express();

app.configure(function (){
    app.set('title', 'Timetable BSU');
    app.use(express.logger());
    app.use(express.static(__dirname));
    app.use(express.bodyParser());
    app.use(express.errorHandler())
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
    var data = req.body;
    db.connect();

    User.getUser({username:data.username,password:data.password},function(err,user){
        db.disconnect();
        if(err){
            res.json(500,{error:err});
        } else{
           res.json(200,{
               status:'Authorized',
               authToken:user.get('id')
           });
        }
        res.end();
    });


});

app.post('/login/registration',function(req,res){
    var data = req.body;
    db.connect();

    User.addUser(data.user, function (err,user) {
        db.disconnect();
        if(err){
            res.json(500,{error:err});
        } else {
            res.json(200,{
                status: "Registration"
            });
        }
        res.end();
    });
});

app.listen(8000);
