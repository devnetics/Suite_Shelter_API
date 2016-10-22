const mongoose = require('mongoose');
const report_schema = new mongoose.Schema({  
  latitude: String,
  longitude: String,
  risk_level: Number,
  notes: String  
}, { timestamps: true });

const report = mongoose.model('report_schema', report_schema);

exports.schema = report_schema;
exports.model = report;