const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        maxlength: 11
    }

})

mongoose.model('User', UserSchema);

UserSchema.pre('save', function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }

                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});


UserSchema.methods.comparePassword = (pass, cb) => {
    bcrypt.compare(pass, this.password, function(err, isMatch) {
        if(err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
}




module.exports = UserSchema;