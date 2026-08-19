const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 150,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: RegExp(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/),
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 150,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minLength: 10,
    maxLength: 2000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ContactMessage = mongoose.model("contactMessage", contactMessageSchema);

module.exports = ContactMessage;
