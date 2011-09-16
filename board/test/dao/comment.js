var TaikoKenchi = require('../lib/taikokenchi');
var setup = require('../setup');
var comment_dao = require('../../dao/comment');
var thread_service = require('../../service/thread');

var tests = {
    'setUp' : function(test) {
        var reverting = setup.revert();
        reverting.on('end', function() { test.finish(); });
        reverting.on('error', function() { test.error(); });
    },
    'コメントを保存できる' : function(test) {
        var searching_thread = thread_service.find({}, [], {});
        searching_thread.on('end', function(thread) {
            var persisting_comment = comment_dao.save(thread[0]._id, { description : 'test', posted_by : 'taikokenchi' });
            persisting_comment.on('end', function() { test.finish(); });
            persisting_comment.on('error', function() { test.error('persisting_comment'); });
        }); 
        searching_thread.on('error', function() { test.error('searching_thread'); });
    }
};
var taikokenchi = new TaikoKenchi(tests);
taikokenchi.run();
