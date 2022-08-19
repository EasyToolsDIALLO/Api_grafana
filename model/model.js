const mongoose = require('mongoose');
const databaseSchema = new mongoose.Schema({
    Date:{
        required: true,
        type: String
    },
    Symbol:{
        required: true,
        type: String
    },
    "Adj Close":{
        required: true,
        type: Number
    },
    Close:{
        required: true,
        type: Number
    },
    High:{
        required: true,
        type: Number
    },
    Low:{
        required: true,
        type: Number
    },
    Open:{
        required: true,
        type: Number
    },
    Volume:{
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Data',databaseSchema);