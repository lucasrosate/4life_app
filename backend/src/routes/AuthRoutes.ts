import express from 'express'
import {
    signup,
    signin,
    confirmAccount,
    lostPassword,
    confirmLostPassword
} from '../controllers/AuthController';

require('dotenv').config();

const routes = express.Router();

routes.post('/signup', signup);
routes.post('/signin', signin);
routes.post('/lostpassword', lostPassword);
routes.get('/user/confirm_account/:username/:confirmToken', confirmAccount);
routes.get('/user/lost_password_confirm/:username/:confirmToken', confirmLostPassword);



export default routes;