const User = require('../models/hl_user');
const Report = require('../models/report_schema').model;

exports.reportPersons = (req, res, cb) => {
    let user_report = req.body.user_report;
    let user = req.body.user;
    console.log(user_report);
    console.log(user);

    if (req.body.user) {
        const hl_user = req.body.user;
        User.findById(hl_user._id, (err_user, found_user) => {
                console.log('FOUND: ' + found_user);
                if (!found_user) {
                    let report = new Report({
                        latitude: user_report.latitude,
                        longitude: user_report.longitude,
                        risk_level: user_report.risk_level,
                        notes: user_report.notes
                    });     
                    let new_hl_user = new User({
                        profile: {
                            'name': hl_user.name,
                            '_id': hl_user._id                  
                        },
                        reports: [report]
                    });                    
                    new_hl_user.save((err) => {
                        if (err) {
                            return cb(err);
                        }
                        return res.status(201).send();
                    })                    
                } else {
                    let report = new Report({
                        latitude: user_report.latitude,
                        longitude: user_report.longitude
                    });
                    found_user.reports.push(report);
                    found_user.save((err) => {
                        if (err) {
                            return cb(err);
                        }
                        return res.status(201).send();  
                    });              
                }            
            })        
    } else {
        let report = new Report({
            latitude: user_report.latitude,
            longitude: user_report.longitude,
            risk_level: user_report.risk_level,
            notes: user_report.notes
        });    
        let hl_user = new User({reports: [report]});
        hl_user.save((err) => {
            if (err) {
                return cb(err);
            }        
            res.status(201).send();
        });
    }    
}

exports.searchUsers = (req, res, cb) => {
    let name_query = req.params["name"];
    User.find({name: name_query})
        .exec((err_query, found_user) => {
            if (err_query) {
                return cb(err_query)
            } else if (!found_user) {
                return res.json();
            } else {                
                res.json(found_user);
            }
        })
}