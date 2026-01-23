const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeedbackSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['General', 'Bug', 'Feature Request', 'Roadmap Quality'],
    default: 'General'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
