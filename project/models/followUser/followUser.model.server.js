var mongoose = require('mongoose');
var followUserSchema = require('./followUser.schema.server');
var followUserModel = mongoose.model('OFM_FollowUserModel', followUserSchema);
var userModel = require('../user/user.model.server');

followUserModel.findAllFollowUsersForUser = findAllFollowUsersForUser;
followUserModel.followUser = followUser;
followUserModel.unfollowUser = unfollowUser;
followUserModel.searchUser = searchUser;

module.exports = followUserModel;

function findAllFollowUsersForUser(followingUserId) {
    return followUserModel
        .find({_userFollowing: followingUserId}, {_id: 0, _userFollowed:1})
        .then(function (followedUsers) {
            var followedUsersArr = [];
            for(var i in followedUsers)
            {
                followedUsersArr.push(followedUsers[i]._userFollowed);
            }
            return userModel
                .findAllFollowedUsers(followedUsersArr);
        })
}

function followUser(followUserObj) {
    return followUserModel
        .create(followUserObj);
}

function unfollowUser(followingUserId, followedUserId) {
    return followUserModel
        .remove({_userFollowing: followingUserId, _userFollowed: followedUserId});
}

function searchUser(followingUserId, searchText ) {
    return followUserModel
        .find({_userFollowing: followingUserId}, {_id: 0, _userFollowed:1})
        .then(function (followedUsers) {
            var followedUsersArr = [];
            followedUsersArr.push(followingUserId);
            for(var i in followedUsers)
            {
                followedUsersArr.push(followedUsers[i]._userFollowed);
            }
            return userModel
                .searchAndFilterUsers(followedUsersArr, searchText);
        })
}

