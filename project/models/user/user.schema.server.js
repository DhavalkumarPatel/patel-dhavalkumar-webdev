var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    google: {
        id: String,
        token: String
    },
    facebook: {
        id:    String,
        token: String
    },
    role: {type: String, enum: ['HOUSEHOLD', 'FAMILY-MEMBER', 'ADMIN']},
    phone: {type: Number},
    dob: {type: Date},
    address: String,
    _houseHoldUser: {type: mongoose.Schema.Types.ObjectId, ref: "OFM_UserModel"},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "OFM_user"});

module.exports = userSchema;