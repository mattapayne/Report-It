var aws = require('aws-sdk'),
    uuid = require('node-uuid'),
    mkdirp = require('mkdirp'),
    fs = require('fs');
    
var AWS_URI = 'https://s3.amazonaws.com';
    
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
}