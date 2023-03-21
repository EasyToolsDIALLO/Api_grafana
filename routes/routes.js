const express = require('express');
const Model = require('../model/model')
const route = express.Router();
module.exports = route;
//Here we will create 05 routes relatives to 05actions
//1- Posting data to the database
//2- Get all the data from database
//3- Get data by id from databse
//4- Update data by id 
//5- Delete data by id


//Obtenir un document par son id
route.get('/', async (req,res)=>{
    try{
        res.send("Welcome to our plateform. Go enjoy api :)");
    }catch(error){
        res.send({message:error.message});
    }
});


//Obtenir tous les documents de la collection
route.get('/getAll', async (req,res)=>{
    try{
        const data = await Model.find();
        res.json(data);
    }catch(error){
        res.json({message:error.message});
    }
});

//Obtenir un document par son id
route.get('/getOne/:id', async (req,res)=>{
    try{
        const dataById = await Model.findById(req.params.id);
        res.json(dataById);
    }catch(error){
        res.json({message:error.message});
    }
});


//Afficher le profit total de sous_categorie par pays
route.get('/getProfitBySousCtg/', async (req,res)=>{
    try{
        
        const aggregation = [
            {$match : {}},
            {$group: {_id:"$Sous_categorie", Profit:{$sum:"$Profit"}}}
        ]
        const dataById = await Model.aggregate(aggregation);
        res.json(dataById);
    }catch(error){
        res.json({message:error.message});
    }
});

//Afficher la quantité de produit par categorie
route.get('/getQuantiteByCategorie/', async (req,res)=>{
    try{
        
        const aggregation = [
            {$match : {}},
            {$group: {_id:"$Categorie", Quantite:{$sum:"$Quantite"}}}
        ]
        const dataById = await Model.aggregate(aggregation);
        res.json(dataById);
    }catch(error){
        res.json({message:error.message});
    }
});

//Afficher le quantité total de produit par pays
route.get('/getByGroupMntPays/', async (req,res)=>{
    try{
        
        const aggregation = [
            {$match : {}},
            {$group: {_id:"$Pays", Montant:{$sum:"$Montant_ventes"}}}
        ]
        const dataById = await Model.aggregate(aggregation);
        res.json(dataById);
    }catch(error){
        res.json({message:error.message});
    }
});



//Supprimer par l'identifiant
route.delete('/delete/:id', async (req,res)=>{
    try{
        const dataDeleted = await Model.findByIdAndDelete(req.params.id);
        res.send(dataDeleted);
    }catch(error){
        res.status(400).json({message:error.message});
    }
})

//Supprimer tous les documents du symbol
route.delete('/deleteByPays/:Pays', async (req,res)=>{
    try{
        const pays = req.params.Pays
        const options = {new:true};
        const dataDeleted = await Model.deleteMany({Pays:pays},options);
        res.send(dataDeleted);
    }catch(error){
        res.status(400).json({message:error.message});
    }
})