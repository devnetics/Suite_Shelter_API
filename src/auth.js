const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = (req, res, cb) => {
    let user = req.body.user;
    User.findOne({'email': user.email})
        .exec((err, user_found) => {
            if (!user_found) {
                return res.status(401).send('Unauthorized.');
            } else if (err) {
                return res.status(401).send('Unauthorized.');
            } else {
                user_found.compare_password(user.password, (pw_auth_f, pw_auth_s) => {
                    if (pw_auth_s) {
                        let token = jwt.sign(user_found, process.env.TOKEN_KEY);
                        return res.json({'token': token}).send();
                    }
                })
            }
        });
}

exports.signup = (req, res, cb) => {
    let user = req.body.user;
    console.log(user);
    User.findOne({email: user.email})
        .exec((err, user_found) => {
            console.log(user_found);
            if (!user_found) {
                const new_user = new User({
                    'email' : user.email,
                    'password': user.password
                });
                new_user.save((err) => {
                    if (err) {
                        return cb(err);
                    }
                    let token = jwt.sign(user_found, process.env.TOKEN_KEY);
                    res.json({'token': token});
                })
            } else {
                return res.status(401).send('Unauthorized.');                
            }
        })
}