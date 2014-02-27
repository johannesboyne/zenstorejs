var http = require('http'),
url = require('url'),
through = require('through'),
net = require('net');

module.exports.store = function (zenstoreUrl, data, fn) {
  var parsedStorage = url.parse(zenstoreUrl);
  var req = http.request({
    hostname: parsedStorage.hostname,
    port: parsedStorage.port || 80,
    path: parsedStorage.path,
    method: 'PUT'
  }, function(res) {
    res.setEncoding('utf8');
    var body = '';
    res.on('data', function (chunk) {
      body += chunk.toString();
    });
    res.on('end', function () {
      if (body !== '')
        fn(null, body);
      else
        fn(new Error("something wrong"), null);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.setHeader('Content-Type', 'application/json');

  // write data to request body
  req.write(data);
  req.end();
};
module.exports.get = function (url, fn) {
  http.get(url, function (res) {
    var json = '';
    res.on('data', function (d) { json += d.toString(); });
    res.on('end', function () { fn(null, json); });
  });
};
module.exports.createWritePipe = function (_url, port, fn) {
  var parsedStorage = url.parse(_url);
  if (!fn) {
    fn = port;
    port = 8124;
  }
  var s = through();
  var client = net.connect({port: port, host: parsedStorage.hostname},
                           function() { //'connect' listener
                             client.write(JSON.stringify({zen: { pipeData: true, id: parsedStorage.path.replace(/\//, '') }}));
                             s.pipe(client);
                             fn(s);
                           });
};
module.exports.follow = function (followName, _url, port, fn) {
  var parsedStorage = url.parse(_url);
  if (!fn) {
    fn = port;
    port = 8124;
  }
  var s = through();
  var client = net.connect({port: port, host: parsedStorage.hostname},
                           function() { //'connect' listener
                             client.write(JSON.stringify({zen: { update: true, name: followName }}));
                             client.write('\n');
                             client.pipe(s);
                             fn(s);
                           });
};
