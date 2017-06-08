var app = require('./express');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var blog = require('./lectures/blog/app');
blog(app);

require('./assignment/app');
require('./project/app');

var port = process.env.PORT || 3000;

app.listen(port);