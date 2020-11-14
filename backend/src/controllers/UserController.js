const mongoose = require('mongoose');
const UserSchema = require('../models/UserModel');

const User = mongoose.model('User', UserSchema)

const UserView = require('../views/UserView');
require('dotenv').config;



isloggedin = async (req, res) => {
    return res.status(200).json({ ans: true });
}

getUserInfo = async (req, res) => {
    user = User.findOne({ username: req.body.username },
        async (err, user) => {
            if (err) return res.status(401).json({ message: "Erro na busca." })

            if (!user) {
                return res.status(200).json({ message: "Usuário não encontrado." });
            } else {
                return res.status(200).json({ user: UserView(user) });
            }
        });

}


getUploadToken = async (req, res) => {
    return res.status(200).json({token: process.env.UPLOAD_ACCESS_TOKEN_SECRET})
}



changeUserProperty = async (req, res) => {

    User.findOne({
        username: req.body.username,
    },
        async (err, user) => {
            const newVal = req.body.newVal;
            const option = req.body.option;

            if (err) return res.status(401).json({ success: false, message: "Erro ao se conectar com o servidor." })

            if (!user) {

                return res.status(401).json({ success: false, message: "Esse nome de usuário já existe." })

            } else {

                switch (option) {
                    case 0:
                        user.username = newVal;
                        break;

                    case 1:
                        user.firstname = newVal;
                        break;

                    case 2:
                        user.lastname = newVal;
                        break;

                    case 3:
                        user.email = newVal;
                        break;

                    case 4:
                        user.phone = newVal;
                        break;

                    case 5:
                        user.state = newVal;
                        break;

                    case 6:
                        user.birth = newVal;
                        break;
                }

                user.save((err, user) => {
                    if (err) return res.status(200).json({ success: false, message: "Já existe." });
                    return res.status(200).json({ success: true, message: "Alterado com sucesso." });
                });
            }
        })
}

module.exports = {
    isloggedin,
    getUserInfo,
    getUploadToken,
    changeUserProperty
}