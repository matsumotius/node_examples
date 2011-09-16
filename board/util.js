exports.tag = {
    BLANK : ' ',
    double_quotes : function(val) {
        return '\"'+val+'\"';   
    },
    generate : function(name, attr, val) {
        if(!name) return '';
        var tag_string = '<' + name;
        for(var key in attr) {
            tag_string += this.BLANK + key + '=' + this.double_quotes(attr[key]);
        }
        tag_string += '>';
        tag_string += ((val) ? val : '');
        tag_string += '</' + name + '>';
        return tag_string;
    }
}
