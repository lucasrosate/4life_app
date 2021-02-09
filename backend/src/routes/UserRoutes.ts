const express = require('express');

import verifyUser from '../middlewares/verifyUser';

import {
    isloggedin,
    getUserInfo,
    getUploadToken,
    changeUserProperty,
    uploadProfilePicture,
    getProfilePicture
} from '../controllers/UserController';



const routes = express.Router();

routes.post('/isloggedin', verifyUser, isloggedin);
routes.post('/getuserinfo', verifyUser, getUserInfo);
routes.post('/getuploadtoken', verifyUser, getUploadToken);
routes.post('/changeuserproperty', verifyUser, changeUserProperty);
routes.post('/uploadprofilepicture', verifyUser, uploadProfilePicture);
routes.post('/getprofilepicture', verifyUser, getProfilePicture);

export default routes;