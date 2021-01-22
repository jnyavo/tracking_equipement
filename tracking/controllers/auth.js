//importation des dependances
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//mise en place de connexion bd
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE

});


//fonction login à importer
exports.login = async (req,res) => {
    try {
        const {username, password} = req.body;
        
        db.query("SELECT * FROM users WHERE username = ? ",[username], async (error,results) => {
            if(!results || !( await bcrypt.compare(password, results[0].password) ))
            {
                req.session.message = "Username ou mots de passe incorrect";
                res.redirect('/');
            }
            else
            {
                req.session.username = username;
                res.redirect('/home');
            }
        });
    } catch (error) {
        console.log(error);
    }
}




//Fonction register à importer : insertion dans la BD 
exports.register = async (req,res) => {
    const {lname, fname, username, email, password, cpassword} = req.body;

    //hashage du mots de passe
    let hashedPassword = await bcrypt.hash(password,8);
    console.log(hashedPassword);

    db.query("INSERT INTO users SET ?", {username: username, password: hashedPassword}, (error,results) =>{

        if (error)
        {
            if (error.code == 'ER_DUP_ENTRY')
            {
                req.session.message = "Le nom d'utlilisateur existe déjà";
                req.session.form = req.body;
                
            } 
            else
            {
                req.session.message = error.code.concat(': ',error.sqlMessage);
                req.session.form = req.body;
            }
            res.redirect('/register');
        }
        else
        {
            req.session.message = "Utilisateur enregistré";
            res.redirect('/');
        }
    });


    
};



