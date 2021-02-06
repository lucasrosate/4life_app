import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel'

import { Request, Response} from 'express';
import {IUser} from '../../interfaces';

require('dotenv').config();


export const signup = async (req: Request, res: Response) => {
    const
        {
            firstname,
            lastname,
            username,
            password,
            email,
            state,
            phone
        } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: hashedPassword,
        email: email,
        state: state,
        phone: phone
    });

    try {
        await user.save();
    } catch (err) {
        return res.status(409).json({ message: "Esse usuário já existe, tente novamente." });
    }

    return res.status(200).json({ message: "Registrado com sucesso." });
}


export const signin = async (req: Request, res: Response) => {

    if (req.body.password == undefined) return res.status(401).json({ message: "password does not exist. It must contain username and password" });


    User.findOne({
        username: req.body.username
    }, async (err, user) => {
        if (err) return res.status(401).json({ message: err });

        var pass: string;

        if (!user) {
            return res.status(401).json({ message: "Usuário não existente." });
        } else {
            pass = req.body.password;
            const isPassValid = await bcrypt.compare(pass, user.password);

            if (isPassValid) {
                const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET as string);

                const user_data = {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email,
                    state: user.state,
                    phone: user.phone
                }

                return res.status(200)
                    .header('Access-Control-Expose-Headers', 'auth-token')
                    .header('auth-token', token)
                    .json({ message: "Successo." });
            } else {
                return res.status(401)
                    .json({ message: "Senha inválida." });
            }


        }
    })
}

