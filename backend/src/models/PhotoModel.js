const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const PhotoSchema = new Schema({

    //nome do arquivo upado
    filename: {
        type:String
    },

    //ForeignKey com do usuário que upou a imagem
    _user: { 
        type: Schema.Types.ObjectId, ref: 'User'
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


module.exports = PhotoSchema;