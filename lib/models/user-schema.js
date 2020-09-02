'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const USER_TYPES = {
  CONSUMER: 'consumer',
  SUPPORT: 'support'
};

const schema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    type: { type: String }
  },
  {
    timestamps: true
  }
);

schema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 10);
});

schema.methods.generateToken = async function() {
  const token = jwt.sign(
    {
      data: {
        id: this.id,
        username: this.username
      },
    },
    process.env.JWT_SECRET || 'DUMMY_SECRET',
    { expiresIn: exp || 0 },
  );
  return token;
};

schema.statics.verifyToken = async function(token) {
  const content = jwt.verify(token, process.env.JWT_SECRET || 'DUMMY_SECRET');
  return content.data;
}

module.exports = mongoose.model('users', schema);