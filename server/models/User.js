const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String }, // Contact number
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'hr'], default: 'student' },
  
  // Student specific fields
  education: { type: String },
  interests: [{ type: String }],
  skillLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  careerGoal: { type: String },
  
  // Gamification & Tracking
  readinessScore: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastActivity: { type: Date, default: Date.now },
  badges: [{
    name: String,
    icon: String, // e.g., 'trophy', 'star', 'fire'
    earnedAt: { type: Date, default: Date.now }
  }],
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
