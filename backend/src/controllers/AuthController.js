
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

UserSchema = require('../models/User')

require('dotenv').config();

const User = mongoose.model('User', UserSchema)

signup = async (req, res) => {
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
    },
        (err) => {
            if (err) return res.status(200).json({ message: "Erro no recebimento." })

        });

    try {
        await user.save();
    } catch (err) {
        return res.status(409).json({ message: "Esse usuário já existe, tente novamente." });
    }

    return res.status(200).json({ message: "Registrado com sucesso." });
}


signin = async (req, res) => {

    if (req.body.password == undefined) return res.status(401).json({ message: "password does not exist. It must contain username and password" });


    User.findOne({
        username: req.body.username
    }, async (err, user) => {
        if (err) return res.status(401).json({ message: err });

        if (!user) {
            return res.status(401).json({ message: "Usuário não existente." });
        } else {
            pass = req.body.password;
            const isPassValid = await bcrypt.compare(pass, user.password);

            if (isPassValid) {
                const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);

                user_data = {
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


module.exports = {
    signin,
    signup
}