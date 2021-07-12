const express = require('express')
const PublicRoutes = express.Router()
const mongoose = require('mongoose')
require('../models/Posts')
require('../models/Cartegoria')
const posts = mongoose.model('postagens')
const cartegorias = mongoose.model('Cartegorias')
//Definindo rotas
//HomePage
PublicRoutes.get('/',(req,res)=>{
    posts.find().sort({date:'desc'}).populate('cartegory').lean().then((posts)=>{
        res.render("User/index",{post:posts})
})
    })

//Listagem de posts
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

//Listagens de cartegorias
PublicRoutes.get('/cartegorias',(req,res)=>{
    cartegorias.find().lean().then((cartegorias)=>{
        res.render('User/cartegorias/cartegorias',{cartegoria:cartegorias})
    })
})
PublicRoutes.get('/cartegoria/:slug',(req,res) =>{
    cartegorias.findOne({slug:req.params.slug}).lean().then((cartegoria)=>{
        if(cartegoria){
            posts.find({cartegory:cartegoria._id}).populate('cartegory').lean().then((post)=>{
                res.render('User/cartegorias/postsCartegoria',{cartegoria:cartegoria,post:post})
            }).catch((err)=>{
                req.flash('Houve um erro ao listar as postagens, erro: '+err)
                res.redirect('/cartegorias')
            })
        }else{
            req.flash('errorMSG','Categoria não existente!')
            res.redirect('/cartegorias')
        }
    }).catch((err)=>{
        req.flash('errorMSG','OPS! houve um erro interno')
        res.redirect('/')
    })
})
module.exports = PublicRoutes