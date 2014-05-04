/**
 * Created by Pavel on 04.05.2014.
 */

var authorization = require('./authorization'),
    redirect = require('./redirect'),
    registration = require('./registration');
    forgotPassword = require('./forgotPassword');

module.exports.attachRequests = function (server){
    authorization(server);
    redirect(server);
    registration(server);
    forgotPassword(server);
};