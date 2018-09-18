const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    userId:{
        ref:"User",
        type:Schema.Types.ObjectId,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment