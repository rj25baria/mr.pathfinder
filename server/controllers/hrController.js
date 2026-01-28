const User = require('../models/User');

exports.searchCandidates = async (req, res) => {
  try {
    const { skill, minScore } = req.query;
    
    let query = { role: 'student' };
    
    if (skill) {
      const regex = new RegExp(skill, 'i');
      query.$or = [
        { careerGoal: regex },
        { interests: regex } // Matches if any element in array matches regex
      ];
    }
    
    if (minScore) {
      query.readinessScore = { $gte: parseInt(minScore) };
    }
    
    const candidates = await User.find(query)
      .select('-password')
      .sort({ readinessScore: -1 });
      
    res.status(200).json({ success: true, count: candidates.length, data: candidates });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
