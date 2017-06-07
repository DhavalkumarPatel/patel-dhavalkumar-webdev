const app = require('../../express');

var multer = require('multer');
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

var widgets = [
    { "_id": "123",     "widgetType": "HEADING",    "pageId": "321", "name": "Heading name",
        "text": "GIZMODO H2",       "size": "2" },
    { "_id": "234",     "widgetType": "HEADING",    "pageId": "321", "name": "Heading name",
        "text": "Heading size 4",   "size": "4" },
    { "_id": "345",     "widgetType": "IMAGE",      "pageId": "321", "name": "Image name",
        "text": "some image text",   "width": "100%", "url": "http://lorempixel.com/400/200/" },
    { "_id": "456",     "widgetType": "HTML",       "pageId": "321", "name": "HTML name",
        "text": "<p>HTML Paragraph 1</p>" },
    { "_id": "567",     "widgetType": "HEADING",    "pageId": "321", "name": "Heading name",
        "text": "Heading size 4",   "size": "4" },
    { "_id": "678",     "widgetType": "YOUTUBE",    "pageId": "321", "name": "Youtube name",
        "text": "some youtube text",   "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789",     "widgetType": "HTML",       "pageId": "321", "name": "HTML name",
        "text": "<p>HTML Paragraph 2</p>"}
];

app.post('/api/assignment/page/:pageId/widget', createWidget);
app.get('/api/assignment/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.delete('/api/assignment/widget/:widgetId', deleteWidget);
app.post("/api/upload", upload.single('myFile'), uploadImage);

function createWidget(req, res) {
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widgets.push(widget);
    res.json(widget);
}

function findAllWidgetsForPage(req, res) {
    var results = [];
    for(var w in widgets) {
        if(widgets[w].pageId === req.params.pageId) {
            results.push(widgets[w]);
        }
    }
    res.json(results);
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            res.send(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function updateWidget(req, res) {
    var widget = req.body;
    for(var w in widgets) {
        if(widgets[w]._id === req.params.widgetId) {
            widgets[w] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            widgets.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;
    var userId        = req.body.userId;
    var websiteId     = req.body.websiteId;
    var pageId        = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget = getWidgetById(widgetId);
    widget.url = '/assignment/uploads/' + filename;

    var callbackUrl   = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

    res.redirect(callbackUrl);
}

function getWidgetById(widgetId) {
    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            return widgets[w];
        }
    }
    return;
}
