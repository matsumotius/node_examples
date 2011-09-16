var Mongoose = require('mongoose');
var mongoose = new Mongoose.Mongoose();
var db = mongoose.connect('mongodb://localhost:27017/board');

var Schema = Mongoose.Schema;

var Comment = new Schema({
    description : { type : String, required : true },
    posted_at : { type : Date, default : Date.now },
    posted_by : { type : String, required : true }
});

var Thread = new Schema({
    title : { type : String, required : true },
    description : { type : String, required : true },
    comment : [Comment],
    posted_at : { type : Date, default : Date.now },
    posted_by : { type : String, required : true }
});

mongoose.model('Thread', Thread, 'Thread', false);
module.exports = db.model('Thread');
