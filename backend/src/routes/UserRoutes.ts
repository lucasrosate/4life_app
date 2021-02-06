const express = require('express');

const verifyUser = require('../middlewares/verifyToken');


const { isloggedin, getUserInfo, getUploadToken, changeUserProperty, uploadProfilePicture, getProfilePicture } = require('../controllers/UserController');



const routes = express.Router();

routes.post('/isloggedin', verifyUser, isloggedin);
routes.post('/getuserinfo', verifyUser, getUserInfo);
routes.post('/getuploadtoken', verifyUser, getUploadToken);
routes.post('/changeuserproperty', verifyUser, changeUserProperty);
routes.post('/uploadprofilepicture', verifyUser, uploadProfilePicture);
routes.post('/getprofilepicture', verifyUser, getProfilePicture);

export default routes;