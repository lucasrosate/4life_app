import jwt from 'jsonwebtoken';
import { Request, Response} from 'express';

import {CallbackType} from '../../interfaces';

const verifyUser = (req: Request, res: Response, next: CallbackType) => {
    const token = req.body!.token;

    if (!token) return res.status(401).json({ message: "Access denied." });

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
        req.user = verified;
        next();

    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = verifyUser;