
var User = require('./../models/User/User'),
    db = require('./../Libs/db/db');

module.exports = function handleTo(server){
    server.post('/login/authentication', function (req, res){
        var data = req.body;
        db.connect();

        User.getUser({username:data.username,password:data.password},{
            success:function(user){
                db.disconnect();
                res.json(200,{
                    status:'Authorized',
                    authToken:user.get('id')
                });
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