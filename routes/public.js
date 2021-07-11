const express = require('express')
const PublicRoutes = express.Router()
const mongoose = require('mongoose')
require('../models/Posts')
const posts = mongoose.model('postagens')

//Definindo rotas
PublicRoutes.get('/',(req,res)=>{
    posts.find().lean().then((posts)=>{
        res.render("User/index",{post:posts})
})
    })
PublicRoutes.get('/posts',(req,res)=>{
    res.send("Lista de posts")
})

module.exports = PublicRoutes