const mongoose = require('mongoose');

const RoadmapSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goal: { type: String, required: true },
  
  // A. Personalized Learning Roadmap
  phases: [{
    phaseName: String,
    duration: String, // e.g., "Weeks 1-4"
    goals: String,
    topics: [String],
    resources: [{
      title: String,
      url: String,
      type: { type: String, default: 'article' } // video, article, course
    }],
    completed: { type: Boolean, default: false }
  }],
  
  // B. Project Recommendations
  projects: [{
    title: String,
    problemStatement: String,
    tools: [String],
    implementationGuide: String, // Step-by-step guide
    learningOutcomes: String,
    githubLink: String, // Link to a starter repo or tutorial
    submissionLink: String, // User's submission (proof of completion)
    completed: { type: Boolean, default: false }
  }],
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Roadmap', RoadmapSchema);
