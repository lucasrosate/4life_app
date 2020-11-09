const express = require('express');

const verifyUser = require('../middlewares/verifyToken');


const { isloggedin, getUserInfo } = require('../controllers/UserController');



routes = express.Router();

routes.post('/isloggedin', verifyUser, isloggedin);

routes.post('/getuserinfo', verifyUser, getUserInfo);

module.exports = routes;