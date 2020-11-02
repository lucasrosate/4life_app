
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

UserSchema = require('./models/User')

require('dotenv').config();




const User = mongoose.model('User', UserSchema)

const routes = express.Router();

routes.post('/signup', (req, res, next) => {
    
    const
    {
    firstname, 
    lastname, 
    username, 
    password,
    email, 
    state,
    phone
    } = req.body;


    const user = User.create({
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        email: email,
        state: state,
        phone: phone
    },
     (err) => {
        if(err) return res.status(403).json({error : err})

        else
            return res.status(200).json({"message" : "Registrado com sucesso."});
    });

})


routes.post('/signin', (req, res) => {
    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) throw err;

        if(!user) {
            res.status(401).json({message: "Autenticação falhou."});
        } else {
            
        }
    })
})


module.exports = routes;