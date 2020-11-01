import mongoose from 'mongoose';
const { Schema } = mongoose;


const UserSchema = new Schema ({
    firstname: {
        type: String,
        require: true
    },

    lastname: {
        type: String,
        require: true
    },

    username: {
        type: String,
        require: true,
    },

    password: {
        type: String,
        require: true,
    },

    state: {
        type: String,
        require: true,
    },

    phone: {
        type: String,
        require: true
    }

})

export default UserSchema;