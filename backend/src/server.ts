const express = require('express');
import { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3333;


app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('this is a test')
});


app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
});