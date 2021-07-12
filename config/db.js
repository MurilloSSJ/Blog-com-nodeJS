if(process.env.NODE_ENV == "production"){
    module.exports = {
        mongoURI:'mongodb+srv://murillo2:Porradevaca558@clusterblog.mv126.mongodb.net/blog?retryWrites=true&w=majority'
    }
}else{
    module.exports = {mongoURI : "mongodb://localhost/blog"}
}