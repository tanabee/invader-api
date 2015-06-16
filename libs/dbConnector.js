var mongoose = require('mongoose');

exports.connect = function () {
  // DB 接続
  var mongoUri = process.env.MONGOLAB_URI ||
                 process.env.MONGOHQ_URL ||
                 'mongodb://localhost/invader';
  mongoose.connect(mongoUri);
};
