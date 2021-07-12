//Importando os módulos externos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const admin = require("./routes/admin.js")
    const public = require('./routes/public.js')
    const path = require('path')
    const login = require('./routes/authenticated')
    const mongoose = require('mongoose')
    const session = require("express-session")
    const flash = require('connect-flash')
    const passport = require("passport")
    require('./config/auth')(passport)
//Constantes do Programa
    const port = process.env.PORT || 3000
    const db = require('./config/db')
//Configurações
    //Sessão
        app.use(session({
            secret: "autenticNode",
            resave: true,
            saveUninitialized: true
        }))

        app.use(passport.initialize())
        app.use(passport.session())
        app.use(flash())
    //Middleware
        app.use((req,res,next)=>{
            //Declaração das variaveis globais
            res.locals.successMSG = req.flash("successMSG")
            res.locals.errorMSG = req.flash('errorMSG')
            res.locals.error = req.flash('error')
            res.locals.user = req.user || null
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
        mongoose.connect(db.mongoURI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            console.log("Conectado ao DB")
        })
//Rotas
    app.use('/admin',admin)
    app.use('/',public)
    app.use('/users',login)

//Outros
    app.listen(port,()=>{
        console.log("Servidor rodando")
    })