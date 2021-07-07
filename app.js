//Importando os módulos externos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require("./routes/admin.js")
const public = require('./routes/public.js')
//Constantes do Programa
const port = 3000
//Configurações
    //Body Parser
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
    //Handlebars
    app.engine('handlebars',handlebars({defaultLayout:'main'}))
    app.set('view engine','handlebars')

//Rotas
app.use('/admin',admin)
app.use('/',public)
//Outros
app.listen(port,()=>{
    console.log("Servidor rodando")
})