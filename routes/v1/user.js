var User = require('../../models/user'),
    async = require('async');

/**
 * トップ 100 のランキング取得
 */
exports.getRanking = function(req, res) {
  var conditions = {},
      projection = {
        _id: false
      },
      options    = {
        limit: 100,
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

/**
 * ランキング取得
 * @param req.query.score 自分のスコア
 */
exports.getRankingMe = function(req, res) {
  var score = req.query.score;
  // 自分のスコアより高いユーザーの数を取得
  User.count({ score: { '$gt': score } }, function (err, count) {
    if (err) {
      res.jsonp(500, err);
      return;
    }
    res.json({ ranking: count+1 });
  });
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
  var userId = req.params.userId;
  var score  = req.body.score;
  User.update({ _id: userId }, { score: score }, function (err, user) {
    if (err) {
      res.json(500, err);
      return;
    }
    res.json({ message: 'success' });
  });
};
