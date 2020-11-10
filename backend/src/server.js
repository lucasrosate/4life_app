const express = require('express');
const mongoose = require('mongoose');
const AuthRoutes = require('./routes/AuthRoutes');
const UserRoutes = require('./routes/UserRoutes');

require('dotenv').config();

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB.");
}).catch((err) => {
    console.log("Erro: could not connect to MongoDB server");
});


const port = process.env.SERVER_PORT
const app = express();

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    next();
});

app.use(express.json());

app.use(UserRoutes);
app.use(AuthRoutes);




app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
});