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
    //Validando Formulario
    var erros = []
    var nomeCartegoria = req.body.nomeCartegoria
    var slugCartegoria = req.body.slugCartegoria
    if(!nomeCartegoria){
        erros.push({
            texto: "Nome Inválido"
        })
    }
    if(!slugCartegoria){
        erros.push({
            texto:"Slug Inválido"
        })
    }
    if(slugCartegoria.trim){
        erros.push({
            texto:"Slug não pode ter espaço, utilize o '-'"
        })
    }
    if(slugCartegoria.isUpperCase){
        erros.push({
            texto:"Slug não pode ter letra maiuscula"
        })
    }
    if(erros.length >0){
        res.render('admin/addcartegoria',{erros: erros})
    }
    //Pegando os dados do formulario e inserindo no banco de dados
    else{
        const novaCartegoria = {
            nome: req.body.nomeCartegoria,
            slug: req.body.slugCartegoria
        }
        new model(novaCartegoria).save().then(()=>{
            console.log("Salvo com sucesso!")
        })
        res.redirect('/admin')
    }

})
// Exportando as rotas
module.exports = router