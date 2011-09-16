var Kenchi = require('./kenchi');
var SETUP_FLOW = 0, TEST_FLOW = 1, TEARDOWN_FLOW = 2;

var get_length = function(hash) {
    var count = 0;
    for(var test in hash) if(is_test(test)) count++;
    return count;
};
var convert_to_array = function(hash) {
    var _array = [];
    for(var test in hash) if(is_test(test)) _array.push(test);
    return _array;
};
var TaikoKenchi = module.exports = function(_tests) {
    this.count = 0;
    this.tests = _tests;
    this.length = get_length(this.tests);
    this.queue = convert_to_array(_tests);
    this.flow = 0;
};
var is_test = TaikoKenchi.prototype.is_test = function(test) {
    return (test !== 'setUp' && test !== 'tearDown');
};
TaikoKenchi.prototype.run = function() {
    var test = this.queue[this.count];
    if(this.flow === SETUP_FLOW) { this.setUp(); }
    else if(this.flow === TEST_FLOW) { this.tests[test](new Kenchi(this, test)); }
    else if(this.flow === TEARDOWN_FLOW) { this.tearDown(); }
    else { this.finish(); }
};
TaikoKenchi.prototype.next = function() {
    this.flow++;
    this.run();
};
TaikoKenchi.prototype.setUp = function() {
    ('setUp' in this.tests)? this.tests.setUp(new Kenchi(this, 'setUp')) : this.next();
};
TaikoKenchi.prototype.tearDown = function() {
    ('tearDown' in this.tests)? this.tests.tearDown(new Kenchi(this, 'tearDown')) : this.next();
};
TaikoKenchi.prototype.finish = function() {
    this.flow = 0;
    this.count++;
    (this.count === this.length)? this.success() : this.run();
};
TaikoKenchi.prototype.success = function() {
    console.log('TEST PASSED');
    process.exit(0);
};
