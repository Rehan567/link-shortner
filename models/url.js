const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema(
    {

        shortId : {
            type : String,
            require : true,
            unique : true,
        },
        redirectURL :{
            type : String,
            require : true,
        },
        visitedHistory : [{timestamp : {type : Number}}],    
    },
    {timestamps : true}
)

const URL = mongoose.model("URL" , urlSchema)

module.exports = URL;