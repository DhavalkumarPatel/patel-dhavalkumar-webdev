var app = require('../../express');

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",   email: "alice@wonder.com"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",   email: "bob@marley.com"  },
    {_id: "345", username: "dsp",   password: "dsp",   firstName: "dsp", lastName: "dsp",   email: "er.dspatel28@gmail.com"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",   email: "jose@annunzi.com" }
];

app.post('/api/project/user', createUser);
app.get('/api/project/user', findAllUsers);
app.get('/api/project/user/:userId', findUserById);
app.put('/api/project/user/:userId', updateUser);
app.delete('/api/project/user/:userId', deleteUser);

function createUser(req, res) {
    var user = req.body;
    user._id = (new Date()).getTime() + "";
    users.push(user);
    res.json(user);
}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    if(username && password) {
        for(var u in users) {
            var user = users[u];
            if( user.username === username &&
                user.password === password) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
        return;
    } else if(username) {
        for(var u in users) {
            var user = users[u];
            if( user.username === username) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
        return;
    } else {
        res.json(users);
    }
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    for(var u in users) {
        if(users[u]._id === userId) {
            res.send(users[u]);
            return;
        }
    }
    res.sendStatus(404);
}

function updateUser(req, res) {
    var user = req.body;
    for(var u in users) {
        if(users[u]._id === req.params.userId) {
            users[u] = user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    for(var u in users) {
        if(users[u]._id === userId) {
            users.splice(u, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}