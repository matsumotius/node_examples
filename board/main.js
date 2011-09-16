var express = require('express');
var app = module.exports = express.createServer();
var crypto = require('crypto');
var thread_service = require('./service/thread');
var comment_service = require('./service/comment');
var tag = require('./util').tag;

app.configure(function(){
    app.set('views', __dirname + '/view');
    app.set('view options', { layout : false, filename : __dirname + '/view/index.jade' });
    app.set('view engine', 'jade');
    app.use(express.static(__dirname + '/static'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
});
var generate_md5 = function(key) {
    return crypto.createHash('md5').update(key).digest('hex').slice(-12);
};
var get_ip = function(req) {
    return (req.headers['x-forwarded-for'] || req.connection.remoteAddress);
};
// todo: null check
/* GET */
app.get('/', function(req, res) {
    var searching_thread = thread_service.find({}, [], {});
    searching_thread.on('end', function(thread) {
        res.render('main.jade', {
            locals : { thread : thread }
        });
    });
});
app.get('/thread/:thread_id', function(req, res) {
    var searching_thread = thread_service.find_by_id(req.params.thread_id);
    searching_thread.on('end', function(thread) {
        res.render('thread.jade', {
            locals : { thread : thread }
        });
    });
    searching_thread.on('error', function() {
        res.send('error');
    });
});
app.get('/thread/:thread_id/:comment_id', function(req, res) {
    var searching_comment = comment_service.find_by_id(req.params.thread_id, req.params.comment_id);
    searching_comment.on('end', function(comment) {
        res.send(thread);
    });
    searching_comment.on('error', function() {
        res.send('error');
    });
});
/* POST */
app.post('/thread', function(req, res) {
    var persisting_thread = thread_service.save({
        title : req.body.title,
        description : req.body.description,
        posted_by : generate_md5(get_ip(req))
    });
    persisting_thread.on('end', function(thread) {
        res.send('投稿が完了しました。' + tag.generate('a', { href : '/thread/'+thread._id }, 'スレッドへ'));
    });
    persisting_thread.on('error', function() {
        res.send('error');
    });
});
app.post('/thread/:thread_id', function(req, res) {
    var persisting_comment = comment_service.save(
        req.params.thread_id, { description : req.body.description, posted_by : generate_md5(get_ip(req)) }
    );
    persisting_comment.on('end', function() {
        res.send('投稿が完了しました。' + tag.generate('a', { href : '/thread/'+req.params.thread_id }, 'スレッドへ'));
    });
    persisting_comment.on('error', function() {
        res.send('error');
    });
});
app.listen(3000);
console.log("Express server listening on port %d", app.address().port);
