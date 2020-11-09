const mongoose = require('mongoose');
const UserSchema = require('../models/User');

const User = mongoose.model('User', UserSchema)

const UserView = require('../views/UserView');

isloggedin = async (req, res) => {
    return res.status(200).json({ ans: true });
}

getUserInfo = async (req, res) => {
    user = User.findOne({ username: req.body.username },
    async (err, user) => {
        if(err) return res.status(401).json({message: "Erro na busca."})

        if(!user) {
            return res.status(200).json({message: "Usuário não encontrado."});
        } else {
            return res.status(200).json({ user: UserView(user) });
        }
    });

}


module.exports = {
    isloggedin,
    getUserInfo
}