//Importando os módulos externos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const admin = require("./routes/admin.js")
    const public = require('./routes/public.js')
    const path = require('path')
    const mongoose = require('mongoose')
    const session = require("express-session")
    const flash = require('connect-flash')
//Constantes do Programa
    const port = 3000
//Configurações
    //Sessão
        app.use(session({
            secret: "autenticNode",
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    //Middleware
        app.use((req,res,next)=>{
            //Declaração das variaveis globais
            res.locals.successMSG = req.flash("successMSG")
            res.locals.errorMSG = req.flash('errorMSG')
            next()
        })
    //Body Parser
        app.use(bodyParser.urlencoded({extended:true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars',handlebars({defaultLayout:'main'}))
        app.set('view engine','handlebars')
    //Arquivos Estaticos
        app.use(express.static(path.join(__dirname,"public")))
    //Mongoose
        mongoose.connect("mongodb://localhost/blog",{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            console.log("Conectado ao DB")
        })
//Rotas
    app.use('/admin',admin)
    app.use('/',public)

//Outros
    app.listen(port,()=>{
        console.log("Servidor rodando")
    })