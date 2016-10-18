var mongooose = require("mongoose"),
    Schema = mongooose.Schema,
    passportLocalMongoose = require("passport-local-mongoose");



var User = new Schema({
    username: String,
    password: String,
    firstname: {
        type: String,
        default: ""
    },
    lastname: {
        type: String,
        default: ""
    },
    OauthId: String,
    OauthToken: String,
    admin: {
        type: Boolean,
        default: false
    }
});

User.methods.getName = function(){
    return this + firstname + " " + this.lastname;
};

User.plugin(passportLocalMongoose);
var Users = mongooose.model("User", User);
module.exports = Users;