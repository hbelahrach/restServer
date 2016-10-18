var mongooose = require("mongoose"),
    Schema = mongooose.Schema;
require('mongoose-currency').loadType(mongooose);


var Currency = mongooose.Types.Currency;
var commentSchema = new Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },

    postedBy : {
        type: mongooose.Schema.Types.ObjectId,
        ref: "User"
    },
},
{
     timestamps: true
});

var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    label : {
        type: String,
        required: false
    },
    price : {
        type: Currency,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments : [commentSchema]

},
{
     timestamps: true
});

var Dishes = mongooose.model("Dish", dishSchema);
module.exports = Dishes;