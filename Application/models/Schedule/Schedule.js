var db = require('./../../Libs/db/db');

var ScheduleSchema = new db.Schema({
    faculty: String,
    course: Number,
    group: Number,
    classes:[{
        address: String,
        room: Number,
        lesson: String,
        teacher: String,
        date:Date
    }]
});

var Schedule = db.mongoose.model('Schedule', ScheduleSchema);

module.exports.addSchedule = function (user, callback){
//TODO:do we need add custom schedule
};
module.exports.getSchedule = function (userId,callback){

};


