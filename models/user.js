const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usuario = new Schema({
    login:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    admin:{
        type: Number,
        default: 0
    },
    password:{
        type:String,
        required:true
    }
})
mongoose.model('usuarios',usuario)