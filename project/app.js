var connectionString = 'mongodb://127.0.0.1:27017/webdev_project'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds133162.mlab.com:33162/heroku_3fk8p3l0'; // user yours
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;

require('./services/user.service.server');
require('./services/followUser.service.server');
require('./services/financialAccount.service.server');
require('./services/transaction.service.server');
require('./services/yodlee.service.server');