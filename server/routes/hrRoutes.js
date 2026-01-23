const express = require('express');
const { searchCandidates } = require('../controllers/hrController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/search', protect, authorize('hr'), searchCandidates);

module.exports = router;
