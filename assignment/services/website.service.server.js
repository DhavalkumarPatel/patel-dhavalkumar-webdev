const app = require('../../express');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Facebook Description" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Tweeter Description" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Gizmodo Description" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Go Description" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Tic Tac Toe Description" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Checkers Description" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Chess Description" }
];

app.post('/api/assignment/user/:userId/website', createWebsite);
app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.get('/api/assignment/website/:websiteId', findWebsiteById);
app.put('/api/assignment/website/:websiteId', updateWebsite);
app.delete('/api/assignment/website/:websiteId', deleteWebsite);

function createWebsite(req, res) {
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    websites.push(website);
    res.json(website);
}

function findAllWebsitesForUser(req, res) {
    var results = [];
    for(var v in websites) {
        if(websites[v].developerId === req.params.userId) {
            websites[v].created = new Date();
            websites[v].accessed = new Date();
            results.push(websites[v]);
        }
    }
    res.json(results);
}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    for(var w in websites) {
        if(websites[w]._id === websiteId) {
            res.send(websites[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function updateWebsite(req, res) {
    var website = req.body;
    for(var w in websites) {
        if(websites[w]._id === req.params.websiteId) {
            websites[w] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    for(var w in websites) {
        if(websites[w]._id === websiteId) {
            websites.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}