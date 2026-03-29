const express = require('express');
const router = express.Router();
const { getPlans, subscribe, activateFreeTrial, cancelSubscription } = require('../controllers/planController');
const { protect } = require('../middleware/auth');

router.get('/', getPlans);
router.post('/subscribe', protect, subscribe);
router.post('/free-trial', protect, activateFreeTrial);
router.post('/cancel', protect, cancelSubscription);

module.exports = router;
