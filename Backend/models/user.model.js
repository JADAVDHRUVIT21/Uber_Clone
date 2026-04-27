const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('react');


const userSchema = new mongoose.Schema({
    fullname: {
    firstname: {
        type: String,
        required: true,
        minlength: [3, 'First name must be at least 3 characters long'],
    },
    lastname: {
        type: String,
        required: true,
        minlength: [2, 'Last name must be at least 2 characters long']
    }
},
   email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Email must be at least 5 characters long'],
}, 
    password: {
        type: String,
        required: true,
        select: false,
    },
    soketId: {
        type: String,
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    return await bycrypt.compare(password, this.password);
}

userSchema.static.hashPassword = async function(password) {
    return await bycrypt.hash(password, 10);
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;