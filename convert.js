var https = require('https');
var constants = require('./constants');
var convertdata = require('./model/convertdata');

module.exports = function convert(username, password, metadata, customerDocumentConfigId, datasources, callback) {
    
    var cd = new convertdata(metadata, customerDocumentConfigId, datasources.datasources);
    var body = JSON.stringify(cd);

    var username = username;
    var password = password;
    var auth = 'Basic ' + new Buffer(username + constants.ROLE_SEPERATOR + constants.USERROLE.USER + ':' + password).toString('base64');


    var options = {
                host: constants.URL,
                path: constants.PATH,
                method: 'POST',
                headers:  {'Content-Type': 'application/json', 'Authorization': auth, 'CADMUS_LOG_PREF': 'NONE', 'CADMUS_LOG_USER': 'me'}
            };

    var response = "";
    var req = https.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            response += chunk;
            //console.log("body: " + chunk);
        });
        res.on('end', function () {
            response = JSON.parse(response);
            callback(response);
        });
    });

    req.write(body);
    req.end();
}