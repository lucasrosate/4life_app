import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { DocumentQuery } from 'mongoose';
import User, { IUserModel } from '../models/UserModel';

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user)
            return res.status(200).json({ isAuthenticated: false, message: "Esse usuário não existe" });

        const token = req.body.token;
        if (!token) return res.status(401).json({ isAuthenticated: false, message: "Acesso negado." });

        try {
            const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

            if (verified) {
                res.locals.user = user;
                next();
            }

        } catch (error) {
            res.status(403).json({ isAuthenticated: false, message: "Passe inválido." });
        }

    } catch (error) {
        return res.status(401).json({ isAuthenticated: false, message: "Erro durante a busca do usuário.", error: error });
    }
}


export default verifyUser;
