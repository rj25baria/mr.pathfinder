const express = require('express');
const { generateRoadmap, getRoadmap, updateProgress } = require('../controllers/roadmapController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/generate', protect, generateRoadmap);
router.get('/my-roadmap', protect, getRoadmap);
router.put('/progress', protect, updateProgress);

module.exports = router;
