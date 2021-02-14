const express = require("express");
const { Client } = require('pg')

const router = express.Router();


router.get('/equipement', async (req,res)=>{
    
    if(!req.session.username)
    {
        //l'utilisateur ne s'est pas loggé
        res.status(401).redirect('/');
        return;
    }
    
    try {
        const client = new Client({connectionString: 'postgresql://crate@localhost:5432/doc'});
        await client.connect();
        var query = "SELECT id,position,salle FROM equipement";
        let resultat  = await client.query(query)
        client.end();
        res.send(resultat);
    } catch (error) {
        res.send(error);
    }
    

        
});

module.exports = router;