var User = require('./../models/User/User'),
    db = require('./../Libs/db/db');

module.exports = function handleTo(server){

    server.get('/forgotpassword?:email',function (req, res){
        var email = req.query.email;
        db.connect();

        User.getUserByUsername(email,{
            success:function(){
                db.disconnect();
                res.send(200);
                res.end();
            },
            error:function(err){
                db.disconnect();
                res.json(500,{error:err});
                res.end();
            }
        });
    });
};
