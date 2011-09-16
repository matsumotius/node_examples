var exec = require('child_process').exec;
var EventEmitter = require('events').EventEmitter;

var setup = module.exports = {
    resource : '~/node/sample/board/test/resource/',
    revert : function() {
        var ev = new EventEmitter();
        exec('mongo board ' + this.resource + 'mongodb/dump.js', function (error, stdout, stderr) {
            if(error) { 
                console.log(error);
                ev.emit('error')
            } else { 
                ev.emit('end');
            }
        });
        return ev;
    }
};
