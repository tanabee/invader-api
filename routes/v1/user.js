var User = require('../../models/user'),
    async = require('async');

exports.getRanking = function(req, res) {
  var conditions = {},
      projection = {
        _id: false
      },
      options    = {
        sort: {
          score: -1
        }
      };

  User.find(conditions, projection, options, function (err, users) {
    if (err) {
      res.jsonp(500, err);
      return;
    }
    res.json(users);
  });
};

exports.getRankingMe = function(req, res) {
};

/**
 * ユーザー登録
 * @param req.body.name ニックネーム
 */
exports.register = function(req, res) {

  var name = req.body.name;
  var user = new User({
    name: name
  });

  // DB 保存
  user.save(function (err, user) {
    if (err) {
      // unique 制約に引っかかった場合
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
