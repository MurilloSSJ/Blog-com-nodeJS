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
    res.render('admin/cartegorias')
})
router.get('/newcartegory',(req,res)=>{
    res.render('admin/addcartegoria')
})
// Exportando as rotas
module.exports = router