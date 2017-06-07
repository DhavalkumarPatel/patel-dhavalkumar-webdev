const app = require('../../express');

var multer = require('multer');
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

var widgets = [
    { "_id": "123",     "widgetType": "HEADING",    "pageId": "321", "name": "Heading name",
        "text": "GIZMODO H2",       "size": "2", "index": 0 },
    { "_id": "234",     "widgetType": "HEADING",    "pageId": "321", "name": "Heading name",
        "text": "Heading size 4",   "size": "4", "index": 1 },
    { "_id": "345",     "widgetType": "IMAGE",      "pageId": "321", "name": "Image name",
        "text": "some image text",   "width": "100%", "url": "http://lorempixel.com/400/200/", "index": 2 },
    { "_id": "456",     "widgetType": "HTML",       "pageId": "321", "name": "HTML name",
        "text": "<p>HTML Paragraph 1</p>", "index": 3 },
    { "_id": "567",     "widgetType": "HEADING",    "pageId": "321", "name": "Heading name",
        "text": "Heading size 4",   "size": "4", "index": 4 },
    { "_id": "678",     "widgetType": "YOUTUBE",    "pageId": "321", "name": "Youtube name",
        "text": "some youtube text",   "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E", "index": 5 },
    { "_id": "789",     "widgetType": "HTML",       "pageId": "321", "name": "HTML name",
        "text": "<p>HTML Paragraph 2</p>", "index": 6 }
];

app.post('/api/assignment/page/:pageId/widget', createWidget);
app.get('/api/assignment/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.delete('/api/assignment/widget/:widgetId', deleteWidget);
app.post('/api/upload', upload.single('myFile'), uploadImage);
app.put('/api/assignment/page/:pageId/widget', sortWidget);

function createWidget(req, res) {
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widget.index = getIndexForNewWidget(widget.pageId);
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
    results.sort(predicateBy("index"))
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

    var wDel = -1;
    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            wDel = w;
            break;
        }
    }

    if(wDel !== -1) {
        for(var w in widgets) {
            if(widgets[w].pageId === widgets[wDel].pageId) {
                if(widgets[w].index > widgets[wDel].index) {
                    widgets[w].index = widgets[w].index - 1;
                }
            }
        }
        widgets.splice(wDel, 1);
        res.sendStatus(200);
        return;
    }
    else {
        res.sendStatus(404);
    }
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

function sortWidget(req, res) {
    var initial = parseInt(req.query['initial']);
    var final = parseInt(req.query['final']);

    for(var w in widgets) {
        if(widgets[w].pageId === req.params.pageId) {
            if(widgets[w].index ===  initial) {
                widgets[w].index = final;
            } else if (widgets[w].index >=  final && widgets[w].index < initial){
                widgets[w].index = widgets[w].index + 1;
            }
        }
    }
    res.sendStatus(200);
    return;
}

function getWidgetById(widgetId) {
    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            return widgets[w];
        }
    }
    return;
}

function getIndexForNewWidget(pageId) {
    var count = 0;
    for(var w in widgets) {
        if(widgets[w].pageId === pageId) {
            count++;
        }
    }
    return count;
}

function predicateBy(prop) {
    return function(a, b) {
        if( a[prop] > b[prop]){
            return 1;
        }else if( a[prop] < b[prop] ){
            return -1;
        }
        return 0;
    }
}