var TaikoKenchi = require('../lib/taikokenchi');
var thread_dao = require('../../dao/thread');
var setup = require('../setup');

var tests = {
    'setUp' : function(test) {
        var reverting = setup.revert();
        reverting.on('end', function() { test.finish(); });
        reverting.on('error', function() { test.error(); });
    },
    '検索できる' : function(test) {
        var searching_thread = thread_dao.find({}, [], {});
        searching_thread.on('end', function(thread){
            test.equal(2, thread.length);
            test.finish();
        });
        searching_thread.on('error', function(thread){ test.error(); });
    },
    'IDから検索できる' : function(test) {
        var searching_thread = thread_dao.find({}, [], {});
        searching_thread.on('end', function(threads){
            searching_thread_by_id = thread_dao.find_by_id(threads[0]._id);
            searching_thread_by_id.on('end', function(thread){
                test.equal(String(threads[0]._id), String(thread._id));
                test.finish();
            });
        });
        searching_thread.on('error', function(){ test.error(); });
    },
    '保存できる' : function(test) {
        var persisting_thread = thread_dao.save({
            title : 'ABCDE',
            description : 'あいうえお',
            comment : [],
            posted_by : '12345'
        });
        persisting_thread.on('end', function(thread){ test.finish(); });
        persisting_thread.on('error', function(){ test.error(); });
    },
    '削除できる' : function(test) {
        var searching_thread = thread_dao.find({}, [], {});
        searching_thread.on('end', function(thread){
            removing_thread = thread_dao.remove(thread[0]._id);
            removing_thread.on('end', function(){
                var searching_later_thread = thread_dao.find({}, [], {});
                searching_later_thread.on('end', function(later_thread){
                    test.equal(thread.length - 1, later_thread.length);
                    test.finish();
                });
                searching_later_thread.on('error', function(){ test.error(); });
            });
            removing_thread.on('error', function(){ test.error(); });
        });
        searching_thread.on('error', function(thread){ test.error(); });
    }
};

var taikokenchi = new TaikoKenchi(tests);
taikokenchi.run();
