var aws = require('aws-sdk');

exports.init = function() {
    var config = ReportIt.app.get('config').aws;
    aws.config.update({
        accessKeyId: config.access_key_id,
        secretAccessKey: config.secret_access_key
    });
}