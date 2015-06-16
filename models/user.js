// require
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// スキーマ定義
var UserSchema = new Schema({
  name  : { type:String, required:true, unique:true },
  score : { type:Number, default:0 },
});
mongoose.model('User', UserSchema);

// クラス定義
module.exports = mongoose.model('User');
