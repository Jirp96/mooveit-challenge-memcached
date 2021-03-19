var net = require('net');
var Memcached = require('memcached');

var config = require('./config');
var userMenu = require('./clientMenu');

var memcachedClient = new Memcached(`${config.IP}:${config.PORT}`);

userMenu.showMenu();
/*memcachedClient.set('ex_key', 'hello world', 80000, function(err){
    console.log("SET succesful");
    console.log(err);

    memcachedClient.get('ex_key', function(err, data){
        console.log("GET succesful");
        console.log(err);
        console.log(data);
    });
});*/

