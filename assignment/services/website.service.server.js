const app = require('../../express');
var websiteModel = require('../models/website/website.model.server');

app.post('/api/assignment/user/:userId/website', createWebsite);
app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.get('/api/assignment/website/:websiteId', findWebsiteById);
app.put('/api/assignment/website/:websiteId', updateWebsite);
app.delete('/api/assignment/user/:userId/website/:websiteId', deleteWebsite);

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website);
        });
}

function findAllWebsitesForUser(req, res) {
    websiteModel
        .findAllWebsitesForUser(req.params.userId)
        .then(function (websites) {
            res.json(websites);
        })
}


function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
        });
}

function updateWebsite(req, res) {
    var website = req.body;
    websiteModel
        .updateWebsite(req.params.websiteId, website)
        .then(function (status) {
            res.send(status);
        });
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var userId = req.params.userId;
    websiteModel
        .deleteWebsiteFromUser(userId, websiteId)
        .then(function (status) {
            res.json(status);
        });
}