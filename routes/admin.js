//Importando o Express
const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const model = require('../models/Cartegoria')
//Definindo as rotas
router.get('/',(req,res)=>{
    res.render("admin/index")
})
router.get('/posts',(req,res)=>{
    res.send("Página de posts")
})
router.get('/cartegorias',(req,res)=>{
    res.render('admin/cartegorias')
})
router.get('/newcartegory',(req,res)=>{
    res.render('admin/addcartegoria')
})
router.post('/addpost',(req,res) =>{
    var erros = []


    const novaCartegoria = {
        nome: req.body.nomeCartegoria,
        slug: req.body.slugCartegoria
    }
    new model(novaCartegoria).save().then(()=>{
        console.log("Salvo com sucesso!")
    })
    res.redirect('/admin')
})
// Exportando as rotas
module.exports = router