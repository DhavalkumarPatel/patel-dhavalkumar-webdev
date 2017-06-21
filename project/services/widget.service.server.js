const app = require('../../express');
var widgetModel = require('../models/widget/widget.model.server');

app.post('/api/project/page/:pageId/widget', createWidget);
app.get('/api/project/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/project/widget/:widgetId', findWidgetById);
app.put('/api/project/widget/:widgetId', updateWidget);
app.delete('/api/project/page/:pageId/widget/:widgetId', deleteWidget);
app.put('/api/project/page/:pageId/widget', sortWidget);

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