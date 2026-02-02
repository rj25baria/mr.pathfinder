const express = require('express');
const { searchCandidates, deleteCandidate, updateCandidate, resetCandidates } = require('../controllers/hrController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/search', protect, authorize('hr'), searchCandidates);
router.delete('/candidate/:id', protect, authorize('hr'), deleteCandidate);
router.put('/candidate/:id', protect, authorize('hr'), updateCandidate);
router.post('/reset', protect, authorize('hr'), resetCandidates);

module.exports = router;
