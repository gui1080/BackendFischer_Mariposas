var express = require("express")

// rotas, API
var app = express()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API endpoints

// Testes
// ---------------------------------

const testesRoute = require('./routes/Tests.js')
app.use("/testes", testesRoute)

// Lidando com usuários!
// ---------------------------------

const usuariosRoute = require('./routes/Usuarios.js')
app.use("/users", usuariosRoute)

// Lidando com Mariposas!
// ---------------------------------

const mainMothsRoute = require('./routes/MainMoths.js')
app.use("/MainMoths", mainMothsRoute)

// Lidando com coletas de Mariposas!
// ---------------------------------

/*
> Adicionar nova coleta

> Ver coletas passadas

> Deletar uma dada coleta

> Ver coleta por filtro

*/


module.exports = app