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

function getS3ConfigurationOptions(args) {
  var config = ReportIt.app.get('config').aws;
  return {
    backend: 's3',
    secret: config.secret_access_key,
    key: config.access_key_id,
    bucket: config.bucket_name,
    region: config.region,
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
      console.log(err);
      res.send(500)
    }
    else {
      uploadfs.copyImageIn(req.files.file.path, '/'+ uuid.v4(), function(err, info) {
          if (err) {
            console.log(err);
            res.send(500);
          }
          else {
            res.send({
              filelink: uploadfs.getUrl() + info.basePath + '.resized' + info.extension
            });
          }
      });
    }
  });
  
}
/*var AWS_URI = 'https://s3.amazonaws.com';
    
function saveFile(res, s3, destination_bucket, fileName, data) {
  s3.putObject({
                  Bucket : destination_bucket,
                  Key: fileName,
                  Body: data,
                  ACL: 'public-read'
              }, function(err) {
                      if(err) {
                        res.send(500);
                      }
                      else {
                        res.json({
                          filelink: AWS_URI + '/' + destination_bucket + '/' + fileName 
                        });     
                      }
                  });
}
        
function createBucket(res, destination_bucket, fileName, data) {
  var s3 = new aws.S3();
  s3.createBucket({ Bucket: destination_bucket }, function(err) {
    if(err) {
      res.send(500);
    }
    else {
      saveFile(res, s3, destination_bucket, fileName, data);
    }
  });
}

function saveLocally(fs, res, fileName, data) {
  var folder = ReportIt.rootDirectory + '/public/uploads';
  var path = folder + '/' + fileName;
  var relativePath = '/uploads/' + fileName;
  mkdirp(folder, function(err) {
    if (err) {
      res.send(500);
    }
    else {
       fs.writeFile(path, data, function(err) {
        if (err) {
          res.send(500);
        }
        else {
            res.json({
              filelink: relativePath
          });  
        }
      }); 
    }
  });
}

//TODO - Scale images appropriately
exports.upload = function(req, res) {
  var bucketName = ReportIt.app.get('config').aws.bucket_name;
  var fileName = uuid.v4();
  fs.readFile(req.files.file.path, function(err, data) {
      if (err) {
        res.send(500);
      }
      else {
        if (ReportIt.app.get('env') !== 'development') {
            createBucket(res, bucketName, fileName, data);
        }
        else {
          saveLocally(fs, res, fileName, data);
        }
      }
  });
}*/