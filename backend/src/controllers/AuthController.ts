import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUserModel } from '../models/UserModel'
import sendMail from '../services/NodeMailerServices';
import { tokenPassTextMessage, tokenPassHTMLMessage } from '../html/tokenPassHTMLMessage';
import { tokenPassTextMessageSuccess, tokenPassHTMLMessageSuccess } from '../html/tokenPassHTMLMessageSuccess';
import getRandomUserValidateLink from '../common/functions/getRandomUserValidateLink';

import { Request, Response } from 'express';
import {tokenPassLostAccountHTMLMessage, tokenPassLostAccountMessage } from '../html/tokenPassLostAccountHTMLMessage';

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

    if (!firstname || !lastname || !username || !password || !email || !state || !phone)
        return res.status(200).json({
            succcess: false,
            message: "Nem todos os campos foram registrados."
        });

    const randomUserConfirmKey = await getRandomUserValidateLink(username);

    const user = new User({
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        email: email,
        state: state,
        phone: phone,
        authentication: {
            isActivated: false,
            validateToken: randomUserConfirmKey,
            created_at: Date.now()
        }
    });

    try {
        user.authentication.tokenType = "USER_ACCOUNT_CONFIRM"
        await user.save();

        const confirmTokenUrl = `http://localhost:3000/user/confirm_account/${username}/${randomUserConfirmKey}`;

        sendMail(
            "Confirmação de conta - Ativação",
            email,
            tokenPassTextMessage(username, confirmTokenUrl),
            tokenPassHTMLMessage(username, confirmTokenUrl)
        );

    } catch (err) {
        return res.status(200).json({
            succcess: false,
            message: "Erro durante o registro. O usuário pode já existir. Erro: " + err
        });
    }

    return res.status(200).json({
        success: true,
        message: "Registrado com sucesso."
    });
}


export const signin = async (req: Request, res: Response) => {

    User.findOne({
        username: req.body.username
    }, async (err, user) => {

        if (err) return res.status(401).json({ message: err });

        var password: string;

        if (!user) {
            return res.status(401).json({
                isAuthenticated: false,
                message: "Usuário não existente."
            });
        } else {
            password = req.body.password;
            const isPassValid = await bcrypt.compare(password, user.password);

            if (isPassValid) {
                const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET as string);

                return res.status(200)
                    .header('Access-Control-Expose-Headers', 'auth-token')
                    .header('auth-token', token)
                    .json({
                        isAuthenticated: true,
                        message: "isAuthenticatedo."
                    });
            } else {
                return res.status(200)
                    .json({
                        isAuthenticated: false,
                        message: "Senha inválida."
                    });
            }
        }
    })
}


export const confirmAccount = async (req: Request, res: Response) => {
    const username = req.params.username;
    const confirmToken = req.params.confirmToken;


    User.findOne({ username: username },
        (err, user) => {
            if (err)
                return res.status(200).json({
                    success: false,
                    message: `Erro durante a busca. ${err}`
                });

            if (!user)
                return res.status(200).json({
                    success: false,
                    message: "Usuário não encontrado."
                });

            if (user.authentication.validateToken === confirmToken && user.authentication.tokenType === "USER_ACCOUNT_CONFIRM") {
                user.authentication.isActivated = true;
                user.authentication.validateToken === "";

                user.save();

                sendMail(
                    "Sua conta foi ativada",
                    user.email,
                    tokenPassTextMessageSuccess(user.username),
                    tokenPassHTMLMessageSuccess(user.username)
                )

                return res.status(200).json({
                    success: true,
                    message: "Usuário confirmado."
                });
            }
        });
}

export const lostPassword = async (req: Request, res: Response) => {
    const email = req.body.email;

    User.findOne({email: email}, async (err, user) => {
        if(err) return res.status(404).json({"done": true});
        
        if(!user) return res.status(404).json({"done": true});

        const username = user.username;
        const randomUserConfirmKey = await getRandomUserValidateLink(username);

        user.authentication.validateToken = randomUserConfirmKey;
        user.authentication.tokenType = "USER_RECOVER_PASSWORD";
        user.save();

        const confirmTokenUrl = `http://localhost:3000/user/confirm_account/${username}/${randomUserConfirmKey}`;

        sendMail(
            "Recuperação de senha",
            email,
            tokenPassLostAccountMessage(username, confirmTokenUrl),
            tokenPassLostAccountHTMLMessage(username, confirmTokenUrl)
            );
    });


}

export const confirmLostPassword = async (req: Request, res: Response) => {

}