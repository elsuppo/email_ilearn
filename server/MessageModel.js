const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: String,
  recipient: {type: String, required: [true, 'recipient is required']},
  subject: String,
  messageDB: String,
  date: {type: Date, default: new Date()},
  event: String
})

module.exports = mongoose.model('Messages', messageSchema);