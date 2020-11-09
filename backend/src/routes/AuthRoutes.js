
const express = require('express');

UserSchema = require('../models/User')

require('dotenv').config();

const { signup, signin } = require('../controllers/AuthController');

const routes = express.Router();

routes.post('/signup', signup);
routes.post('/signin',  signin);


module.exports = routes;