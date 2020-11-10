const express = require('express');

const verifyUser = require('../middlewares/verifyToken');


const { isloggedin, getUserInfo, getUserId } = require('../controllers/UserController');



routes = express.Router();

routes.post('/isloggedin', verifyUser, isloggedin);
routes.post('/getuserinfo', verifyUser, getUserInfo);
routes.post('/changeuserproperty', verifyUser, changeUserProperty);

module.exports = routes;