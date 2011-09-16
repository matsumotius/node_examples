/**
 *  comment dao
 */
var EventEmitter = require('events').EventEmitter;
var Thread = require('../model/thread');

var dao = module.exports = {
    save : function(id, query) {
        var ev = new EventEmitter();
        Thread.findById(id, function(error, thread){
            thread.comment.push(query);
            thread.save(function(error){
                (error)? ev.emit('error') : ev.emit('end');
            });
        });
        return ev;
    },
    find_by_id : function(thread_id, comment_id) {
        var ev = new EventEmitter();
        Thread.findById(thread_id, function(error, thread){
            if(!error && thread) {
                if(thread.comment.id(comment_id)) ev.emit('end', thread.comment.id(comment_id));
                else ev.emit('error');
            } else {
                console.log('comment_dao/find_by_id', error);
                ev.emit('error');
            }
        });
        return ev;
    },
    remove : function(thread_id, comment_id) {
        var ev = new EventEmitter();
        Thread.findById(thread_id, [], {}, function(error, thread){
            if(!error && thread) {
                if(thread.comment.id(comment_id)) {
                    thread.comment.id(comment_id).remove();
                    thread.save(function(error){
                        (error)? ev.emit('error') : ev.emit('end');
                    });
                } else {
                    ev.emit('error');
                }
            } else {
                console.log('comment_dao/remove', error);
                ev.emit('error');
            }
        });
        return ev;
    }
};
