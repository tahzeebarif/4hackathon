const Plan = require('../models/Plan');
const User = require('../models/User');

// @desc    Get all plans
// @route   GET /api/plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true });
    res.status(200).json({ success: true, plans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Subscribe to a plan
// @route   POST /api/plans/subscribe
exports.subscribe = async (req, res) => {
  try {
    const { planId, billingCycle, cardNumber, cardHolder, expiryDate, cvv } = req.body;

    // Validate card details
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      return res.status(400).json({ success: false, message: 'Please provide all card details' });
    }

    // Validate card number (basic validation - 16 digits)
    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    if (cleanCardNumber.length !== 16 || !/^\d+$/.test(cleanCardNumber)) {
      return res.status(400).json({ success: false, message: 'Invalid card number' });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }

    const startDate = new Date();
    const endDate = new Date();
    if (billingCycle === 'yearly') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    // Store card details (last 4 digits visible, rest masked)
    const last4 = cleanCardNumber.slice(-4);
    const maskedCard = '*'.repeat(12) + last4;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        subscription: {
          plan: plan.name.toLowerCase(),
          status: 'active',
          startDate,
          endDate
        },
        cardDetails: {
          cardNumber: maskedCard,
          cardHolder,
          expiryDate,
          last4
        }
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: `Successfully subscribed to ${plan.name} plan`,
      subscription: user.subscription
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Activate free trial
// @route   POST /api/plans/free-trial
exports.activateFreeTrial = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Check if user already had a free trial
    if (user.subscription && user.subscription.plan === 'free-trial') {
      return res.status(400).json({ success: false, message: 'Free trial already used' });
    }

    if (user.subscription && user.subscription.status === 'active') {
      return res.status(400).json({ success: false, message: 'You already have an active subscription' });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14); // 14-day free trial

    user.subscription = {
      plan: 'free-trial',
      status: 'active',
      startDate,
      endDate
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Free trial activated for 14 days',
      subscription: user.subscription
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel subscription
// @route   POST /api/plans/cancel
exports.cancelSubscription = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        'subscription.status': 'cancelled'
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Subscription cancelled',
      subscription: user.subscription
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
