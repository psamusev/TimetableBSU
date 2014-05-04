var User = require('./../models/User/User'),
    db = require('./../Libs/db/db'),
    emailSend = require('./../Libs/email/email');


module.exports = function handleTo(server){

    server.get('/forgotpassword?:email',function (req, res){
        var email = req.query.email;
        db.connect();

        User.getUserByUsername(email,{
            success:function(user){
                db.disconnect();

                var mailOptions = {
                    from: "timetablebsu@gmail.com", // sender address
                    to: email, // list of receivers
                    subject: "Remind Password", // Subject line
                    html: "<b>Your password: " + user.get('password') + "<b>" // html body
                };
                emailSend.smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                        res.json(500,{error:error});
                        res.end();
                    }else{
                        console.log("Message sent: " + response.message);
                        res.send(200);
                        res.end();
                    }
                    emailSend.smtpTransport.close();
                });

            },
            error:function(err){
                db.disconnect();
                res.json(500,{error:err});
                res.end();
            }
        });
    });
};
