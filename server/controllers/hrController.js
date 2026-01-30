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
      
    // Filter out duplicates based on email (just in case DB has them)
    const uniqueCandidates = [...new Map(candidates.map(item => [item.email, item])).values()];

    res.status(200).json({ success: true, count: uniqueCandidates.length, data: uniqueCandidates });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.deleteCandidate = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }

    if (user.role !== 'student') {
        return res.status(400).json({ success: false, message: 'Cannot delete non-student accounts via this endpoint' });
    }

    await user.deleteOne();

    res.status(200).json({ success: true, message: 'Candidate removed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
