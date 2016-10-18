var mongooose = require("mongoose"),
    Schema = mongooose.Schema;
require('mongoose-currency').loadType(mongooose);



var Currency = mongooose.Types.Currency;

var promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image : {
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
},
{
     timestamps: true
});

var Promotions = mongooose.model("Promotion", promotionSchema);
module.exports = Promotions;