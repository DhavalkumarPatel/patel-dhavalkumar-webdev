var app = require('./express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var blog = require('./lectures/blog/app');
blog(app);

if(process.env.PROJECT_OR_ASSIGNMENT && process.env.PROJECT_OR_ASSIGNMENT==="PROJECT") {
    require('./project/app');
} else {
    require('./assignment/app');
}

var port = process.env.PORT || 3000;

app.listen(port);