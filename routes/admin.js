//Importando o Express
const express = require("express")
const router = express.Router()
//Definindo as rotas
router.get('/',(req,res)=>{
    res.render("admin/index")
})
router.get('/posts',(req,res)=>{
    res.send("Página de posts")
})
router.get('/cartegorias',(req,res)=>{
    res.send("Página de cartegorias")
})
// Exportando as rotas
module.exports = router