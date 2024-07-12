const mongoose = require('mongoose');
const { Schema } = mongoose;
const format = require('date-fns/format');

const reactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = reactionSchema;