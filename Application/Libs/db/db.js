var mongoose = require('mongoose'),
    MONGO = {
        username: "blackhard",
        password: "MyPass12345",
        server: 'ds033069.mongolab.com',
        port: '33069',
        db: 'timetable_bsu',
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

function connect() {
    mongoose.connect(MONGO.connectionString());
}

function disconnect() {
    mongoose.disconnect();
}