var qs = require('querystring');
var express = require('express');
var router = express.Router();
var request = require('request');
var moment = require('moment');
var jwt = require('jwt-simple');
var config = require('../config');
var _ = require('lodash');
var User = require('../models/User');
var ensureAuthenticated = require('./helpers').ensureAuthenticated;
var createToken = require('./helpers').createToken;
var authom = require('authom');

var normalize = function normalize(provider, respObj) {
  var config = {
    github: {
      name: 'name',
      picture: 'avatar_url'
    },
    instagram: {
      name: 'data.username',
      picture: 'data.profile_picture'
    },
    google: {
      name: 'name',
      picture: 'picture'
    },
    facebook: {
      name: 'name',
      picture: 'picture.data.url'
    }
  };
  return {
    name: _.get(respObj, config[provider].name),
    picture: _.get(respObj, config[provider].picture)
  };
};


authom.createServer({
  service: "github",
  id: config.GITHUB_CLIENTID,
  secret: config.GITHUB_SECRET,
  redirect_uri: "http://localhost:3000"
});
authom.createServer({
  service: "google",
  id: config.GOOGLE_CLIENTID,
  secret: config.GOOGLE_SECRET,
  redirect_uri: "http://localhost:3000"
});

authom.createServer({
  service: "facebook",
  id: config.FACEBOOK_CLIENTID,
  secret: config.FACEBOOK_SECRET,
  fields: ["name", "picture"]
});

authom.createServer({
  service: "instagram",
  id: config.INSTAGRAM_CLIENTID,
  secret: config.INSTAGRAM_SECRET
});

router.route('/auth/:service')
  .get(authom.app)
  .post(authom.app);


authom.on("auth", function (req, res, data) {

  var query = {};
  query[data.service] = data.id;

  if (req.headers.authorization) {
    User.findOne(query, function (err, existingUser) {
      if (existingUser) {
        return res.status(409).send({message: 'There is already a Google account that belongs to you'});
      }
      var token = req.headers.authorization.split(' ')[1];
      var payload = jwt.decode(token, config.TOKEN_SECRET);
      User.findById(payload.sub, function (err, user) {
        if (!user) {
          return res.status(400).send({message: 'User not found'});
        }
        user[data.service] = data.id;
        user.tokens.push({provider: data.service, access: data.token});
        user.picture = normalize(data.service, data.data).picture;
        user.displayName = normalize(data.service, data.data).name || user.displayName;
        user.save(function () {
          var token = createToken(user);
          res.send({token: token, role: user.role});
        });
      });
    });
  } else {


    User.findOne(query, function (err, existingUser) {
      if (existingUser) { // need to send role back?
        return res.send({token: createToken(existingUser), role: existingUser.role});
      }
      var user = new User();
      user[data.service] = data.id;
      user.tokens.push({provider: data.service, access: data.token});
      user.picture = normalize(data.service, data.data).picture;
      user.displayName = normalize(data.service, data.data).name;
      user.role = 'member';
      user.save(function (err) {
        var token = createToken(user);
        res.send({token: token, role: user.role});
      });
    });
  }

});

authom.on("error", function (req, res, data) {
  res.status(500).send("An error occurred: " + JSON.stringify(data))
})


/*
 |--------------------------------------------------------------------------
 | Log in with Email
 |--------------------------------------------------------------------------
 */

router.route('/login')
  .post(function (req, res, next) {
    User.findOne({email: req.body.email}, '+password', function (err, user, next) {
      if (err) return next(err);
      if (!user) {
        return res.status(401).send({message: 'Wrong email and/or password'});
      }
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (!isMatch) {
          return res.status(401).send({message: 'Wrong email and/or password'});
        }
        res.send({token: createToken(user), role: user.role});
      });
    });
  });

/*
 |--------------------------------------------------------------------------
 | Create Email and Password Account
 |--------------------------------------------------------------------------
 */
router.route('/signup')
  .post(function (req, res) {

    User.findOne({email: req.body.email}, function (err, existingUser) {
      if (existingUser) {
        return res.status(409).send({message: 'Email is already taken'});
      }
      var user = new User({
        displayName: req.body.displayName,
        email: req.body.email,
        password: req.body.password,
        role: /@theironyard.com\s*$/.test(req.body.email) ? 'admin' : 'member'
      });
      user.save(function () {
        res.send({token: createToken(user), role: user.role});
      });
    });
  });

/*
 |--------------------------------------------------------------------------
 | Unlink Provider
 |--------------------------------------------------------------------------
 */
router.route('/unlink/:provider')
  .all(ensureAuthenticated)
  .get(function (req, res) {
    var provider = req.params.provider;
    User.findById(req.user, function (err, user) {
      if (!user) {
        return res.status(400).send({message: 'User not found'});
      }
      user[provider] = undefined;
      user.save(function () {
        res.status(200).end();
      });
    });
  });

module.exports = router;
