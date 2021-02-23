const express = require("express");
const router = express.Router();
const mysql = require("mysql");

//mise en place de connexion bd
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE

});
//Affichage de index.hbs 
router.get("/equipement", (req,res) => {
    if(!req.session.username)
    {
        //l'utilisateur s'est pas déjà loggé
        res.redirect('/');
        return;
    }

    db.query("SELECT * FROM equipement",(error,results)=>{
        res.send(JSON.stringify(results));
    });
});

router.get("/categorie",(req,res)=>{
    if(!req.session.username)
    {
        //l'utilisateur s'est pas déjà loggé
        res.redirect('/');
        return;
    }
    db.query("SELECT * FROM categorie",(error,results)=>{
        res.send(JSON.stringify(results));
    });
});




module.exports = router;

