const mongoose = require('mongoose');

const realEstateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timeshareID: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
});

const RealEstate = mongoose.model('RealEstate', realEstateSchema);

module.exports = RealEstate;
  