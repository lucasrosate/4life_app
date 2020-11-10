const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const PhotoSchema = new Schema({
    filename: string,
    _user: { type: Schema.Types.ObjectId, ref: 'User'}

});


module.exports = PhotoSchema;