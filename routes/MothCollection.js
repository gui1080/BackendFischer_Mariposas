var sqlite3 = require('sqlite3').verbose()
var validator = require('validator');

const express = require('express')
const collectionMoths_router = express.Router()

// Banco de dados
var db_mariposa = require('../database.js')

// Autenticador
const auth = require("../middleware/auth.js");

// Lidando com coletas de Mariposas!
// ---------------------------------

// pega todas as coletas
collectionMoths_router.get("/collectionMoths_getAll", auth, (req, res) => {

    var sql = "SELECT * FROM coleta"
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

// pega tudo baseado em "genus"



// pega tudo baseado em "species"



// pega tudo baseado em "locality"



// pega uma coleta especifica baseada em seu "id_coleta"



// pega tudo baseado em "referencia_main"



// atualiza coleta baseado em seu "id_coleta"



// deleta coleta dada sua "id_coleta"



// adiciona uma nova coleta



module.exports = collectionMoths_router;
