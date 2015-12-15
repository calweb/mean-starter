var express = require('express');
var router = express.Router();
var User = require('../models/User');
var config = require('../config');
var ensureAuthenticated = require('./helpers').ensureAuthenticated;
var role = require('./roles');

// GET /api/me
router.route('/me')
  .all(ensureAuthenticated)
  .get(function(req, res) {
    User.findById(req.user, function(err, user) {
      res.send(user);
    });
  })
// PUT /api/me
  .put(function(req, res) {
    User.findById(req.user, function(err, user) {
      if (!user) {
        return res.status(400).send({ message: 'User not found' });
      }
      user.displayName = req.body.displayName || user.displayName;
      user.email = req.body.email || user.email;
      user.save(function(err) {
        res.status(200).end();
      });
    });
  });

router.param('userId', function (req, res, next, userId) {
  next();
});

// admin
router.route('/admin/users')
  .all(ensureAuthenticated, role.can('access all the things'))
  .get(function (req, res) {
    User.find({}, function (err, users) {
      if (err) { return res.status(400).send({ message: 'Users not found' }); }

      res.status(200).send(users);
    });
  });
router.route('/admin/users/:userId')
  .all(ensureAuthenticated, role.can('access all the things'))
  .get(function (req, res) {
    User.findById(req.params.userId, function (err, user) {
      if (!user) { return res.status(400).send({ message: 'User not found' }); }
      res.status(200).send(user);
    });
  })
  .put(function (req, res) {
    User.findById(req.params.userId, function (err, user) {
      if (!user) { return res.status(400).send({ message: 'User not found' }); }
      user.displayName = req.body.displayName || user.displayName;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      user.save(function(err) {
        res.status(200).end();
      });
    });
  })
  .delete(function (req, res) {
    User.findByIdAndRemove(req.params.userId, function (err, user) {
      if(err) { return next(err); }
      res.status(200).send({message: 'Successfuly Deleted User'});
    });
  });

module.exports = router;
