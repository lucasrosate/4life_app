import mongoose from 'mongoose';
import { IPhoto } from '../../interfaces';

interface IPhotoModel extends mongoose.Document, IPhoto {}

const PhotoSchema = new mongoose.Schema({

    //nome do arquivo upado
    filename: {
        type: String
    },

    //ForeignKey com do usuário que upou a imagem
    _user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },

    temporaryLink: {
        src: {
            type: String
        },

        created_at: {
            type: Date
        }
    },

});

const Photo: mongoose.Model<IPhotoModel> = mongoose.model<IPhotoModel>("Photo", PhotoSchema);

export default Photo;