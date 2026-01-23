const { User } = require('../utils/dbHelper');

exports.searchCandidates = async (req, res) => {
  try {
    const { skill, minScore } = req.query;
    
    let query = { role: 'student' };
    
    if (skill) {
      query.$or = [
        { interests: { $regex: skill, $options: 'i' } },
        { careerGoal: { $regex: skill, $options: 'i' } }
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
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
