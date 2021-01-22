const express = require("express");
const router = express.Router();

//Affichage de index.hbs 
router.get("/", (req,res) => {

    res.render("index", {message: req.session.message});
    req.session.message = null;
});

//Affichage de register.hbs
router.get("/register", (req,res) => {
    res.render("register",{
        message: req.session.message, 
        form: req.session.form
    });
    req.session.message = null;
    req.session.form = null;
});

//Affichage page principale
router.get("/home",(req,res) => {
    if(!req.session.username)
    {
        //l'utilisateur ne s'est pas loggé
        res.status(401).redirect('/');
        return;
    }
    res.send("Bienvenue " + req.session.username);
})
module.exports = router;