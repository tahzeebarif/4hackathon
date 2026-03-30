import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { FaCreditCard, FaLock } from 'react-icons/fa';
import './Subscription.css';

const Subscription = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { user, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await API.get('/plans');
      setPlans(res.data.plans);
    } catch (err) {
      console.error('Error fetching plans');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handleFreeTrial = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      setLoading(true);
      const res = await API.post('/plans/free-trial');
      updateUser({ ...user, subscription: res.data.subscription });
      setSuccess('Free trial activated successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to activate free trial');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/plans/subscribe', {
        planId: selectedPlan._id,
        billingCycle,
        ...formData
      });
      
      updateUser({ ...user, subscription: res.data.subscription });
      setSuccess(`Successfully subscribed to ${selectedPlan.name} plan!`);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && plans.length === 0) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <div className="subscription-page">
      <div className="container">
        {!showPayment ? (
          <>
            <div className="subscription-header-v3">
              <div className="header-text-block">
                <h1>Choose Your Plan</h1>
                <p>Unlock unlimited access to thousands of movies and TV shows. Choose the plan that's right for you.</p>
              </div>
              
              <div className="plan-toggle-v2">
                <button 
                  className={`toggle-btn-v2 ${billingCycle === 'monthly' ? 'active' : ''}`} 
                  onClick={() => setBillingCycle('monthly')}
                >
                  Monthly
                </button>
                <button 
                  className={`toggle-btn-v2 ${billingCycle === 'yearly' ? 'active' : ''}`} 
                  onClick={() => setBillingCycle('yearly')}
                >
                  Yearly
                </button>
              </div>
            </div>

            {error && <div className="auth-error">{error}</div>}
            {success && <div className="auth-success">{success}</div>}

            <div className="plans-grid-v3">
              {plans.map(plan => {
                const isStandard = plan.name === 'Standard';
                return (
                  <div key={plan._id} className={`plan-card-v3 ${isStandard ? 'highlighted' : ''}`}>
                    {isStandard && <div className="popular-badge">MOST POPULAR</div>}
                    <h3>{plan.name}</h3>
                    <p className="plan-desc-v3">
                      {plan.name === 'Basic' && 'Best for casual viewers who want access to a wide range of content.'}
                      {plan.name === 'Standard' && 'Great for movie lovers who want better quality and more flexibility.'}
                      {plan.name === 'Premium' && 'Perfect for families and enthusiasts who want the ultimate experience.'}
                    </p>
                    
                    <div className="plan-price-v3">
                      <span className="price-amount-v3">${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}</span>
                      <span className="price-cycle-v3">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                    </div>

                    <ul className="plan-features-v3">
                      {plan.features.map((feature, i) => (
                        <li key={i}>
                          <span className="feature-check">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="plan-card-actions-v3">
                      <button className="btn-secondary-v3" onClick={handleFreeTrial}>Start Free Trial</button>
                      <button 
                        className="btn-primary-v3" 
                        onClick={() => handleSelectPlan(plan)}
                      >
                        Choose Plan
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trial Banner */}
            <div className="trial-banner" style={{ marginTop: '100px' }}>
              <img 
                src="/assets/image.png" 
                alt="Free Trial Background" 
                className="trial-bg" 
              />
              <div className="trial-content">
                <h2>Start your free trial today!</h2>
                <p>This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.</p>
              </div>
              <button className="btn-primary" onClick={handleFreeTrial}>Start a Free Trial</button>
            </div>
          </>
        ) : (
          <div className="payment-container">
            <button className="back-link" onClick={() => setShowPayment(false)}>← Back to plans</button>
            <div className="payment-card">
              <div className="payment-header">
                <h2>Secure Checkout</h2>
                <div className="selected-plan-summary">
                  <span>{selectedPlan.name} Plan ({billingCycle})</span>
                  <strong>${billingCycle === 'monthly' ? selectedPlan.price.monthly : selectedPlan.price.yearly}</strong>
                </div>
              </div>

              {error && <div className="auth-error">{error}</div>}

              <form onSubmit={handlePaymentSubmit} className="payment-form">
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input type="text" placeholder="Name on card" value={formData.cardHolder} onChange={(e) => setFormData({...formData, cardHolder: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Card Number</label>
                  <div className="input-with-icon">
                    <FaCreditCard className="input-icon" />
                    <input type="text" placeholder="0000 0000 0000 0000" maxLength="19" value={formData.cardNumber} onChange={(e) => setFormData({...formData, cardNumber: e.target.value})} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" maxLength="5" value={formData.expiryDate} onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="password" placeholder="***" maxLength="3" value={formData.cvv} onChange={(e) => setFormData({...formData, cvv: e.target.value})} required />
                  </div>
                </div>
                <div className="payment-security">
                  <FaLock />
                  <span>Secure encrypted payment.</span>
                </div>
                <button type="submit" className="btn-primary checkout-btn" disabled={loading}>
                  {loading ? 'Processing...' : `Pay $${billingCycle === 'monthly' ? selectedPlan.price.monthly : selectedPlan.price.yearly}`}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;
