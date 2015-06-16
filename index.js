var express = require('express');
var app = express();
var user = require('./routes/v1/user');
var dbConnector = require('./libs/dbConnector');
var bodyParser = require('body-parser');

dbConnector.connect();

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/v1/ranking'             , user.getRanking);
app.get('/v1/ranking/me'          , user.getRankingMe);
app.post('/v1/user'               , user.register);
app.post('/v1/user/:userId/score' , user.updateScore);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
