const app = require('../../express');
var followUserModel = require('../models/followUser/followUser.model.server');

app.post('/api/project/followUser', followUser);
app.get('/api/project/followUser/:followingUserId', findAllFollowUsersForUser);
app.get('/api/project/followUser/:followingUserId/search/:searchText', searchUser);
app.delete('/api/project/followUser/:followingUserId/:followedUserId', unfollowUser);

function followUser(req, res) {
    var followUserObj = req.body;
    followUserModel
        .followUser(followUserObj)
        .then(function (followUserObj) {
            res.json(followUserObj);
        });
}

function findAllFollowUsersForUser(req, res) {
    followUserModel
        .findAllFollowUsersForUser(req.params.followingUserId)
        .then(function (followedUsers) {
            res.json(followedUsers);
        })
}

function searchUser(req, res) {
    followUserModel
        .searchUser(req.params.followingUserId, req.params.searchText)
        .then(function (userList) {
            res.json(userList);
        })
}

function unfollowUser(req, res) {
    followUserModel
        .unfollowUser(req.params.followingUserId, req.params.followedUserId)
        .then(function (status) {
            res.json(status);
        });
}