const app = require('../../express');
var pageModel = require('../models/page/page.model.server');

app.post('/api/assignment/website/:websiteId/page', createPage);
app.get('/api/assignment/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/assignment/page/:pageId', findPageById);
app.put('/api/assignment/page/:pageId', updatePage);
app.delete('/api/assignment/website/:websiteId/page/:pageId', deletePage);

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    pageModel
        .createPageForWebsite(websiteId, page)
        .then(function (page) {
            res.json(page);
        });
}

function findAllPagesForWebsite(req, res) {
    pageModel
        .findAllPagesForWebsite(req.params.websiteId)
        .then(function (pages) {
            res.json(pages);
        })
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        });
}

function updatePage(req, res) {
    var page = req.body;
    pageModel
        .updatePage(req.params.pageId, page)
        .then(function (status) {
            res.send(status);
        });
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    var websiteId = req.params.websiteId;
    pageModel
        .deletePageFromWebsite(websiteId, pageId)
        .then(function (status) {
            res.json(status);
        });
}