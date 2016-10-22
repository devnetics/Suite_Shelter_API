const mongoose = require('mongoose');
const service_provider = require('./service_provider').model;
const checkin_schema = new mongoose.Schema({  
  location: service_provider,
  checked_out: Boolean
}, { timestamps: true });

const checkin = mongoose.model('checkin_schema', checkin_schema);

exports.schema = checkin_schema;
exports.model = checkin;