
var sys  = require('util');
var http = require('http');
var fs  = require('fs');
var url = require('url');


module.exports.soapProxy = function soapProxy(args, callback) {
	URL = url.parse(args.url, true);
	// Load Service Definition

  	try {
		var soapJSON = fs.readFileSync('./cloud/soap' + URL.pathname + '.json', 'UTF-8');
	} catch (e) {
		//change to return callback with an error.
		return callback("Service description " + URL.pathname + ".json could not be found!");
	}

	// Load SOAP Request
	var soapXML = '';
	try {
		soapXML = fs.readFileSync('./cloud/soap' + URL.pathname + '.xml', 'UTF-8');
	} catch (e) {
		// No problem
	}

	// Parse SOAP Configuration
	try {
		var soapJSON = JSON.parse(soapJSON);
		var soapURL = url.parse(soapJSON.url, true);
	} catch (e) {
		return callback("Service JSON could not be parsed!");
	}

	// Set Parameters
	for (p in URL.query)
		soapXML = soapXML.replace('##' + p.toUpperCase() + '##', URL.query[p]); 

	// Prepare SOAP Request Headers
	soapJSON.headers = soapJSON.headers || {};
	soapJSON.headers["Content-Length"] = soapXML.length;
	soapJSON.headers["Connection"] = "close";

	// Do SOAP Call
	var httpOptions = {
		host:     soapURL.hostname,
		post:     soapURL.port || 80,
		method:   soapJSON.method || 'POST',
		path:     soapURL.pathname,
		headers:  soapJSON.headers,
	};

	httpOptions.body = soapXML;

	getSoap(httpOptions,
		function(d) {
			return callback(null, {data: d.data});
		},
		function(e){
			return callback(e);
		}
	);

}

function getSoap(options, success, error) {

  var req = http.request(options, function(res) {
    var data = '';
    res.setEncoding(options.encoding || 'utf8');
    res.on('data', function (chunk) { data += chunk; });
    res.on('end', function () { success({ data: data, response: res });});
  });
  if (typeof options.body != 'undefined') req.write(options.body);

  req.end();
  
  req.on('error', function(e) { 'HTTP ERROR: ' + e.message; });
}