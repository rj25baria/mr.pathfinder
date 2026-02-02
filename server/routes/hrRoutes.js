const express = require('express');
const { searchCandidates, deleteCandidate, updateCandidate } = require('../controllers/hrController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/search', protect, authorize('hr'), searchCandidates);
router.delete('/candidate/:id', protect, authorize('hr'), deleteCandidate);
router.put('/candidate/:id', protect, authorize('hr'), updateCandidate);

module.exports = router;
