
var http = require("http");
var handler = require('./req-handler').requestHandler;
http.createServer(handler).listen(8382);