import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel'

import { Request, Response } from 'express';

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

    const salt = await bcrypt.genSalt(10).catch((error) => { throw error });

    if (!firstname || !lastname || !username || !password || !email || !state || !phone)
        return res.status(200).json({
            success: false,
            message: "Nem todos os campos foram registrados."
        });


    const hashedPassword = await bcrypt.hash(password, salt).catch((error) => { throw error });


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
        console.log(err)
        return res.status(200).json({
            success: false,
            message: "Esse usuário já existe, tente novamente."
        });
    }

    return res.status(200).json({
        success: true,
        message: "Registrado com sucesso."
    });
}


export const signin = async (req: Request, res: Response) => {

    if (req.body.password == undefined) return res.status(401).json({
        message: "A senha não existe. Ela deve ser preenchida."
    });


    User.findOne({
        username: req.body.username
    }, async (err, user) => {
        if (err) return res.status(401).json({ message: err });

        var password: string;

        if (!user) {
            return res.status(401).json({ message: "Usuário não existente." });
        } else {
            password = req.body.password;
            const isPassValid = await bcrypt.compare(password, user.password);

            if (isPassValid) {
                const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET as string);

                return res.status(200)
                    .header('Access-Control-Expose-Headers', 'auth-token')
                    .header('auth-token', token)
                    .json({
                        success: true,
                        message: "Successo."
                    });
            } else {
                return res.status(401)
                    .json({
                        success: false,
                        message: "Senha inválida."
                    });
            }


        }
    })
}

