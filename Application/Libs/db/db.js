var mongoose = require('mongoose'),
    MONGO = {
        username: "Admin",
        password: "Admin",
        server: 'ds037498.mongolab.com',
        port: '37498',
        db: 'timetablebsu',
        connectionString: function () {
            return 'mongodb://' + this.username + ':' + this.password + '@' + this.server + ':' + this.port + '/' + this.db;
        },
        options: {
            server: {
                auto_reconnect: true,
                socketOptions: {
                    connectTimeoutMS: 3600000,
                    keepAlive: 3600000,
                    socketTimeoutMS: 3600000
                }
            }
        }
    },
    Schema = mongoose.Schema;

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;
module.exports.connect = connect;
module.exports.disconnect = disconnect;

function connect() {
   mongoose.connect(MONGO.connectionString());
}

function disconnect() {
    mongoose.disconnect();
}
