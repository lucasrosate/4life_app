import express from 'express';

import verifyUser from '../middlewares/verifyUser';

import {
    isloggedin,
    getUserInfo,
    changeUserProperty,
    uploadProfilePicture,
    getProfilePicture,
    setUserPassword
} from '../controllers/UserController';



const routes = express.Router();

routes.post('/isloggedin', verifyUser, isloggedin);
routes.post('/getuserinfo', verifyUser, getUserInfo);
routes.post('/changeuserproperty', verifyUser, changeUserProperty);
routes.post('/uploadprofilepicture', verifyUser, uploadProfilePicture);
routes.post('/getprofilepicture', verifyUser, getProfilePicture);
routes.put('/setuserpassword', verifyUser, setUserPassword);

export default routes;