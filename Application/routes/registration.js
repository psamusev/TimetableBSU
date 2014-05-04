var User = require('./../models/User/User'),
    db = require('./../Libs/db/db');

module.exports = function handleTo(server){
    server.post('/login/registration',function(req,res){
        var data = req.body;
        db.connect();

        User.addUser(data.user, {
            success:function () {
                db.disconnect();
                res.json(200, {
                    status: "Registration"
                });
                res.end();
            },
            error:function (err) {
                db.disconnect();
                if(err.code == 11000){
                    err.message = 'The user with this username already exist';
                }
                res.json(500, {error: {code:err.code, message:err.message}});
                res.end();
            }
        });
    });
};
