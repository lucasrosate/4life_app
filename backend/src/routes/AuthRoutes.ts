import express from 'express'
import {signup, signin} from '../controllers/AuthController';

require('dotenv').config();

const routes = express.Router();

routes.post('/signup', signup);
routes.post('/signin',  signin);


export default routes;