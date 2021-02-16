import mongoose, { mongo, Mongoose } from "mongoose";
import bcrypt from 'bcrypt';
import { IUser } from "../../interfaces";

export interface IUserModel extends mongoose.Document, IUser { };

const UserSchema = new mongoose.Schema({
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
        unique: 1,
    },

    password: {
        type: String,
        require: true,
        minlength: 8,
        maxlength: 1024
    },

    email: {
        type: String,
        require: true,
        unique: 1,
        maxlength: 255
    },

    state: {
        type: String,
        require: true,
        maxlength: 30,
    },


    phone: {
        type: String,
        require: true,
        maxlength: 14
    },

    birth: {
        type: Date,
        require: false,
    },

    authentication: {
        isActivated: {
            type: Boolean,
            require: true
        },
        validateToken: {
            type: String,
            require: false
        },
        tokenType: {
            type: String,
            require: false,
        },
        created_at: {
            type: Date,
            require: false
        }
    }


});

UserSchema.pre("save", function (this: IUserModel, next) {
    const user = this;

    if (this.isModified("password") || this.isNew) {
            bcrypt.hash(user.password, 10, function (err, hash) {
                if (err) return next(err);

                user.password = hash;
                next();
            });
    } else {
        return next();
    }
});


const User: mongoose.Model<IUserModel> = mongoose.model<IUserModel>("user", UserSchema);


export default User;