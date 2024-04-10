const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./models/post")

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())




app.listen(8081, function(){
    console.log("Servidor Ativo!")
})

app.get("/",function(req, res){
    res.render("cadastro")
})

app.post("/cadastro", function(req, res){
    post.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    }).then(function(){
        console.log("Agendamento cadastrado com sucesso!")
    }).catch(function(erro){
        console.log("Erro: Agendamento não cadastrado!" + erro)
    })

    res.render("cadastro")
})


app.get("/consulta", function(req, res){
    post.findAll().then(function(post){
        res.render("consulta", {post:post})
    }).catch(function(erro){
        console.log("Erro: Nenhum agendamento encontrado!" + erro)
    })
})


app.get("/editar/:id", function(req, res){
    post.findAll({where: {"id": req.params.id}}).then(function(post){
        res.render("editar", {post: post})
        res.render("editar", {options})
    }).catch(function(erro){
        console.log("Erro: Agendamento nao encontrado!" + erro)
    })
})

app.post("/atualizar", function(req, res){
    post.update({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    }, {where:{"id": req.body.id}}).then(function(){
        console.log("Agendamento atualizado com sucesso!!")
    }).catch(function(erro){
        console.log("Erro: Agendamento não atualizado!" + erro)
    })

    post.findAll().then(function(post){
        /*res.render("consultar", {post:post})*/
    }).catch(function(erro){
        console.log("Erro: Nenhum agendamento encontrado!" + erro)
    })

})

app.get("/excluir/:id", function(req, res){
    post.destroy({where: {"id": req.params.id}}).then(function(post){
        /*res.render("/consulta")*/
        console.log("Agendamento excluido com sucesso!")
    }).catch(function(erro){
        console.log("Erro: Agendamento não excluido!" + erro)
    })
})