var path = require('path');
var async = require('async');
var bodyParser = require('body-parser');
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var User = require('./models/User');
var authRoutes = require('./routes/auth');
var profileRoutes = require('./routes/profile');
var uploadRoutes = require('./routes/upload');
var crudRoutes = require('./routes/crudRoutes')
var role = require('./routes/roles');

mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

var app = express();

app.use(role.middleware());

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Force HTTPS on Heroku
if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol === 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}
app.use(express.static(path.join(__dirname, 'app')));

// Routes
app.use('/auth', authRoutes);
app.use('/api', profileRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/collections', crudRoutes);


app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
