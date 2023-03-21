var express = require("express")
var app = express()
var md5 = require('md5')
var sqlite3 = require('sqlite3').verbose()
const jwt = require("jsonwebtoken");

// Banco de dados
var db_mariposa = require('./database.js')

// Autenticador
const auth = require("./middleware/auth.js");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// registrar usuário
app.post("/api/users/register", (req, res, next) => {

    var data = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password ? md5(req.body.password) : null
    }

    var sql_retrieve = "SELECT * from user WHERE email = ?, password = ?"
    var params = [data.email, data.password]

    db_mariposa.get(sql_retrieve, params, (err, rows) => {

        // se passou daqui o usuário existe
        if (err) {
            res.status(400).send("User already exists!");
            return;
        }

    });

    // cria token
    const token = jwt.sign(
        { user_email: data.email },
        "secret",
        {
            expiresIn: "2h",
        }
    );

    var sql_insert = 'INSERT INTO user (name, email, password, token) VALUES (?, ?, ?, ?)'
                
    db_mariposa.run(sql_insert, [data.name, data.email , md5(data.password), token])
    
    res.status(200).json({"my_token":token, "name": data.name, "email": data.email});
    return;

});


// login usuário
app.post("/api/users/login", (req, res, next) => {

    var data = {
        email: req.body.email,
        password : req.body.password ? md5(req.body.password) : null
    }

    var sql_retrieve = "SELECT * from user WHERE email = ?, password = ?"
    var params = [data.email, data.password]

    console.log("senha")
    console.log(data.password)

    db_mariposa.get(sql_retrieve, params, (err, rows) => {

        // se passou daqui o usuário existe
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }

    });

    // cria token
    const token = jwt.sign(
        { user_email: data.email },
        "secret",
        {
            expiresIn: "2h",
        }
    );

    var sql_update = "UPDATE user SET token = ? WHERE email = ?, password = ?"

    db_mariposa.run(sql_update, [token, data.email , md5(data.password)])
    
    res.status(200).json({"my_token":token, "name": data.name, "email": data.email});
    return;

});

// get user por id
app.get("/api/user/:id", auth, (req, res) => {

    var sql = "SELECT * FROM user WHERE id = ?"
    var params = [req.params.id]

    db_mariposa.get(sql, params, (err, row) => {

        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }

        res.json({
            "message":"success",
            "data":row
        })

    });
});

// get user por email (que é um id único anyway)
app.post("/api/user/email", auth, (req, res) => {

    var sql = "SELECT * FROM user WHERE email = ?"
    var params = [req.body.email]

    db_mariposa.get(sql, params, (err, row) => {

        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }

        res.json({
            "message":"success",
            "data":row
        })

    });
});

// atualizar um usuário
app.patch("/api/user/update/:email", auth, (req, res) => {
    
    var data = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password ? md5(req.body.password) : null
    }

    db_mariposa.run(
        `UPDATE user set 
            name = COALESCE(?,name), 
            email = COALESCE(?,email), 
            password = COALESCE(?,password) 
            WHERE email = ?`,
        [data.name, data.email, data.password, req.params.email],
        function (err, result) {

            if (err){
                res.status(400).json({"error": res.message})
                return;
            }

            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })

    });
})

// deletar um usuário
app.delete("/api/user/:email", auth, (req, res) => {

    db_mariposa.run(
        'DELETE FROM user WHERE email = ?',

        req.params.email,
        
        function (err, result) {

            if (err){
                res.status(400).json({"error": res.message})
                return;
            }

            res.json({"message":"User deleted!", changes: this.changes})
    });
})

// ver todos os usuários
app.post("/api/users_get", auth, (req, res) => {

    // só funciona se vc é o admin!

    var sql = "SELECT * FROM user"
    var params = []

    db_mariposa.all(sql, params, (err, rows) => {

        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        if(req.body.email == "admin@example.com"){
            
            res.json({
                "message":"success",
                "data":rows
            })

        }
        else{
            
            res.json({
                "message":"Permissão pendente!",
                "data":rows
            })

        }

    });
});

// user logout (deleta a token dele do banco de dados, ele tem que gerar uma nova ao entrar!)
app.post("/api/users/logout", auth, (req, res) => {

    var data = {
        email: req.body.email,
        password : req.body.password ? md5(req.body.password) : null
    }

    var sql_retrieve = "SELECT * from user WHERE email = ?, password = ?"
    var params = [data.email, data.password]

    console.log("senha")
    console.log(data.password)

    db_mariposa.get(sql_retrieve, params, (err, rows) => {

        // se passou daqui o usuário existe
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }

    });

    // cria token
    const token = "000000"

    var sql_update = "UPDATE user SET token = ? WHERE email = ?, password = ?"

    db_mariposa.run(sql_update, [token, data.email , md5(data.password)])
    
    res.status(200).json({"my_token":token, "message": "Adeus!"});
    return;

});

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