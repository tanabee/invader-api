var Drama = require('../../models/user'),
    async = require('async');

exports.getRanking = function(req, res) {
};

exports.getRankingMe = function(req, res) {
};

/**
 * ユーザー登録
 * @param req.body.name ニックネーム
 */
exports.register = function(req, res) {
  var name = req.body.name;
  var user = new Drama({
    name: name
  });
  user.save(function (err, user) {
    if (err) {
      if (err.code === 11000) {
        res.json(400, { message: 'This nickname already exists.' });
        return;
      }
      res.json(500, err);
      return;
    }
    res.json({ message: 'success' });
  });
};

exports.updateScore = function(req, res) {
};
