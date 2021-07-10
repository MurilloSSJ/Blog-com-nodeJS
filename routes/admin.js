//Importando o Express
const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Cartegoria')
const Cartegoria = mongoose.model("Cartegorias")
//Definindo as rotas
router.get('/',(req,res)=>{
    res.render("admin/index")
})
router.get('/posts',(req,res)=>{
    res.send("Página de posts")
})
router.get('/cartegorias',(req,res)=>{
    Cartegoria.find().sort({Data:'desc'}).lean().then((cartegorias) =>{
        console.log("Acessado com sucesso")
        res.render('admin/cartegorias',{cartegorias : cartegorias})
    }).catch((err)=>{
        req.flash("errorMSG",err)
    })
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
    for(let i=0;i<slugCartegoria.length;i++){
        if(slugCartegoria[i] == ' '){
            erros.push({
                texto:"Slug não pode ter espaço, utilize o '-'"
            })
        }
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
        new Cartegoria(novaCartegoria).save().then(()=>{
            req.flash("successMSG","Cartegoria registrada com sucesso")
            res.redirect('/admin/cartegorias')
        }).catch((err)=>{
            req.flash("errorMSG","Ocorreu um erro, tente novamente mais tarde!")
            res.redirect('/admin/cartegorias')
        })
    }
})
// Exportando as rotas
module.exports = router