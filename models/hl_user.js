const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const user_report_schema = require('./report_schema').schema;

const hl_user_schema = new mongoose.Schema({
  email: { type: String},
  password: String,
  password_reset_token: String,
  password_reset_expires: Date,

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  },

  reports: [user_report_schema]
}, { timestamps: true });

/**
 * Password hash middleware.
 */
hl_user_schema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
hl_user_schema.methods.compare_password = function (candidate_password, cb) {
  bcrypt.compare(candidate_password, this.password, (err, is_match) => {
    cb(err, is_match);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
hl_user_schema.methods.gravatar = function (size = 200) {
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const hl_user = mongoose.model('hl_user', hl_user_schema);

module.exports = hl_user;