const express = require('express');
const mongoose = require('mongoose');
const routes = require("./routes/routes");
const app = express();
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use('/api', routes)
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

require('dotenv').config();

const mongoString = "mongodb+srv://EasyTools:fulani1807@clusterforapi.9buuy.mongodb.net/Vente"
mongoose.set('strictQuery', false);
mongoose.connect(mongoString);

const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})