//Funções de validação
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
function validandoPost(titlePost,slugPost,descriptionPost,conteudoPost){
    var erros = []
    if(!titlePost){
        erros.push({
            texto: "titulo Inválido"
        })
    }
    if(!slugPost){
        erros.push({
            texto:"Slug Inválido"
        })
    }
    var j=0
    for(let i=0;i<slugPost.length;i++){
        if(slugPost[i] == ' ' && j==0){
            j = 1
            erros.push({
                texto:"Slug não pode ter espaço, utilize o '-'"
            })
        }
    }
    if(!descriptionPost){
        erros.push({
            texto:"Descrição Inválida"
        })
    }
    if(!conteudoPost){
        erros.push({
            texto:"conteúdo Inválido"
        })
    }
    return erros
}

//Importando o Express e variaveis
const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Cartegoria')
require('../models/Posts')
const post = mongoose.model("postagens")
const Cartegoria = mongoose.model("Cartegorias")
//Definindo as rotas
router.get('/',(req,res)=>{
    res.render("admin/index")
})
router.get('/cartegorias',(req,res)=>{
    Cartegoria.find().sort({Data:'desc'}).lean().then((cartegorias) =>{
        res.render('admin/cartegorias/cartegorias',{cartegorias : cartegorias})
    }).catch((err)=>{
        req.flash("errorMSG",err)
    })
})

router.get('/newcartegory',(req,res)=>{
    res.render('admin/cartegorias/addcartegoria')
})

//Adicionando, removendo e alterando cartegorias
    //Adicionando Nova Cartegoria
router.post('/addcartegory',(req,res) =>{
    //Validando Formulario
    var nomeCartegoria = req.body.nomeCartegoria
    var slugCartegoria = req.body.slugCartegoria
    var erros = validandoFormularioCartegoria(nomeCartegoria,slugCartegoria)
    if(erros.length >0){
        res.render('admin/cartegorias/addcartegoria',{erros: erros})
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
        res.render('admin/cartegorias/editarCartegoria',{cartegoria:cartegoria})
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
        res.render('admin/cartegorias/editarCartegoria',{erros: erros})
    }
    else{
        Cartegoria.findOne({_id: req.body.idCartegoria}).then((editarcartegoria)=>{
            editarcartegoria.nome = req.body.nomeCartegoria
            editarcartegoria.slug = req.body.slugCartegoria
            editarcartegoria.save().then(()=>{
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


//Rotas para os posts
router.get('/posts',(req,res)=>{
    post.find().populate('cartegory').lean().then((posts)=>{
        res.render('admin/post/posts',{posts:posts})
    })
})
router.get('/posts/new',(req,res)=>{
    Cartegoria.find().populate('cartegory').lean().then((cartegorias)=>{
        res.render('admin/post/addpost',{cartegorias:cartegorias})
    }).catch((err)=>{
        req.flash('errorMSG','Houve um erro ao carregar as cartegorias')
        res.redirect('/admin/posts')
    })
})
//Adicionando um novo post no banco de dados
router.post('/post/post-validation',(req,res)=>{
    var title = req.body.titlePost
    var slug = req.body.slugPost
    var description = req.body.descriptionPost
    var conteudo = req.body.contentPost
    erros = validandoPost(title,slug,description,conteudo)
    if(erros.length > 0){
        Cartegoria.find().lean().then((cartegoria)=>{
            res.render('admin/post/addpost',{erros: erros,cartegoria:cartegoria})
        })
    }
    else{
        const NovoPost = {
            title: req.body.titlePost,
            slug: req.body.slugPost,
            description:req.body.descriptionPost,
            content:req.body.contentPost,
            cartegory: req.body.cartegoria
        }
        new post(NovoPost).save().then(()=>{
            req.flash('successMSG','Post criado com sucesso')
            res.redirect('/admin/posts')
        })
    }

})

router.get('/posts/edit/:id',(req,res)=>{
    post.findOne({_id:req.params.id}).lean().then((post)=>{
        Cartegoria.find().lean().then((cartegoria)=>{
            res.render('admin/post/editPost',{cartegoria:cartegoria,post:post})
        })
    })
})

//Alterando um post do DB
router.post("/post/postEdit/:id",(req,res)=>{
    var title = req.body.titlePost
    var slug = req.body.slugPost
    var description = req.body.descriptionPost
    var conteudo = req.body.contentPost
    erros = validandoPost(title,slug,description,conteudo)
    if(erros.length > 0){
        post.findOne({_id:req.params.id}).lean().then((post)=>{
            Cartegoria.find().lean().then((cartegoria)=>{
                res.render('admin/post/editPost',{erros:erros,cartegoria:cartegoria,post:post})
            })
        })
    }
    else{
        post.findOne({_id:req.params.id}).then((postEdit) =>{
            postEdit.title = title
            postEdit.slug = slug
            postEdit.description = description
            postEdit.content = conteudo
            postEdit.cartegory = req.body.cartegoria
            postEdit.save().then(() =>{
                req.flash('successMSG','Post editado com sucesso')
                res.redirect('/admin/posts')
            }).catch((err)=>{
                req.flash('errorMSG','Não foi possível editar seu post, erro '+err)
            })
        })
    }
})

//Excluindo um post do DB
router.get('/posts/remove/:id',(req,res)=>{
    post.remove({_id:req.params.id}).then(()=>{
        req.flash('successMSG','Post Removido com sucesso!')
        res.redirect('/admin/posts')
    })
})
// Exportando as rotas
module.exports = router