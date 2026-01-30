const express = require('express');
const { searchCandidates, deleteCandidate } = require('../controllers/hrController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/search', protect, authorize('hr'), searchCandidates);
router.delete('/candidate/:id', protect, authorize('hr'), deleteCandidate);

module.exports = router;
