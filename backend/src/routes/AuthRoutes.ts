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
routes.get('user/confirm/:username/:confirmToken', confirmAccount);
routes.post('/lostpassword', lostPassword);
routes.post('user/lostpassconfirm/:username/:confirmToken', confirmLostPassword);


export default routes;