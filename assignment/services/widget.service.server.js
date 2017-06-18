const app = require('../../express');
var widgetModel = require('../models/widget/widget.model.server');

var multer = require('multer');
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

app.post('/api/assignment/page/:pageId/widget', createWidget);
app.get('/api/assignment/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.delete('/api/assignment/page/:pageId/widget/:widgetId', deleteWidget);
app.post('/api/upload', upload.single('myFile'), uploadImage);
app.put('/api/assignment/page/:pageId/widget', sortWidget);

function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    widgetModel
        .countsWidgetsForPage(pageId)
        .then(function (count) {
            widget.index = count;
            widgetModel
                .createWidgetForPage(pageId, widget)
                .then(function (widget) {
                    res.json(widget);
                });
        })
}

function findAllWidgetsForPage(req, res) {
    widgetModel
        .findAllWidgetsForPage(req.params.pageId)
        .then(function (widgets) {
            res.json(widgets);
        })
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        });
}

function updateWidget(req, res) {
    var widget = req.body;
    widgetModel
        .updateWidget(req.params.widgetId, widget)
        .then(function (status) {
            res.send(status);
        });
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    var pageId = req.params.pageId;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            widgetModel.decreaseWidgetIndexForPage(pageId, widget.index)
                .then(function (status) {
                    widgetModel
                        .deleteWidgetFromPage(pageId, widgetId)
                        .then(function (status) {
                            res.json(status);
                        });
                })
        })
}

function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;
    var userId        = req.body.userId;
    var websiteId     = req.body.websiteId;
    var pageId        = req.body.pageId;

    if(myFile) {
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                widget.url = '/assignment/uploads/' + filename;
                widgetModel.updateWidget(widgetId, widget)
                    .then(function (status) {
                        var callbackUrl   = "/assignment/#!/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
                        res.redirect(callbackUrl);
                    });
            });
    }
    else {
        var callbackUrl   = "/assignment/#!/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
        res.redirect(callbackUrl);
    }
}

function sortWidget(req, res) {
    var initialIndex = parseInt(req.query['initial']);
    var finalIndex = parseInt(req.query['final']);
    var pageId = req.params.pageId;

    widgetModel
        .findWidgetByPageAndIndex(pageId, initialIndex)
        .then(function (initialWidget) {
            widgetModel
                .reorderWidget(pageId, initialIndex, finalIndex)
                .then(function (status) {
                    initialWidget.index = finalIndex;
                    widgetModel
                        .updateWidget(initialWidget._id, initialWidget)
                        .then(function (status) {
                            res.send(status);
                        });
                })
        })
}