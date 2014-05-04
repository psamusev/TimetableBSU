var Schedule = require('./../models/Schedule/Schedule'),
    db = require('./../Libs/db/db');

module.exports = function handleTo(server){
    server.get('/schedule', function (req, res){
        /*var data = req.body;
        db.connect();

        Schedule.getSchedule(req,function(err,user){
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
        });*/
    });
};
