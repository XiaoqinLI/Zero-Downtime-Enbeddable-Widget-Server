/**
 * the model of physician
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhysicianSchema = new Schema({
  ProviderId: Number,
  NPI: String, 
  FirstName: String,
  LastName: String,
  MiddleName: String,
  Suffix: String,
  ProviderContacts: String,
  Year: Number,
  Address: String,
  City: String,
  State: String,
  Zip: String,
  Phone: String,
  Description: String,
  Review: Number,
  Picture: String
});

module.exports = mongoose.model('Physician', PhysicianSchema);