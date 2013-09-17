var aws = require('aws-sdk'),
    uuid = require('node-uuid'),
    _ = require('underscore'),
    uploadfs = require('uploadfs')();

var IMAGE_HEIGHT_KEY = 'image_height';
var DEFAULT_IMAGE_HEIGHT = 360;
var IMAGE_WIDTH_KEY = 'image_width';
var DEFAULT_IMAGE_WIDTH = 640;

function getLocalConfigurationOptions(imageSizes) {
  return {
    backend: 'local',
    uploadsPath: ReportIt.rootDirectory + '/public/uploads',
    uploadsUrl: 'http://localhost:' + ReportIt.app.get('port') + '/uploads',
    tempPath: ReportIt.rootDirectory + '/temp',
    imageSizes: imageSizes,
    parallel: 1
  };
}

function getS3ConfigurationOptions(imageSizes) {
  var config = ReportIt.app.get('config').aws;
  return {
    backend: require('../utility/s3_image_upload_backend.js'),
    secret: config.secret_access_key,
    key: config.access_key_id,
    bucket: config.bucket_name,
    tempPath: ReportIt.rootDirectory + '/temp',
    imageSizes: imageSizes,
    parallel: 1
  };
}

function getUploadOptions(user) {
  var height = _.find(user.settings, function(s) {
    return s.key === IMAGE_HEIGHT_KEY;
  });
  
  var width = _.find(user.settings, function(s) {
    return s.key === IMAGE_WIDTH_KEY;
  });
  
  var imageSizes = [
    {
      name: 'resized',
      height: (height && height.value) ? height.value : DEFAULT_IMAGE_HEIGHT,
      width: (width && width.value) ? width.value : DEFAULT_IMAGE_WIDTH
    }
  ];
  
  return ReportIt.app.get('env') === 'development' ?
    getLocalConfigurationOptions(imageSizes) :
    getS3ConfigurationOptions(imageSizes);
}

exports.upload = function(req, res) {
  var options = getUploadOptions(req.user);
  uploadfs.init(options, function(err) {
    if(err) {
      res.send(500)
    }
    else {
      uploadfs.copyImageIn(req.files.file.path, '/'+ uuid.v4(), { copyOriginal: false }, function(err, info) {
          if (err) {
            res.send(500);
          }
          else {
            res.send({
              filelink: uploadfs.getUrl() + info.basePath + '.resized.' + info.extension
            });
          }
      });
    }
  }); 
}