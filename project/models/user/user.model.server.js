var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('OFM_UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findAllUsersForRole = findAllUsersForRole;
userModel.findAllFamilyMembers = findAllFamilyMembers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.searchAndFilterUsers = searchAndFilterUsers;
userModel.findAllFollowedUsers = findAllFollowedUsers;
userModel.findRestrictedUserDetailsById = findRestrictedUserDetailsById;

module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findRestrictedUserDetailsById(userId) {
    return userModel
        .findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function findAllUsersForRole(role) {
    return userModel
        .find({role: role});
}

function findAllFamilyMembers(userId) {
    return userModel
        .find({$or: [ { _id: userId },
                { _houseHoldUser : userId } ]});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    delete newUser._houseHoldUser;
    return userModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function searchAndFilterUsers(followedUsers, searchText) {
    if(searchText && searchText === 'All') {
        return userModel
            .find({_id: { $nin: followedUsers }});
    } else {
        return userModel
            .find({
                _id: { $nin: followedUsers },
                $or: [ { firstName: {'$regex' : searchText, '$options' : 'i'} },
                    { lastName : {'$regex' : searchText, '$options' : 'i'} } ] });
    }
}

function findAllFollowedUsers(followedUsers) {
    return userModel
        .find({_id: { $in: followedUsers }});
}