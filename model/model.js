const mongoose = require('mongoose');
const databaseSchema = new mongoose.Schema({
    Nom_client:{
        required: true,
        type: String
    },
    Segment:{
        required: true,
        type: String
    },
    Ville:{
        required: true,
        type: String
    },
    Region:{
        required: true,
        type: String
    },
    Pays:{
        required: true,
        type: String
    },
    Zone_geographique:{
        required: true,
        type: String
    },
    Categorie:{
        required: true,
        type: String
    },
    Sous_categorie:{
        required: true,
        type: String
    },
    Nom_produit:{
        required: true,
        type: String
    },
    Montant_ventes:{
        required: true,
        type: Number
    },
    Quantite:{
        required: true,
        type: Number
    },
    Remise:{
        required: true,
        type: Number
    },
    Profit:{
        required: true,
        type: Number
    },
    Objectifs:{
        required: true,
        type: Number
    }
},{collection: 'europe'})

module.exports = mongoose.model('europe',databaseSchema);