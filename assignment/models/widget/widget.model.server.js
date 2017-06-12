var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidgetForPage = createWidgetForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findAllWidgets = findAllWidgets;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidgetFromPage = deleteWidgetFromPage;
widgetModel.reorderWidget = reorderWidget;
widgetModel.countsWidgetsForPage = countsWidgetsForPage;
widgetModel.findWidgetByPageAndIndex = findWidgetByPageAndIndex;
widgetModel.decreaseWidgetIndexForPage = decreaseWidgetIndexForPage;

module.exports = widgetModel;

function createWidgetForPage(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (widget) {
            pageModel
                .addWidget(pageId, widget._id);
            return widget;
        })
}

function findWidgetById(widgetId) {
    return widgetModel
        .findById(widgetId);
}

function findAllWidgetsForPage(pageId) {
    return widgetModel
        .find({_page: pageId})
        .sort( { index: 1 })
        .populate('_page')
        .exec();
}

function findAllWidgets() {
    return widgetModel.find();
}

function updateWidget(widgetId, widget) {
    return widgetModel
        .update({_id: widgetId}, {$set: widget});
}

function deleteWidgetFromPage(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel
                .deleteWidget(pageId, widgetId);
        });
}

function reorderWidget(pageId, initialIndex, finalIndex) {
    if(initialIndex > finalIndex) {
        return widgetModel
            .updateMany({_page: pageId, $and: [ { index: { $gte: finalIndex } }, { index: { $lt: initialIndex } } ] }, { $inc: { index: 1 } });
    } else {
        return widgetModel
            .updateMany({_page: pageId, $and: [ { index: { $gt: initialIndex } }, { index: { $lte: finalIndex } } ] }, { $inc: { index: -1 } });
    }
}

function countsWidgetsForPage(pageId) {
    return widgetModel
        .find({_page: pageId})
        .count();
}

function findWidgetByPageAndIndex(pageId, index) {
    return widgetModel
        .findOne({_page: pageId, index: index });
}

function decreaseWidgetIndexForPage(pageId, index) {
    return widgetModel
        .updateMany({_page: pageId, index: { $gt: index } }, { $inc: { index: -1 } });
}

