var db = require('./../../Libs/db/db');

var UserSchema = new db.Schema({
    name: String,
    surname: String,
    faculty: String,
    course: Number,
    group: Number,
    username: {type: String, unique: true},
    password: String
});

var MyUser = db.mongoose.model('User', UserSchema);

module.exports.addUser = addUser;
module.exports.getUser = getUser;
module.exports.getUserByUsername = getUserByUsername;

//Add user to database
function addUser(user, callback){
    var instance = new MyUser();

    instance.name = user.name;
    instance.surname = user.surname;
    instance.faculty = user.faculty;
    instance.course = user.course;
    instance.group = user.group;
    instance.username = user.username.toLowerCase();
    instance.password = user.password;

    instance.save(function (err,user){
        if(err){
            callback.error(err);
        } else {
            callback.success(instance);
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
                callback.success(user);
            } else{
                callback.error({message:'User with that password does not exist'});
            }
        });
}

function getUserByUsername(email,callback){
    MyUser.findOne({
            'username': email
        },
        function(err,user){
            if(user){
                callback.success();
            } else{
                callback.error({message:'User with that email does not exist'});
            }
        });
}