const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cartegoria = new Schema({
    nome:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required:true
    },
    Data:{
        type: Date,
        default: Date.now()
    }
})

cartegory = mongoose.model("Cartegorias", Cartegoria)
module.exports = cartegory