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

/*

> Adicionar novo bicho (Tabela Main) -> Nome + Identificador
verificar se ele já não existe

> Ver todos os bichos principais (Get da tabela main)

> Deleta bicho principal da main

> Adicionar nova imagem

identificador_referencia é nome de coleta comparando com nome na tabela main

se não achar:
identificador referencia é "sub_familia" + "familia" comparando com nome main

se não achar isso também
identificador referencia é "familia" comparando com nome main (primeira ocorrência)

> Ver todas as imagem

> Ver todas as imagens de um dado "familia_nome"

> Ver todas as imagens de um dado "familia_nome" + "sub_familia_nome"

> Deleta uma certa imagem da main

*/

// Lidando com coletas de Mariposas!
// ---------------------------------

/*
> Adicionar nova coleta

> Ver coletas passadas

> Deletar uma dada coleta

> Ver coleta por filtro

*/


module.exports = app