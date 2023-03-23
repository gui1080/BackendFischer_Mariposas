var sqlite3 = require('sqlite3').verbose()
var validator = require('validator');

const express = require('express')
const mainMoths_router = express.Router()

// Banco de dados
var db_mariposa = require('../database.js')

// Autenticador
const auth = require("../middleware/auth.js");

// Lidando com Mariposas!
// ---------------------------------

// MAIN
// ---------------------------------

// pega todas os bichos da Main
mainMoths_router.get("/mainMoths_getAll", auth, (req, res) => {

    var sql = "SELECT * FROM main"
    var params = []

    db_mariposa.all(sql, params, (err, rows) => {

        if (err) {
            
            res.status(400).json({"error":err.message});
            return;

        }
        else{
            
            res.json({
                "data":rows
            })

        }

    });
});

// ve bicho da main baseado no nome
mainMoths_router.get("/mainMoths_get/:nome", auth, (req, res) => {

    var sql = "SELECT * FROM main WHERE nome = ?"
    var params = [req.params.nome]

    db_mariposa.get(sql, params, (err, rows) => {

        if (err) {
            
            res.status(400).json({"error":err.message});
            return;

        }
        else{
            
            res.json({
                "data":rows
            })

        }

    });
});

// ve bicho da main baseado no id
mainMoths_router.get("/mainMoths_get/:id", auth, (req, res) => {

    var sql = "SELECT * FROM main WHERE identificador = ?"
    var params = [req.params.id]

    db_mariposa.get(sql, params, (err, rows) => {

        if (err) {
            
            res.status(400).json({"error":err.message});
            return;

        }
        else{
            
            res.json({
                "data":rows
            })

        }

    });
});

// register moth
mainMoths_router.post("/registerMainMoth", (req, res, next) => {

    var data = {
        nome: req.body.nome,
    }

    if (req.body.nome == null){
        
        res.status(400).send("Name is null");
        return; 

    }
    else{

        var sql_retrieve = "SELECT * from main WHERE nome = ?"
        var params = [data.nome]

        db_mariposa.get(sql_retrieve, params, (err, rows) => {

            // se passou daqui o usuário existe
            if (rows != undefined || rows != null || err) {
                res.status(400).send("Moth already exists!");
                console.log(rows)
                return;
            }
            else{
                
                // create 6 digit id based on name
                const length = 6
                const Opcoes = "123456789"
                const OpcoesLength = 9

                let identificador = ' ';

                for ( let i = 0; i < length; i++ ) {
                    identificador += characters.charAt(Math.floor(Math.random() * OpcoesLength));
                }
            
                var sql_insert = 'INSERT INTO main (nome, identificador) VALUES (?, ?)'
                
                db_mariposa.run(sql_insert, [data.nome, identificador])

                res.status(200).json({"nome":data.nome, "identificador": identificador});
                return;
            }

        });

    }    

});

// delete moth by name
mainMoths_router.delete("delete/:nome", auth, (req, res) => {

    db_mariposa.run(
        'DELETE FROM main WHERE nome = ?',

        req.params.nome,
        
        function (err, result) {

            if (err){
                res.status(400).json({"error": res.message})
                return;
            }

            res.json({"message":"Moth deleted!", changes: this.changes})
    
    });
})

// filter moths
mainMoths_router.post("/mainMoths_filter", auth, (req, res) => {

    var data = {
        nome: req.body.nome,
    }

    if (req.body.nome == null){
        
        res.status(400).send("Name is null");
        return; 

    }
    else{
            
        var sql = "SELECT * FROM main WHERE nome LIKE '%" + data.nome + "%'"
        var params = []

        db_mariposa.all(sql, params, (err, rows) => {

            if (err) {
                
                res.status(400).json({"error":err.message});
                return;

            }
            else{
                
                res.json({
                    "data":rows
                })

            }

        });
    
    }

});

// update moth by id
mainMoths_router.patch("/mainMoths_PatchId/:id", auth, (req, res) => {
    
    var data = {
        nome: req.body.nome,
        identificador: req.body.identificador
    }

    db_mariposa.run(
        `UPDATE main set 
            nome = COALESCE(?,nome),
            identificador = COALESCE(?,identificador), 
            WHERE identificador = ?`,
        [data.nome, data.identificador, req.params.id],
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

// update moth by name
mainMoths_router.patch("/mainMoths_PatchNome/:nome", auth, (req, res) => {
    
    var data = {
        nome: req.body.nome,
        identificador: req.body.identificador
    }

    db_mariposa.run(
        `UPDATE main set 
            nome = COALESCE(?,nome),
            identificador = COALESCE(?,identificador), 
            WHERE nome = ?`,
        [data.nome, data.identificador, req.params.nome],
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


module.exports = mainMoths_router;