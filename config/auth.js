const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { use } = require('../routes/authenticated')


require('../models/user')
const user = mongoose.model('usuarios')




module.exports = function(passport){
    passport.use(new localStrategy({usernameField:'login'}, (login,password,done)=>{

        user.findOne({login:login}).then((user)=>{
            if(!user){
                console.log('entrou aqui')
                return done(null, false,{message:'Essa conta não existe'})
            }


                bcrypt.compare(password,user.password,(erro,success)=>{
                    if(success){
                        return done(null,user)
                    }else{
                        return done(null,false,{message:'Senha incorreta'})
                    }
                })
        })
    }))

    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })
    passport.deserializeUser((id,done)=>{
        user.findById(id,(err,user)=>{
            done(err,user)
        })
    })
}