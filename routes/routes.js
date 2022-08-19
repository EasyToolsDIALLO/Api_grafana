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

//Ajouter un document
route.post('/post', async (req,res)=>{
    const data = new Model({
        Date: "2022-04-29",
        Symbol: "ESMT",
        "Adj Close": 34,
        Close:35,
        High:50,
        Low: 37.456,
        Open: 45,
        Volume: 48.555
    });

    try{
        const dataTosave = await data.save();
        res.status(200).json(dataTosave)
    }catch(error){
        res.status(400).json({message:error.message})
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

//Obtenir un(ou les) document(s) concerné par le symbole
route.get('/getBySymbole/:Symbol', async (req,res)=>{
    try{
        const value = req.params.Symbol
        console.log(value)
        const dataById = await Model.find({Symbol:value});
        res.json(dataById);
    }catch(error){
        res.json({message:error.message});
    }
});

//Afficher le volume total par symbole choisi
route.get('/getBySymbolVolumeTotal/:Symbol', async (req,res)=>{
    try{
        const value = req.params.Symbol
        const aggregation = [
            {$match : {Symbol:value}},
            {$group: {_id:value, totalVolume:{$sum:"$Volume"}}}
        ]
        const dataById = await Model.aggregate(aggregation);
        res.json(dataById);
    }catch(error){
        res.json({message:error.message});
    }
});

//Afficher le volume total par symbole 
route.get('/getByGroupSymbol/', async (req,res)=>{
    try{
        
        const aggregation = [
            {$match : {}},
            {$group: {_id:"$Symbol", totalVolume:{$sum:"$Volume"}}}
        ]
        const dataById = await Model.aggregate(aggregation);
        res.json(dataById);
    }catch(error){
        res.json({message:error.message});
    }
});

//Mise à jour par l'identifiant
route.patch('/update/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const request = {
            Date: "2022-04-29",
            Symbole: "ESMT",
            "Adj Close": 34,
            Close:35,
            High:50,
            Low: 37.456,
            Open: 45,
            Volume: 48.555
        }
        const update = request;
        const options = {new:true};
        const data = await Model.findByIdAndUpdate(id,update,options);
        res.send(data);
    }catch(error){
        res.json({message:error.message});
    }
});

//Mise à jour par le nom (Symbole) 
route.patch('/updateBySymbol/:Symbol', async (req,res)=>{
    try{
        const id = req.params.id;
        const symbole = req.params.Symbol;
        const request = {
            Date: "2022-04-29",
            Symbol: "ESMT",
            "Adj Close": 34,
            Close:35,
            High:50,
            Low: 37.456,
            Open: 45,
            Volume: 48.555
        }
        
        const update = request;
        const options = {new:true};
        const data = await Model.updateMany({Symbol:symbole},update,options)
        res.send(data);
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
route.delete('/deleteBySymbol/:Symbol', async (req,res)=>{
    try{
        const symbol = req.params.Symbol
        const options = {new:true};
        const dataDeleted = await Model.deleteMany({Symbol:symbol},options);
        res.send(dataDeleted);
    }catch(error){
        res.status(400).json({message:error.message});
    }
})