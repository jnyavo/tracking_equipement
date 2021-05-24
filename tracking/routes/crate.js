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

router.post('/suppression', async (req,res)=>{
    
    if(!req.session.username)
    {
        //l'utilisateur ne s'est pas loggé
        res.status(401).redirect('/');
        return;
    }
    
    try {
        const client = new Client({connectionString: 'postgresql://crate@localhost:5432/doc'});
        await client.connect();
        const {id_equipement} = req.body;
        var query = "DELETE FROM equipement WHERE id=?";
        let resultat  = await client.query(query,[id_equipement])
        client.end();
        res.send(resultat);
        console.log("suppression de " + id_equipement);
    } catch (error) {
        res.send(error);
        console.log(error);
        
    }
    

        
});


module.exports = router;