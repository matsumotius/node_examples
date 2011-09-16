var EventEmitter = require('events').EventEmitter;
var comment_dao = require('../dao/comment');

// todo: validate
var service = module.exports = {
    save : function(thread_id, query) {
        var ev = new EventEmitter();
        var persisting_comment = comment_dao.save(thread_id, { description : query.description, posted_by : query.posted_by });
        persisting_comment.on('end', function() { ev.emit('end'); });
        persisting_comment.on('error', function() { ev.emit('error'); });
        return ev;
    },
    find_by_id : function(thread_id, comment_id) {
        var ev = new EventEmitter();
        var searching_comment = comment_dao.find_by_id(thread_id, comment_id);
        searching_comment.on('end', function(comment) { ev.emit('end', comment); });
        searching_comment.on('error', function() { ev.emit('error'); });
        return ev;
    }
};
