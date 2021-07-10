function validandoFormularioCartegoria(nomeCartegoria,slugCartegoria){
    var erros = []
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
    var j=0
    for(let i=0;i<slugCartegoria.length;i++){
        if(slugCartegoria[i] == ' ' && j==0){
            j = 1
            erros.push({
                texto:"Slug não pode ter espaço, utilize o '-'"
            })
        }
    }
    return erros;
}

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
        res.render('admin/cartegorias',{cartegorias : cartegorias})
    }).catch((err)=>{
        req.flash("errorMSG",err)
    })
})

router.get('/newcartegory',(req,res)=>{
    res.render('admin/addcartegoria')
})

//Adicionando, removendo e alterando cartegorias
    //Adicionando Nova Cartegoria
router.post('/addpost',(req,res) =>{
    //Validando Formulario
    var nomeCartegoria = req.body.nomeCartegoria
    var slugCartegoria = req.body.slugCartegoria
    var erros = validandoFormularioCartegoria(nomeCartegoria,slugCartegoria)
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
//Editando Cartegoria
router.get('/cartegorias/edit/:id',(req,res)=>{
    Cartegoria.findOne({_id:req.params.id}).lean().then((cartegoria)=>{
        res.render('admin/editarCartegoria',{cartegoria:cartegoria})
    }).catch((err)=>{
        req.flash("errorMSG","Esta cartegoria não existe")
        res.redirect('/admin/cartegorias')
    })
})
router.post('/cartegorias/editsuccess',(req,res)=>{
    var nomeCartegoria = req.body.nomeCartegoria
    var slugCartegoria = req.body.slugCartegoria
    var erros = validandoFormularioCartegoria(nomeCartegoria,slugCartegoria)
    if(erros.length >0){
        res.render('admin/editarCartegoria',{erros: erros})
    }
    else{
        Cartegoria.findOne({_id: req.body.idCartegoria}).then((editarcartegoria)=>{
            editarcartegoria.nome = req.body.nomeCartegoria
            editarcartegoria.slug = req.body.slugCartegoria
            editarcartegoria.save().then(()=>{
                console.log("Entrou2")
                req.flash('successMSG','Cartegoria alterada com sucesso!')
                res.redirect('/admin/cartegorias')
            }).catch((err)=>{
                req.flash('errorMSG','Ops! infelizmente ocorreu o erro: '+err)
                res.redirect('/admin/cartegorias')
            })
        }).catch((err)=>{
            req.flash('errorMSG',"ID não encontrado "+ err)
            res.redirect('/admin/cartegorias')
        })
    }
})

//Deletando Cartegorias
router.get('/cartegorias/remove/:id',(req,res)=>{
    Cartegoria.remove({_id: req.params.id}).then(()=>{
        req.flash('successMSG','Arquivo removido com sucesso')
        res.redirect('/admin/cartegorias')
    }).catch((err)=>{
        req.flash('errorMSG','Falha ao remover, erro: '+err)
        res.redirect('/admin/cartegorias')
    })
})
// Exportando as rotas
module.exports = router