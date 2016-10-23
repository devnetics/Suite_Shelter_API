const Reports = require('../models/report_schema').model;

exports.getHeatMap = (req, res) => {
    let reports = Reports.find('', (err, results) => {
        res.json(results);
    });    
}