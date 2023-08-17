const mongoose = require("mongoose")

const BlogSchema = mongoose.Schema(
    {
    title:{type:String},
    content:{type:String},
    author:{type:String},
    comments: [
        {
            comment: String,
            
        }
    ],
    createdAt:{type:Date, default:Date.now()}
    },
    {versionKey:false}
)

const BlogModel = mongoose.model("blogs",BlogSchema)

module.exports = BlogModel
