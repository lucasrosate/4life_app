import axios from 'axios';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
require('dotenv').config;


const USER = process.env.SMTP_EMAIL
const CLIENT_ID = process.env.GOOGLE_OAUTH2_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH2_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_OAUTH2_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_OAUTH2_REFRESH_TOKEN as string;

console.log(USER, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN);

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (username: string, email: string, text: string, htmlText: string) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
            }
        });

        const auth = {
            user: USER,
            refreshToken: REFRESH_TOKEN,
            acessToken: accessToken
        }

        const mailOptions = {
            auth: auth,
            from: `4LifeApp <${USER}>`,
            to: email,
            subject: "Recuperação de senha",
            text: text
            
        }

        const result = await transport.sendMail(mailOptions);

        console.log(result);

    } catch (error) {
        return console.log(error);
    }
}