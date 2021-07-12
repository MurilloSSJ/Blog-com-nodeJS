if(process.env.NODE_ENV == "production"){
    module.exports = {
        mongoURI:'mongodb+srv://murillo:<ChickenEATWolf558>@clusterblog.mv126.mongodb.net/ClusterBlog?retryWrites=true&w=majority'
    }
}else{
    module.exports = {mongoURI : "mongodb://localhost/blog"}
}