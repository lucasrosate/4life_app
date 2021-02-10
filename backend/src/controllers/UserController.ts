import User from '../models/UserModel';
import Photo from '../models/PhotoModel';

import { uploadFile, getTemporaryPictureLink, deleteFile } from '../services/DropboxServices';
import UserView from '../views/UserView';
import decodePicture from '../common/functions/decodePicture';

import { Request, Response } from 'express';

require('dotenv').config;

export const isloggedin = async (req: Request, res: Response) => {
    return res.status(200).json({ isAuthenticated: true });
}

export const getUserInfo = async (req: Request, res: Response) => {
    User.findOne({ username: req.body.username },
        async (err, user) => {
            if (err) return res.status(401).json({isAuthenticated: false, message: "Erro na busca." })

            if (!user) {
                return res.status(200).json({ isAuthenticated: false, message: "Usuário não encontrado." });
            } else {
                return res.status(200).json({ isAuthenticated: true, user: UserView(user), message: "Usuário encontrado" });
            }
        });

}


export const getUploadToken = async (req: Request, res: Response) => {
    return res.status(200).json({ token: process.env.UPLOAD_ACCESS_TOKEN_SECRET })
}



export const changeUserProperty = async (req: Request, res: Response) => {

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

export const uploadProfilePicture = async (req: Request, res: Response) => {
    console.log("entrou")
    const username = req.body.username
    var encodedPicture = req.body.encodedPicture;

    User.findOne({
        username: username
    }, async (err, user) => {
        if (err) return err;

        if (!user) return res.status(200).json({ message: "usuário não encontrado.", success: false })


        //const ImgInfo = convertPicture(encodedPicture, user._id);

        // dados que retornam = arquivo e o nome do arquivo
        const pictureData: { picture: Buffer, pictureName: string }
            = decodePicture(encodedPicture, user._id);



        // const statusUpload = await uploadFile(ImgInfo.pictureFile);

        // envia arquivo e o nome para a função que irá upar no DropBox o arquivo
        const pictureFileUploadStatus =
            await uploadFile('profilePictures', pictureData.pictureName, pictureData.picture);


        if (pictureFileUploadStatus.status === 200) {
            Photo.findOne({
                _user: user.id
            }, async (err, photo) => {
                if (err) return err;

                if (!photo) {
                    const newPhoto = new Photo({
                        filename: pictureData.pictureName,
                        _user: user
                    })
                    newPhoto.save()

                } else {
                    await deleteFile('profilePictures', photo.filename as string);

                    photo.filename = pictureData.pictureName;
                    photo.temporaryLink.src = await getTemporaryPictureLink('profilePictures', photo.filename);
                    photo.temporaryLink.created_at = String(Date.now());
                    photo.save();
                }

                return res.status(200).json({ message: "Usuário sem foto", success: true });
            })
        } else {
            return res.status(200).json({ message: "Upload sem sucesso.", success: false });
        }
    });


}

export const getProfilePicture = async (req: Request, res: Response) => {
    User.findOne({
        username: req.body.username,
    }, async (err, user) => {
        if (err) return res.status(400).json({ message: err, hasPhoto: false, url: '' });

        if (!user) {
            return res.status(401).json({ message: "Usuário não encontrado", hasPhoto: false, url: '' });
        } else {
            Photo.findOne({
                _user: user._id
            }, async (err, photo) => {
                if (err) { return res.status(400).json(err); }

                if (!photo) { return res.status(200).json({ message: "Usuário sem foto", hasPhoto: false, url: '' }); }

                else {
                    var expired_at = new Date(photo.temporaryLink.created_at as string);

                    if (expired_at) expired_at.setHours(expired_at.getHours() + 4);
                    const now = new Date(Date.now());

                    var url;

                    if (now > expired_at || expired_at === undefined) {
                        url = await getTemporaryPictureLink(photo.filename as string, 'profilePictures');
                        if (url.status !== 409) {
                            photo.temporaryLink.src = url;
                            photo.temporaryLink.created_at = String(now);
                            photo.save();
                        }
                        return res.status(200).json({ message: "Usuário sem foto", hasPhoto: false, url: url });
                    } else {
                        url = photo.temporaryLink.src;
                    }
                    return res.status(200).json({ message: "Usuário com foto", hasPhoto: true, url: url });
                }
            })
        }
    })
}


