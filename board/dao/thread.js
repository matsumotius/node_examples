/**
 *  thread dao
 */
var EventEmitter = require('events').EventEmitter;
var Thread = require('../model/thread');

var dao = module.exports = {
    save : function(query) {
        var ev = new EventEmitter();
        var thread = new Thread(query);
        thread.save(function(error){
            if(!error) {
                ev.emit('end', thread);
            } else {
                console.log('thread_dao/save', error);
                ev.emit('error');
            }
        });
        return ev;
    },
    find_by_id : function(id) {
        var ev = new EventEmitter();
        Thread.findById(id, [], {}, function(error, thread){
            if(!error && thread){
                ev.emit('end', thread);
            } else {
                console.log('thread_dao/find_by_id', error);
                ev.emit('error');
            }
        });
        return ev;
    },
    find : function(query, field, options) {
        var ev = new EventEmitter();
        Thread.find(query, [], options, function(error, thread){
            if(!error && thread) { 
                ev.emit('end', thread);
            } else {
                console.log('thread_dao/find', error);
                ev.emit('error');
            }
        });
        return ev;
    },
    update : function(id, query) {
        var ev = new EventEmitter();
        Thread.update({ _id : id }, query, function(error){
            if(!error) {
                ev.emit('end');
            } else {
                console.log('thread_dao/update:', error);
                ev.emit('error');
            }
        });
        return ev;
    },
    remove : function(id) {
        var ev = new EventEmitter();
        Thread.remove({ _id : id }, function(error){
            if(!error) {
                ev.emit('end');
            } else {
                console.log('thread_dao/remove', error);
                ev.emit('error');
            }
        });
        return ev;
    }
};
