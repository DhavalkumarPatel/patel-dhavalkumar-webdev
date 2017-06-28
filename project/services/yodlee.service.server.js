const app = require('../../express');
var request = require('request');

app.get('/api/project/yodlee/callback/:userId',yodleeCallBack);
app.get('/api/project/yodlee/cobsession',getCOBSession);
app.get('/api/project/yodlee/usersession',getUserSession);
app.get('/api/project/yodlee/fastlinktoken',getFastLinkToken);
app.get('/api/project/yodlee/account',getAccounts);
app.delete('/api/project/yodlee/account/:accountId',deleteAccount);
app.post('/api/project/yodlee/transaction',getTransactions);

var COB_SESSION;
var USER_SESSION;
var FAST_LINK_TOKEN;

function loadCOBSession() {
    var headers = {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json; charset=utf-8'
    }

    var  cobrandParam = {
        "cobrand":      {
            "cobrandLogin": process.env.YODLEE_COBRAND_LOGIN,
            "cobrandPassword": process.env.YODLEE_COBRAND_PASSWORD,
            "locale": "en_US"
        }
    };

    var options = {
        url: 'https://developer.api.yodlee.com/ysl/restserver/v1/cobrand/login',
        method: 'POST',
        headers: headers,
        json: cobrandParam
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            COB_SESSION = body.session.cobSession;
            loadUserSession(COB_SESSION);
        }
    });
}

function loadUserSession(cobSession) {
    var headers = {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'cobSession=' + cobSession
    };

    var userParam = {
        "user":      {
            "loginName": process.env.YODLEE_USER_LOGIN,
            "password": process.env.YODLEE_USER_PASSWORD,
            "locale": "en_US"
        }
    };

    var options = {
        url: 'https://developer.api.yodlee.com/ysl/restserver/v1/user/login',
        method: 'POST',
        headers: headers,
        json: userParam
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            USER_SESSION = body.user.session.userSession;
            loadFastLinkToken(cobSession, USER_SESSION);
        }
    });
}

function loadFastLinkToken(cobSession, userSession) {

    var headers = {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'userSession='+userSession+', cobSession='+cobSession
    };

    var options = {
        url: 'https://developer.api.yodlee.com/ysl/restserver/v1/user/accessTokens?appIds=10003600',
        method: 'GET',
        headers: headers
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonObj = JSON.parse(body);
            FAST_LINK_TOKEN = jsonObj.user.accessTokens[0].value;
        }
    });
}
//loadCOBSession();

function yodleeCallBack(req, res) {
    res.redirect('/project/#!/financialAccount');
}

function getCOBSession(req, res) {
    res.json( {COB_SESSION: COB_SESSION});
}

function getUserSession(req, res) {
    res.json( {USER_SESSION: USER_SESSION});
}

function getFastLinkToken(req, res) {
    res.json( {FAST_LINK_TOKEN: FAST_LINK_TOKEN});
}

function getAccounts(req, res) {
    /*var headers = {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'userSession='+USER_SESSION+', cobSession='+COB_SESSION
    };

    var options = {
        url: 'https://developer.api.yodlee.com/ysl/restserver/v1/accounts',
        method: 'GET',
        headers: headers
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonObj = JSON.parse(body);
            res.json(jsonObj);
        }
    });
    */
    res.json({});
}

function deleteAccount(req, res) {

    /*
    var headers = {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'userSession='+USER_SESSION+', cobSession='+COB_SESSION
    };

    var options = {
        url: 'https://developer.api.yodlee.com/ysl/restserver/v1/accounts/' + req.params.accountId,
        method: 'DELETE',
        headers: headers
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        }
        res.send(200);
    });
    */
    res.send(200);
}

function getTransactions(req, res) {

    /*
    var param = req.body;
    var headers = {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'userSession='+USER_SESSION+', cobSession='+COB_SESSION
    };

    var options = {
        url: 'https://developer.api.yodlee.com/ysl/restserver/v1/transactions?' + param.queryParameters,
        method: 'GET',
        headers: headers
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonObj = JSON.parse(body);
            res.json(jsonObj);
        }
    });*/
    res.json({});
}