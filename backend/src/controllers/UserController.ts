import User, { IUserModel } from '../models/UserModel';
import Photo from '../models/PhotoModel';

import { uploadFile, getTemporaryPictureLink, deleteFile } from '../services/DropboxServices';
import UserView from '../views/UserView';
import decodePicture from '../common/functions/decodePicture';

import { Request, Response } from 'express';
import { ITemporaryLink, IUser } from '../../interfaces';

require('dotenv').config;

export const isloggedin = async (req: Request, res: Response) => 
    res.status(200).json({ isAuthenticated: true });


export const getUserInfo = async (req: Request, res: Response) => {
    return res.status(200).json({
        user: UserView(res.locals.user as IUserModel),
        isAuthenticated: true,
        message: "Usuário encontrado"
    });
}

export const changeUserProperty = async (req: Request, res: Response) => {
    const user: IUserModel = res.locals.user;
    const newValue: string = req.body.newValue;
    const option: string = req.body.option;

    switch (option) {
        case "EDIT_USERNAME":
            const userExist = await User.findOne({ username: newValue });

            if (userExist) {
                user.username = newValue;
                return res.status(200).json({
                    isAuthenticated: false,
                    message: "Esse nome de usuário já existe."
                });
            } else {
                user.username = newValue;
            }
            break;

        case "EDIT_FIRSTNAME":
            user.firstname = newValue;
            break;

        case "EDIT_LASTNAME":
            user.lastname = newValue;
            break;

        case "EDIT_EMAIL":
            user.email = newValue;
            break;

        case "EDIT_PHONE":
            user.phone = newValue;
            break;

        case "EDIT_STATE":
            user.state = newValue;
            break;

        case "EDIT_BIRTH":
            user.birth = new Date(newValue);
            break;

        case "EDIT_PASSWORD":
            user.password = newValue;
            break;
        
        default:
            return res.status(200).json({
                isAuthenticated: false,
                message: "Opção inválida."
            });
    }

    user.save((err, user) => {
        if (err) {
            return res.status(200).json({
                isAuthenticated: false,
                message: "Erro durante o salvemento."
            });
        }

        return res.status(200).json({
            isAuthenticated: true,
            message: "Alterado com sucesso."
        });
    });
}

export const uploadProfilePicture = async (req: Request, res: Response) => {
    const user: IUserModel = res.locals.user;
    var encodedPicture = req.body.encodedPicture;


    //const ImgInfo = convertPicture(encodedPicture, user._id);

    // dados que retornam = arquivo e o nome do arquivo
    const pictureData: { picture: Buffer, pictureName: string }
        = decodePicture(encodedPicture, user._id);

    // const statusUpload = await uploadFile(ImgInfo.pictureFile);

    // envia arquivo e o nome para a função que irá upar no DropBox o arquivo
    const pictureFileUploadStatus =
        await uploadFile('profilePictures', pictureData.pictureName, pictureData.picture);

    if (pictureFileUploadStatus.status === 200) {
        await Photo.findOne({
            _user: user.id
        }, async (err, photo) => {
            if (err) return err;
            if (!photo) {
                const newPhoto = new Photo({
                    filename: pictureData.pictureName,
                    _user: user
                });
                newPhoto.save();

            } else {
                await deleteFile('profilePictures', photo.filename as string);

                const responseTemporaryLink: ITemporaryLink
                    = await getTemporaryPictureLink('profilePictures', pictureData.pictureName as string);

                photo.filename = pictureData.pictureName;
                photo.temporaryLink.src = responseTemporaryLink.link;
                photo.temporaryLink.created_at = Date.now().toString();
                photo.save();
            }

            return res.status(200).json({
                message: "Usuário sem foto",
                isAuthenticated: true
            });
        })
    } else {
        return res.status(200).json({
            message: "Upload sem sucesso.",
            isAuthenticated: false
        });
    }

}

export const getProfilePicture = async (req: Request, res: Response) => {
    const user: IUserModel = res.locals.user;

    Photo.findOne({
        _user: user._id
    }, async (err, photo) => {
        if (err) { return res.status(400).json(err); }

        if (!photo) { return res.status(200).json({ message: "Usuário sem foto", hasPhoto: false, url: '' }); }

        else {
            var will_expire_at = new Date(photo.temporaryLink.created_at as string);

            if (will_expire_at) will_expire_at.setMinutes(will_expire_at.getMinutes() + 60);
            const now = new Date(Date.now());

            var responseTemporaryLink: ITemporaryLink = { link: "", status: 404 };

            if ((now > will_expire_at || will_expire_at === undefined) || photo.temporaryLink.src === "") {

                if (photo.filename) {
                    responseTemporaryLink = await getTemporaryPictureLink('profilePictures', photo.filename);
                }

                if (responseTemporaryLink.status !== 409) {
                    photo.temporaryLink.src = responseTemporaryLink.link;
                    photo.temporaryLink.created_at = now.toString();
                    photo.save();
                } else {
                    return res.status(200).json({
                        message: "Usuário sem foto",
                        hasPhoto: false,
                        url: ""
                    });
                }
            } else {
                if (photo.filename && photo.temporaryLink.src?.startsWith("http")) {
                    responseTemporaryLink.link = photo.temporaryLink.src as string;
                } else {
                    return res.status(200).json({
                        message: "Usuário sem foto",
                        hasPhoto: false,
                        url: ""
                    });
                }

                return res.status(200).json({
                    message: "Usuário com foto",
                    hasPhoto: true,
                    url: responseTemporaryLink.link
                });
            }

        }
    });
}

