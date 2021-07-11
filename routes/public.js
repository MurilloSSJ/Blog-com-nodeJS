const express = require('express')
const PublicRoutes = express.Router()
const mongoose = require('mongoose')
require('../models/Posts')
const posts = mongoose.model('postagens')

//Definindo rotas
PublicRoutes.get('/',(req,res)=>{
    posts.find().sort({date:'desc'}).populate('cartegory').lean().then((posts)=>{
        res.render("User/index",{post:posts})
})
    })
PublicRoutes.get('/posts/:slug',(req,res)=>{
    posts.findOne({slug:req.params.slug}).populate('cartegory').lean().then((postagem)=>{
        if(postagem){
            res.render('User/posts/listaposts',{post:postagem})
        }else{
            req.flash('errorMSG','Postagem não encontrada!')
            res.redirect('/')
        }
    })
})

module.exports = PublicRoutes