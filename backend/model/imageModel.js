const mongoose = require("mongoose")

const Schema = mongoose.Schema

const imageSchema = new Schema({
    fileName:{
        type:String,
        required:true
    },
    filePath:{
        type:String,
        required:true   
    }
}, {timestamps: true})

const Image = mongoose.model("Image", imageSchema)
module.exports = Image;