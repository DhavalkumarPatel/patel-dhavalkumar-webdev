var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    clientID     : process.env.OFM_GOOGLE_CLIENT_ID,
    clientSecret : process.env.OFM_GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.OFM_GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig = {
    clientID     : process.env.OFM_FACEBOOK_CLIENT_ID,
    clientSecret : process.env.OFM_FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.OFM_FACEBOOK_CALLBACK_URL,
    profileFields : ['id', 'name', 'emails'],
};
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

app.post('/api/project/user', isAdmin, createUser);
app.put('/api/project/user/:userId', isAdmin, updateUser);
app.delete('/api/project/user/:userId',isAdmin, deleteUser);

app.post('/api/project/familyMember', isHouseHold, createFamilyMember);
app.put('/api/project/familyMember/:userId', isHouseHold, updateFamilyMember);
app.delete('/api/project/familyMember/:userId',isHouseHold, deleteFamilyMember);

app.get('/api/project/user/:userId', findUserById);
app.get('/api/project/user',findAllUsers);
app.get('/api/project/user/role/:roleName',findAllUsersForRole);
app.get('/api/project/user/public/:userId', findRestrictedUserDetailsById);
app.get('/api/project/familyMember/:userId', findAllFamilyMembers);
app.post('/api/project/login', passport.authenticate('local'), login);
app.get('/api/project/loggedin', loggedin);
app.get('/api/project/checkAdmin', checkAdmin);
app.get('/api/project/checkHH_FM', checkHH_FM);
app.get('/api/project/checkHH', checkHH);
app.post('/api/project/logout', logout);
app.post('/api/project/register', register);
app.post('/api/project/unregister', unregister);
app.put('/api/project/updateProfile/:userId', updateProfile);
app.get('/api/project/home/stats', getHomePageStatistics);

app.get('/auth/project/google',
    passport.authenticate('google', {
        scope : ['profile', 'email']
    }));

app.get('/auth/project/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/#!/profile',
        failureRedirect: '/project/#!/login'
    }));

app.get ('/auth/project/facebook',
    passport.authenticate('facebook', {
        scope : 'email' }));

app.get('/auth/project2/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/#!/profile',
        failureRedirect: '/project/#!/login'
    }));

function isAdmin(req,res,next) {
    if(req.isAuthenticated() && req.user.role === 'ADMIN')
    {
        next();
    }else
    {
        res.sendStatus(401);
    }
}

function isHouseHold(req,res,next) {
    if(req.isAuthenticated() && req.user.role === 'HOUSEHOLD')
    {
        next();
    }else
    {
        res.sendStatus(401);
    }
}

function createUser(req, res) {
    var user = req.body;
    if(!user.password) {
        user.password = user.username;
    }
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }
}

function findAllUsersForRole(req, res) {
    userModel
        .findAllUsersForRole(req.params.roleName)
        .then(function (users) {
            res.json(users);
        });
}

function findAllFamilyMembers(req, res) {
    var userId = req.params['userId'];
    userModel
        .findAllFamilyMembers(userId)
        .then(function (members) {
            res.json(members);
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function findRestrictedUserDetailsById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findRestrictedUserDetailsById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function updateUser(req, res) {
    var user = req.body;
    userModel
        .updateUser(req.params.userId, user)
        .then(function (status) {
            res.send(status);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}
function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function login(req, res) {
    res.json(req.user);
}

function loggedin(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function checkAdmin(req, res) {
    if(req.isAuthenticated() && req.user.role === 'ADMIN') {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function checkHH_FM(req, res) {
    if(req.isAuthenticated() && (req.user.role === 'HOUSEHOLD' || req.user.role === 'FAMILY-MEMBER')) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function checkHH(req, res) {
    if(req.isAuthenticated() && req.user.role === 'HOUSEHOLD') {
        res.json(req.user);
    } else {
        res.send('0');
    }
}
function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function register(req, res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userObj.role = 'HOUSEHOLD';
    userModel
        .createUser(userObj)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.send(status);
                });
        });
}

function unregister(req, res) {
    userModel
        .deleteUser(req.user._id)
        .then(function (user) {
            req.logout();
            res.sendStatus(200);
        });
}

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(
            function (userr) {
                // if the user exists, compare passwords with bcrypt.compareSync
                if(userr && bcrypt.compareSync(password, userr.password)) {
                    return done(null, userr);
                } else {
                    return done(null, false);
                }
            }, function (error) {
                done(error, false);
            });
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  'G_' + emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        role: 'HOUSEHOLD',
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newFacebookUser = {
                        username:  'F_' + emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        role: 'HOUSEHOLD',
                        email:     email,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function createFamilyMember(req, res) {
    var user = req.body;
    if(!user.password) {
        user.password = user.username;
    }
    user.password = bcrypt.hashSync(user.password);
    user.role = 'FAMILY-MEMBER';
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function updateFamilyMember(req, res) {
    var user = req.body;
    userModel
        .updateUser(req.params.userId, user)
        .then(function (status) {
            res.send(status);
        });
}

function deleteFamilyMember(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}


function updateProfile(req, res) {
    var user = req.body;
    userModel
        .updateUser(req.params.userId, user)
        .then(function (status) {
            res.send(status);
        });
}

function getHomePageStatistics(req, res) {
    var stats = {};
    userModel
        .findAllUsers()
        .then(function (users) {
            stats['totalUsers'] = users.length;
            userModel
                .findAllUsersForRole("HOUSEHOLD")
                .then(function (users) {
                    stats['totalFamilies'] = users.length;
                    res.json(stats);
                })
        });
}