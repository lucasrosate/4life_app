const express = require('express');

const verifyUser = require('../middlewares/verifyToken');


const { isloggedin, getUserInfo, getUploadToken, changeUserProperty } = require('../controllers/UserController');



routes = express.Router();

routes.post('/isloggedin', verifyUser, isloggedin);
routes.post('/getuserinfo', verifyUser, getUserInfo);
routes.post('/getuploadtoken', verifyUser, getUploadToken)
routes.post('/changeuserproperty', verifyUser, changeUserProperty);

module.exports = routes;