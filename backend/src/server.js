const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const passport = require('passport');

require('dotenv').config();

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    console.log("Connected to DB.");
}).catch( (err)=> {
    console.log("Erro: could not connect to MongoDB server");
});


const port = process.env.SERVER_PORT
const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(routes);



app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
});