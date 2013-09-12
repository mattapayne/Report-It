var aws = require('aws-sdk'),
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
                        console.log(err);
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
      console.log(err);
      res.send(500);
    }
    else {
      saveFile(res, s3, destination_bucket, fileName, data);
    }
  });
}

exports.upload = function(req, res) {
  var bucket_name = ReportIt.app.get('config').aws.bucket_name;
  var user_id = req.user._id;
  var fileName = req.files.file.name;
  var destination_bucket = bucket_name + '-' + user_id;

  fs.readFile(req.files.file.path, function(err, data) {
    if(err) {
      console.log(err);
      res.send(500);
    }
    else {
      createBucket(res, destination_bucket, fileName, data);
    }
  });
}