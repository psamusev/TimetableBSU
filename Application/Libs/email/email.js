var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "timetablebsu@gmail.com",
        pass: "timetableBSU_2014"
    }
});

module.exports.smtpTransport = smtpTransport;