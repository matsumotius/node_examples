var EventEmitter = require('events').EventEmitter;
var thread_dao = require('../dao/thread');

// todo: validate
var service = module.exports = {
    find : function(query, field, options) {
        var ev = new EventEmitter();
        var searching_thread = thread_dao.find(query, field, options);
        searching_thread.on('end', function(thread){ ev.emit('end', thread); });
        searching_thread.on('error', function(){ ev.emit('error'); });
        return ev;
        
    },
    find_by_id : function(id) {
        var ev = new EventEmitter();
        var searching_thread = thread_dao.find_by_id(id);
        searching_thread.on('end', function(thread){ ev.emit('end', thread); });
        searching_thread.on('error', function(){ ev.emit('error'); });
        return ev;

    },
    save : function(query) {
        var ev = new EventEmitter();
        var persisting_thread = thread_dao.save({
            title : query.title,
            description : query.description,
            posted_by : query.posted_by
        });
        persisting_thread.on('end', function(thread){ ev.emit('end', thread); });
        persisting_thread.on('error', function(){ ev.emit('error'); });
        return ev;
    }
};
