//custom backend for uploadfs

var fs = require('fs'),
    aws = require('aws-sdk'),
    pathHelper = require('path');
    
var bucket, filename, https;

var AWS_URI = 'https://s3.amazonaws.com';

function createBucket(fileName, data, callback) {
  var s3 = new aws.S3();
  s3.createBucket({ Bucket: bucket }, function(err) {
    if(err) {
      return callback(err);
    }
    else {
      return saveFile(s3, fileName, data, callback);
    }
  });
}

function saveFile(s3, fileName, data, callback) {
  s3.putObject({ Bucket : bucket, Key: fileName, Body: data, ACL: 'public-read'}, function(err) {
      if(err) {
        return callback(err);
      }
      else {
        return callback(null);
      }
  });
}

var self = module.exports = {
  init: function(options, callback) {
    var config = ReportIt.app.get('config').aws;
    bucket = config.bucket_name;
    https = options.https;
    return callback(null);
  },

  copyIn: function(localPath, path, options, callback) {
    filename = pathHelper.basename(path);
    fs.readFile(localPath, function(err, data) {
      if (err) {
        return callback(err);
      }
      else {
        return createBucket(filename, data, callback);
      }
    });
  },

  copyOut: function(path, localPath, options, callback) {
    callback(new Error('Not implemented'));
  },

  remove: function(path, callback) {
    callback(new Error('Not implemented'));
  },

  getUrl: function(path) {
    return (https ? 'https://' : 'http://') + bucket + '.s3.amazonaws.com';
  }
};

