const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema({
    invalid_tokens:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("invalidToken",tokenSchema)