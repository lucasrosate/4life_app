const mongoose = require('mongoose');
const UserSchema = require('../models/UserModel');

const User = mongoose.model('User', UserSchema)

const UserView = require('../views/UserView');

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


changeUserProperty = async (req, res) => {
    user = User.findOne({
        username: req.body.username,
        newVal: req.body.newVal,
        option: req.body.option,
    },
        async (err, user) => {
            if (err) return res.status(401).json({})

            if (!user) {
                return res.status(401).json({ success: false })
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
                        user.stateplace = newVal;
                        break;
                }
                user.save();


                return res.status(200).json({ success: true })
            }
        })
}

module.exports = {
    isloggedin,
    getUserInfo,
    changeUserProperty
}