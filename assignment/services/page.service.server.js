const app = require('../../express');

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "title": "Post 1 title" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "title": "Post 2 title" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "title": "Post 3 title" }
];

app.post('/api/assignment/website/:websiteId/page', createPage);
app.get('/api/assignment/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/assignment/page/:pageId', findPageById);
app.put('/api/assignment/page/:pageId', updatePage);
app.delete('/api/assignment/page/:pageId', deletePage);

function createPage(req, res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.json(page);
}

function findAllPagesForWebsite(req, res) {
    var results = [];
    for(var p in pages) {
        if(pages[p].websiteId === req.params.websiteId) {
            pages[p].created = new Date();
            pages[p].accessed = new Date();
            results.push(pages[p]);
        }
    }
    res.json(results);
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];
    for(var p in pages) {
        if(pages[p]._id === pageId) {
            res.send(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
}

function updatePage(req, res) {
    var page = req.body;
    for(var p in pages) {
        if(pages[p]._id === req.params.pageId) {
            pages[p] = page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    for(var p in pages) {
        if(pages[p]._id === pageId) {
            pages.splice(p, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}