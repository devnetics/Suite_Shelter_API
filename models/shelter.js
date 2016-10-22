const mongoose = require('mongoose');
const shelter_schema = new mongoose.Schema({  

}, { timestamps: true });

const shelter = mongoose.model('report_schema', shelter_schema);

exports.schema = shelter;
exports.model = shelter_schema;