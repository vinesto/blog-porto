const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title : {
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    authorId:{
        ref:"User",
        type:Schema.Types.ObjectId,
        required: true
    },
    comment:[{
        type:Schema.Types.ObjectId,
        ref:"Comment",
    }]
},{
    timestamps:true
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article