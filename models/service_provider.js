const mongoose = require('mongoose');
const service_provider_schema = new mongoose.Schema({
    name: String,  
    address: String,
    notes: String
}, { timestamps: true });

const service_provider = mongoose.model('service_provider_schema', service_provider_schema);

exports.schema = service_provider_schema;
exports.model = service_provider;