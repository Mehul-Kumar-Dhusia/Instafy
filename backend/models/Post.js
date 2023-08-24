const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    text : {
        type : String ,
        max : 500
    },
    img : {
        type : String,
        default : ""
    },
    NumberOfLike : {
        type : Number,
        default : 0
    },
    NumberOfComment : {
        type : Number ,
        default : 0
    },
    likes : {
        type : Array,
        default : []
    },
    comments : {
        type : Array,
        default : []
    }
},{ timestamps: true });

module.exports = mongoose.model("Post", schema);
