var express = require('express');
var router  = express.Router();
var config  = require('../config');
var User    = require('../models/User');
var ensureAuthenticated = require('./helpers').ensureAuthenticated;
var crypto  = require('crypto');
var lodash = require('lodash');


router.param('userId', function (req, res, next, userId) {
  next();
});
router.route('/signature')
  .post(ensureAuthenticated, function (req, res) {

    var params = {
          auth: {
            key: config.TRANSLOADIT_KEY,
            expires: req.body.auth.expires
          },
          template_id: 'ab8cd0503a5d11e5a14e55ba3998e015',
    };
    var paramsString = JSON.stringify(req.body);

       var signature = crypto
           .createHmac('sha1', config.TRANSLOADIT_SECRET)
           .update(new Buffer(paramsString, 'utf-8'))
           .digest('hex');

    res.status(200).send({ sig: signature, expires: req.body.auth.expires });
  });
router.route('/notify/:userId')
  .post(function (req, res) {

    var pictureUrl = JSON.parse(req.body.transloadit).results.large[0].url;

    User.findById(req.params.userId, function (err, user) {
      if(!user) {
        res.status(400).send({message: 'user not found.'});
      }
      user.picture = pictureUrl || user.picture;
      user.save(function (err) {
        res.status(200).end();
      });
    });

  });

module.exports = router;
