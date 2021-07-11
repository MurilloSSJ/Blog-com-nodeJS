const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema({
    title:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    content:{
        type: String,
        required: true
    },
    cartegory:{
        type: Schema.Types.ObjectId,
        ref: "Cartegorias"
    },
    date:{
        type: Date,
        default:Date.now()
    }
})
mongoose.model('postagens',Post)