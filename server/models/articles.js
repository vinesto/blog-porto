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
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
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