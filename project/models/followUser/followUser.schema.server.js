var mongoose = require('mongoose');

var followUserSchema = mongoose.Schema({
    _userFollowing: {type: mongoose.Schema.Types.ObjectId, ref: "OFM_UserModel"},
    _userFollowed: {type: mongoose.Schema.Types.ObjectId, ref: "OFM_UserModel"},
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'OFM_followUser'});

module.exports = followUserSchema;