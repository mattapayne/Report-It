var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    _ = require('underscore'),
    ImageExtractor = require('../utility/image_extractor.js');
    
var ReportTemplate = new Schema({
  name: {type: String, required: true, trim: true},
  description: {type: String, required: false, trim: true},
  client: {type: String, required: false, trim: true},
  content: {type: String, required: true, trim: true, unique: true},
  created_by: {type: ObjectId, required: true},
  created: { type: Date, required: true, default: Date.now },
  modified: { type: Date, required: false },
  organizations: [{ type: ObjectId, ref: 'organizations'}],
  image_urls: [{type: String}]
});

ReportTemplate.pre('save', function(next) {
  var template = this;
  //extract the image identifiers associated with this template and store them in the image_urls array
  if (template.isNew) {
    template.image_urls = ImageExtractor.extract(template.content);
  }
  else { //this is an update, so we need to delete all images that exist in 'original_image_urls, but that do NOT exist in the 'current_image_urls'
    var original_images_urls = template.image_urls;
    var current_image_urls = ImageExtractor.extract(template.content);
    template.image_urls = current_image_urls;
    var images_to_delete = _.difference(original_images_urls, current_image_urls);
    
    //TODO - Implement the actual removal of the images
    console.log("Deleting the following images: ");
    console.log(images_to_delete);
  }
  next();
});

//if a template is deleted, we can also remove all associated images
ReportTemplate.post('remove', function(template) {
  var images_to_delete = template.image_urls;
  
  //TODO - Implement the actual removal of the images
  console.log("Deleting the following images: ");
  console.log(images_to_delete);
});

module.exports = mongoose.model('ReportTemplate', ReportTemplate);