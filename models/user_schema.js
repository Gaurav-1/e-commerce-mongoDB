const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    mail: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isVerified: {type: Boolean, required: true},
    role: {type: String, required: true}
})

const users = mongoose.model('user',UserSchema);

module.exports = users;