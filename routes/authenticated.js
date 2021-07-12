//Importando Módulos e bibliotecas
    const express = require('express')
    const mongoose = require('mongoose')
    const router = express.Router()
    require('../models/user')
    const usuario = mongoose.model('usuarios')
    const bcrypt = require('bcryptjs')
    const passport = require('passport')

//Funções
function validaRegistro(email,login,senha,user,confirmpassword){
    var erros = []
    if(!email){
        erros.push({
            texto: "Insira um e-mail válido!"      
    })}else{
        user.findOne({email:email}).then((user)=>{
            if(user){
                erros.push({
                    texto:"Email ja cadastrado"
                })
            }
        })
    }
    if(!login){
        erros.push({
            texto:"Insira um login válido"
        })
    }else{
        user.findOne({login:login}).then((usuario)=>{
            if(usuario){
                erros.push({
                    texto:"Login já cadastrado"
                })
            }
        })
    }
    if(senha.length < 6){
        erros.push({
            texto:"Senha muito pequena, tente novamente!"
        })
    }
    if(senha != confirmpassword){
        erros.push({
            texto:"Senhas não confirmam! tente novamente"
        })
    }
    return erros
}

//Rotas
    //Rota da pag de registro
        router.get('/registro',(req,res)=>{
            res.render('Autenticacao/registro')
        })
    //Rota para confirmar o registro de usuário e inseri-lo no banco de dados
        router.post('/confirmaregistro',(req,res)=>{
            var email = req.body.email
            var login = req.body.login
            var senha = req.body.password
            var confirmpassword = req.body.passwordconfirm
            var erros = validaRegistro(email,login,senha,usuario,confirmpassword)
            if(erros.length > 0){
                res.render('Autenticacao/registro',{erros:erros})
            }
            else{
                const newUser = new usuario({
                    login: req.body.login,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(1, (erro,salt) => {
                    bcrypt.hash(newUser.password,salt,(erro,hash)=>{
                        if(erro){
                            req.flash('errorMSG','Houve um erro ao salvar')
                            res.redirect('/')
                        }
                        newUser.password = hash
                    })
                })
                setTimeout(()=> {
                    newUser.save().then(()=>{
                        req.flash('successMSG','Registrado com sucesso!')
                        res.redirect('/')
                    }).catch((err)=>{
                        req.flash('errorMSG','Houve um erro!')
                        res.redirect('/users/registro')
                    })
                  }, 50)
            }

        })

    //Rota para fazer Login
        router.get('/login',(req,res)=>{
            res.render('Autenticacao/login')
        })

    //Rota para fazer autenticação
        router.post('/confirmalogin',(req,res,next)=>{
            passport.authenticate("local",{
                successRedirect: "/",
                failureRedirect: '/users/login',
                failureFlash : true
            })(req, res, next)
        })

    //Rota de logout
        router.get('/logout',(req,res)=>{
            req.logout()
            req.flash('successMSG','Log Out bem sucedido!')
            res.redirect('/')
        })
module.exports = router