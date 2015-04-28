/**
 * Created by Max on 4/27/2015.
 */
var url = require('url');

module.exports = function(data){
    var stats = url.parse(data);
    var output = url.format(data);

    if(stats.protocol){
        output = 'http://' + stats.host + stats.pathname;
    }else{
        output = 'http://' + output;
    }
    return output;
};