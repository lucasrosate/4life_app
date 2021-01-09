const mongoose = require('mongoose');
const UserSchema = require('../models/UserModel');
const PhotoSchema = require('../models/PhotoModel');

const User = mongoose.model('User', UserSchema)
const UserView = require('../views/UserView');

const Photo = mongoose.model('Photo', PhotoSchema)
const PhotoView = require('../views/PhotoView');

const { uploadFile, getTemporaryPictureLink, deleteFile } = require('../services/DropboxServices');
const decodePicture = require('../common/functions/decodePicture');


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
    return res.status(200).json({ token: process.env.UPLOAD_ACCESS_TOKEN_SECRET })
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

uploadProfilePicture = async (req, res) => {
    const username = req.body.username
    var encodedPicture = req.body.encodedPicture;

    User.findOne({
        username: username
    }, async (err, user) => {
        if (err) return err;

        if (!user) return { message: "usuário não encontrado" }


        //const ImgInfo = convertPicture(encodedPicture, user._id);

        // dados que retornam = arquivo e o nome do arquivo
        const pictureData = decodePicture(encodedPicture, user._id);

        // const statusUpload = await uploadFile(ImgInfo.pictureFile);

        // envia arquivo e o nome para a função que irá upar no DropBox o arquivo
        const pictureFileUploadStatus =
            await uploadFile('profilePictures', pictureData.pictureName, pictureData.picture);


        if (pictureFileUploadStatus.status === 200) {
            Photo.findOne({
                _user: user
            }, async (err, photo) => {
                if (err) return err;

                if (!photo) {
                    const newPhoto = new Photo({
                        filename: pictureData.pictureName,
                        _user: user
                    })
                    newPhoto.save()

                } else {
                    await deleteFile('profilePictures', photo.filename);

                    photo.filename = pictureData.pictureName;
                    photo.temporaryLink.src = await getTemporaryPictureLink('profilePictures', photo.filename);
                    photo.temporaryLink.created_at = Date.now();
                    photo.save();
                }

            })
        }
    });
    return res.status(200).send('ok');

}

getProfilePicture = async (req, res) => {
    User.findOne({
        username: req.body.username,
    }, async (err, user) => {
        if (err) return res.status(400).json({ message: err, showPhoto: false, url: '' });

        if (!user) {
            return res.status(401).json({ message: "usuário não encontrado", showPhoto: false, url: '' });
        } else {
            Photo.findOne({
                _user: user._id
            }, async (err, photo) => {
                if (err) return res.status(400).json(err);

                if (!photo) return res.json(404).json({ message: "usuário sem foto", hasPhoto: false, url: '' })

                else {
                    var expired_at = photo.temporaryLink.created_at;

                    if (expired_at) expired_at.setHours(expired_at.getHours() + 4);
                    const now = Date.now();

                    var url;

                    if (now > expired_at || expired_at === undefined) {
                        url = await getTemporaryPictureLink(photo.filename, 'profilePictures');
                        photo.temporaryLink.src = url;
                        photo.temporaryLink.created_at = now;
                        photo.save();
                    } else {
                        url = photo.temporaryLink.src;
                    }


                    return res.status(200).json({ message: "usuário com foto", hasPhoto: true, url: url })
                }
            })
        }
    })
}



module.exports = {
    isloggedin,
    getUserInfo,
    getUploadToken,
    changeUserProperty,
    uploadProfilePicture,
    getProfilePicture
}