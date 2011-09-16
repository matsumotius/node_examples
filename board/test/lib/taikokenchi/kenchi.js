var ASSERTION_ERROR = 'Assertion Error: ';
var error_message = function(expected, actual, operator){
    if(operator === 'equal') {
        return ASSERTION_ERROR + expected + ' === ' + actual;
    } else if(operator === 'notEqual') {
        return ASSERTION_ERROR + expected + ' !== ' + actual;
    } else if(operator === 'ok') {
        return ASSERTION_ERROR + actual + ' is true.';
    }
};
var Kenchi = module.exports = function(_tk, _test) {
    this.tk = _tk;
    this.test = _test;
};
Kenchi.prototype.finish = function() {
    if(this.tk.is_test(this.test)) console.log('SUCCESS:', this.test); 
    this.tk.next();
};
Kenchi.prototype.equal = function(expected, actual) {
    if(expected !== actual) this.error(error_message(expected, actual, 'equal'));
};
Kenchi.prototype.notEqual = function(expected, actual) {
    if(expected === actual) this.error(error_message(expected, actual, 'notEqual'));
};
Kenchi.prototype.ok = function(value) {
    if(value) this.error(error_message('', value, 'ok'));
};
Kenchi.prototype.error = function(message) {
    console.log('ERROR:', this.test);
    if(message) console.log(message);
    process.exit(1);
};

