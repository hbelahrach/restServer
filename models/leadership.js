var mongooose = require("mongoose"),
    Schema = mongooose.Schema;

var leadershipSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image : {
        type: String,
        required: true
    },
    designation : {
        type: String,
        required: true
    },
    abbr : {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
},
{
     timestamps: true
});

var Leaderships = mongooose.model("Leadership", leadershipSchema);
module.exports = Leaderships;