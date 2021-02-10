import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


import AuthRoutes from './routes/AuthRoutes';
import UserRoutes from './routes/UserRoutes';

import {Request, Response} from 'express';
import { CallbackType } from '../interfaces';




require('dotenv').config();

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGO_URL as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB.");
}).catch((err) => {
    console.log("Erro: could not connect to MongoDB server");
});


const port = process.env.SERVER_PORT
const app = express();

app.use(cors())


app.use(function (req: Request, res: Response, next: CallbackType) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.setHeader("x-content-type-options", "nosniff");

    next();
});

app.use(express.json({limit: "1.2mb"}));
app.use(UserRoutes);
app.use(AuthRoutes);



app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
});