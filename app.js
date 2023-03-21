var express = require("express")
var app = express()

// Banco de dados
var db_mariposa = require('./database.js')

// Autenticador
const auth = require("./middleware/auth.js");

// API endpoints

// Testes
// ---------------------------------

// Autenticação funcionando! Nesse endereço, se vc está autenticado, recebe um ok!
app.post("/test/welcome_test", auth, (req, res) => {

    res.status(200).send("Autenticação básica funcionando!");

});

// Funcionando! Na root, retorna um ok!
app.get("/", (req, res, next) => {
    
    res.status(200).send("Ok, a API está rodando!")

});

// Lidando com usuários!
// ---------------------------------

// ver todos os usuários
// registrar usuário
// login usuário
// get user por id
// get user por email (que é um id único anyway)
// atualizar um usuário
// deletar um usuário

app.post("/api/users", auth, (req, res) => {

    var sql = "select * from user"
    var params = []

    db_mariposa.all(sql, params, (err, rows) => {

        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }

        res.json({
            "message":"success",
            "data":rows
        })

    });
});

// Lidando com Mariposas!
// ---------------------------------

/*

> Adicionar novo bicho (Tabela Main) -> Nome + Identificador
verificar se ele já não existe

> Ver todos os bichos principais (Get da tabela main)

> Adicionar nova imagem

identificador_referencia é nome de coleta comparando com nome na tabela main

se não achar:
identificador referencia é "sub_familia" + "familia" comparando com nome main

se não achar isso também
identificador referencia é "familia" comparando com nome main (primeira ocorrência)

> Ver todas as imagem

> Ver todas as imagens de um dado "familia_nome"

> Ver todas as imagens de um dado "familia_nome" + "sub_familia_nome"


*/

// Lidando com coletas de Mariposas!
// ---------------------------------

/*
> Adicionar nova coleta

> Ver coletas passadas
*/


module.exports = app