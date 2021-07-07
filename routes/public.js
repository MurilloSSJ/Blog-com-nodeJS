const express = require('express')
const PublicRoutes = express.Router()

//Definindo rotas
PublicRoutes.get('/',(req,res)=>{
    res.send("HomePage do site")
})
PublicRoutes.get('/posts',(req,res)=>{
    res.send("Lista de posts")
})

module.exports = PublicRoutes