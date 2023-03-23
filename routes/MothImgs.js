var sqlite3 = require('sqlite3').verbose()
var validator = require('validator');

const express = require('express')
const imageMoths_router = express.Router()

// Banco de dados
var db_mariposa = require('../database.js')

// Autenticador
const auth = require("../middleware/auth.js");
const jwt = require("jsonwebtoken");

const multer = require('multer');
const upload = multer({ dest: 'fonte_dados_coleta_imagens/uploads/' });

// IMAGENS
// ---------------------------------

// pega todas as imagens
imageMoths_router.get("/imageMoths_getAll", auth, (req, res) => {

    var sql = "SELECT * FROM imagens"
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

// todas as imagens de uma familia
imageMoths_router.get("/imageMoths_getSomeFamilia/:familia", auth, (req, res) => {

    var sql = "SELECT * FROM imagens WHERE familia_nome = ?"
    var params = [req.params.familia]

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

// todas as imagens de uma familia + subfamilia
imageMoths_router.get("/imageMoths_getSomeSubfamilia/:familia/:sub_familia", auth, (req, res) => {

    var sql = "SELECT * FROM imagens WHERE familia_nome = ? AND sub_familia_nome = ?"
    var params = [req.params.familia, req.params.sub_familia]

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

// Upload nova imagem
imageMoths_router.post("/imageMoths_newImage/", upload.single('foto'), 
    (req, res, next) => {
        
        console.log("Image Uploaded")

        const token = req.headers["my_token"];

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        } else{
            if(token === "000000"){
                return res.status(403).send("Log in first!");
            }
        }

        try {

            const decoded = jwt.verify(token, 'secret');
            req.user_email = decoded;
            console.log("Valid token!")

        } catch (err) {
            return res.status(401).send("Invalid Token");
        }

        return next();

}, (req, res, next) => {

    return res.status(200).send("Upload Ok");

});


/*


> Adicionar nova imagem

identificador_referencia é nome de coleta comparando com nome na tabela main

se não achar:
identificador referencia é "sub_familia" + "familia" comparando com nome main

se não achar isso também
identificador referencia é "familia" comparando com nome main (primeira ocorrência)

> Deleta uma certa imagem da main

*/

module.exports = imageMoths_router;