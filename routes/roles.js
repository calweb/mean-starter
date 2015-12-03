var ConnectRoles = require('connect-roles');
/*
 |--------------------------------------------------------------------------
 | User Authorizations
 |--------------------------------------------------------------------------
 */

 var user = new ConnectRoles({
   failureHandler: function (req, res, action) {
     var accept = req.headers.accept || '';
     res.status(403).send('Access Denied - You don\'t have permission to: ' + action);
   }
 });

 user.use('access member resources', function (req, res) {
   if (req.role === 'member' || req.role === 'admin') {
     return true;
   }
 });

 user.use('access all the things', function (req, res) {
   if (req.role === 'admin') {
     return true;
   }
 });

 module.exports = user;
