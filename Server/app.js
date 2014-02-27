/**
 * Created by AA on 26.02.14.
 */
var express = require('express');
var app = express();

app.configure(function (){
    app.set('title', 'Timetable BSU');
    app.use(express.logger());
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function (req, res){
    res.send('Hello, user! This first version of Timetable BSU. You are welcome!');
});

app.listen(8000);

