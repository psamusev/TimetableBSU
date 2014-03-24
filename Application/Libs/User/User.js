var db = require('../db/db');

var UserSchema = new db.Schema({
    name: String,
    surname: String,
    faculty: String,
    group: Number,
    username: {type: String, unique: true},
    password: String,
    email:String
});

var MyUser = db.mongoose.model('User', UserSchema);

module.exports.addUser = addUser;
module.exports.getUser = getUser;

//Add user to database
function addUser(user, callback){
    var instance = new MyUser();

    instance.name = user.name;
    instance.surname = user.surname;
    instance.faculty = user.faculty;
    instance.group = user.group;
    instance.email = user.email.toLowerCase();
    instance.username = user.username;
    instance.password = user.password;

    instance.save(function (err){
        if(err){
            callback(err);
        } else {
            callback(null, instance);
        }
    });
}

function getUser(credentials,callback){
    MyUser.findOne({
        'username':credentials.username,
        'password':credentials.password
        },
        function(err,user){
            if(user){
                callback(null,user);
            } else{
                callback({message:'User with that password does not exist'});
            }
        });
}