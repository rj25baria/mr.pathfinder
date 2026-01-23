const { Feedback } = require('../utils/dbHelper');

exports.createFeedback = async (req, res) => {
  try {
    const { rating, comment, category } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ success: false, message: 'Please provide rating and comment' });
    }

    const feedback = await Feedback.create({
      user: req.user.id,
      rating,
      comment,
      category
    });

    res.status(201).json({ success: true, data: feedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
