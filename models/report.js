var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    _ = require('underscore'),
    ImageExtractor = require('../utility/image_extractor.js');
    
var Report = new Schema({
  name: {type: String, required: true, trim: true},
  description: {type: String, required: false, trim: true},
  client: {type: String, required: false, trim: true},
  content: {type: String, required: true, trim: true, unique: true},
  created_by: {type: ObjectId, required: true},
  created: { type: Date, required: true, default: Date.now },
  modified: { type: Date, required: false },
  organizations: [{ type: ObjectId, ref: 'organizations'}],
  report_template: { type: ObjectId, required: false },
  image_urls: [{type: String}]
});


Report.pre('save', function(next) {
  var report = this;
  //extract the image identifiers associated with this report and store them in the image_urls array
  if (report.isNew) {
    report.image_urls = ImageExtractor.extract(report.content);
  }
  else { //this is an update, so we need to delete all images that exist in 'original_image_urls, but that do NOT exist in the 'current_image_urls'
    var original_images_urls = report.image_urls;
    var current_image_urls = ImageExtractor.extract(report.content);
    report.image_urls = current_image_urls;
    
    var images_to_delete = _.difference(original_images_urls, current_image_urls);
    
    //TODO - Implement the actual removal of the images
    console.log("Deleting the following images: ");
    console.log(images_to_delete);
  }
  next();
});

//if a report is deleted, we can also remove all associated images
Report.post('remove', function(report) {
  var images_to_delete = report.image_urls;
  
  //TODO - Implement the actual removal of the images
  console.log("Deleting the following images: ");
  console.log(images_to_delete);
});

module.exports = mongoose.model('Report', Report);