import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { FaPlay } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [dynamicPosters, setDynamicPosters] = useState([]);
  const [plans, setPlans] = useState([]);
  const [billingCycle, setBillingCycle] = useState('monthly');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await API.get('/videos?limit=40');
        if (res.data.videos && res.data.videos.length > 0) {
          setDynamicPosters(res.data.videos.map(v => v.thumbnail));
        }
      } catch (err) {
        console.error('Failed to fetch videos for home page', err);
      }
    };
    const fetchPlans = async () => {
      try {
        const res = await API.get('/plans');
        setPlans(res.data.plans);
      } catch (err) {
        console.error('Failed to fetch plans');
      }
    };
    fetchVideos();
    fetchPlans();
  }, []);

  const posters = [
    '/src/assets/Image (38).png', '/src/assets/Image (39).png', '/src/assets/Image (40).png', 
    '/src/assets/Image (41).png', '/src/assets/Image (43).png', '/src/assets/Image (44).png',
    '/src/assets/Image (45).png', '/src/assets/Image (46).png', '/src/assets/Image (47).png',
    '/src/assets/Image (48).png', '/src/assets/Image (49).png', '/src/assets/Image (50).png',
    '/src/assets/Image (51).png', '/src/assets/Image (53).png', '/src/assets/Image (54).png',
    '/src/assets/d4adb32dd6d67d4376f7f0966e8a1e5c5ecf185a.png'
  ];

  const genres = [
    { name: 'Action', posters: ['/src/assets/Image (38).png', '/src/assets/Image (43).png', '/src/assets/Image (47).png', '/src/assets/Image (51).png'] },
    { name: 'Adventure', posters: ['/src/assets/Image (38).png', '/src/assets/Image (39).png', '/src/assets/Image (40).png', '/src/assets/Image (41).png'] },
    { name: 'Comedy', posters: ['/src/assets/Image (43).png', '/src/assets/Image (44).png', '/src/assets/Image (45).png', '/src/assets/Image (46).png'] },
    { name: 'Drama', posters: ['/src/assets/Image (47).png', '/src/assets/Image (48).png', '/src/assets/Image (49).png', '/src/assets/Image (50).png'] },
    { name: 'Horror', posters: ['/src/assets/d4adb32dd6d67d4376f7f0966e8a1e5c5ecf185a.png', '/src/assets/Image (51).png', '/src/assets/Image (53).png', '/src/assets/Image (54).png'] },
  ];

  const devices = [
    { name: 'Smartphones', icon: '/src/assets/Vector (8).png', desc: 'StreamVibe is optimized for both Android and iOS smartphones. Download our app from Google Play Store or Apple App Store.' },
    { name: 'Tablet', icon: '/src/assets/Frame (1).png', desc: 'Enjoy the best streaming experience on your tablet. Optimized for large screens and high-resolution displays.' },
    { name: 'Smart TV', icon: '/src/assets/Union.png', desc: 'Stream your favorite movies and shows on the big screen. Support for Samsung, LG, and Android TV.' },
    { name: 'Laptops', icon: '/src/assets/Union (1).png', desc: 'Browse and stream directly from your web browser. No installation required for Windows and macOS.' },
    { name: 'Gaming Consoles', icon: '/src/assets/Union (2).png', desc: 'StreamVibe is available on PlayStation and Xbox. Turn your gaming console into an entertainment hub.' },
    { name: 'VR Headsets', icon: '/src/assets/Union (3).png', desc: 'Immerse yourself in 360-degree experiences. Support for Oculus and Meta Quest.' },
  ];

  const faqs = [
    { q: 'What is StreamVibe?', a: 'StreamVibe is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.' },
    { q: 'How much does StreamVibe cost?', a: 'Watch StreamVibe on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $8.99 to $14.99 a month.' },
    { q: 'What content is available on StreamVibe?', a: 'StreamVibe has an extensive library of feature films, documentaries, TV shows, anime, award-winning StreamVibe originals, and more. Watch as much as you want, anytime you want.' },
    { q: 'How can I watch StreamVibe?', a: 'Sign in with your StreamVibe account to watch instantly on the web at streamvibe.com from your personal computer or on any internet-connected device that offers the StreamVibe app.' },
    { q: 'How do I sign up for StreamVibe?', a: 'Choose the plan that’s right for you and your budget! As a StreamVibe member, you are billed once a month on the date you started.' },
    { q: 'What is the StreamVibe free trial?', a: 'StreamVibe offers a 14-day free trial for new members to explore our vast content library without any upfront costs.' },
    { q: 'How do I contact StreamVibe customer support?', a: 'You can reach out to our 24/7 customer support via the support page or by emailing support@streamvibe.com for any queries regarding your account or streaming issues.' },
    { q: 'What are the StreamVibe payment methods?', a: 'We accept all major credit and debit cards, as well as digital payment options like PayPal, Google Pay, and Apple Pay.' },
  ];

  const displayPosters = dynamicPosters.length > 0 ? dynamicPosters : posters;

  return (
    <ul className="home-page-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      <div className="home-page">
        {/* Hero Section with Grid Background */}
        <section className="hero-section">
          <div className="hero-background-grid">
            {Array(40).fill(0).map((_, i) => (
              <img 
                key={i} 
                src={displayPosters[i % displayPosters.length]} 
                alt="" 
                className="grid-poster" 
              />
            ))}
          </div>
          <div className="hero-overlay"></div>
          <div className="hero-large-logo">
            <img src="/src/assets/Vector (5).png" alt="" />
          </div>
          <div className="hero-content" style={{ marginTop: '250px' }}>
            <h1>The Best Streaming Experience</h1>
            <p>StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.</p>
            <button className="btn-primary hero-cta" onClick={() => navigate('/movies-shows')}>
               <FaPlay /> Start Watching Now
            </button>
          </div>
        </section>

        <div className="container">
          {/* Genre Categories */}
          <section className="section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Explore our wide variety of categories</h2>
                <p className="section-subtitle">Whether you're looking for a comedy to make you laugh, a drama to make you think, or a thriller to keep you on the edge of your seat, we have everything you need.</p>
              </div>
            </div>
            <div className="genre-grid">
              {genres.map(genre => (
                <div 
                  key={genre.name} 
                  className="category-card" 
                  onClick={() => navigate(`/movies-shows?genre=${genre.name}`)}
                >
                  <div className="category-posters">
                    {genre.posters.map((p, i) => (
                      <img key={i} src={p} alt="" className="mini-poster" />
                    ))}
                  </div>
                  <div className="category-info">
                    <span className="category-name">{genre.name}</span>
                    <span className="arrow">→</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Device Support */}
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">We Provide you streaming experience across various devices.</h2>
              <p className="section-subtitle">With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere. Our platform is designed to be compatible with a wide range of devices, ensuring that you never miss a moment of entertainment.</p>
            </div>
            <div className="device-grid">
              {devices.map(device => (
                <div key={device.name} className="device-card">
                  <div className="device-icon-wrapper">
                    <div className="device-icon">
                      <img src={device.icon} alt={device.name} />
                    </div>
                    <span className="device-name">{device.name}</span>
                  </div>
                  <p className="device-desc">{device.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="section">
            <div className="section-header flex-between">
              <div className="header-text-block">
                <h2 className="section-title">Frequently Asked Questions</h2>
                <p className="section-subtitle">Got questions? We've got answers. Check out our FAQ section to find answers to the most common questions about StreamVibe.</p>
              </div>
              <button className="btn-primary">Ask a Question</button>
            </div>
            <div className="faq-grid-v3">
              {faqs.map((faq, i) => (
                <div key={i} className="faq-item-v3">
                  <div className="faq-num-v3">0{i+1}</div>
                  <div className="faq-content-v3">
                    <details>
                      <summary className="faq-question-v3">
                        {faq.q}
                        <span className="faq-toggle-icon-v3">+</span>
                      </summary>
                      <p className="faq-answer-v3">{faq.a}</p>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Section */}
          <section className="section">
            <div className="section-header flex-between">
              <div className="header-text-block">
                <h2 className="section-title">Choose the plan that's right for you</h2>
                <p className="section-subtitle">Join StreamVibe and select from our flexible subscription options that are tailored to suit your viewing preferences. Get ready for non-stop entertainment!</p>
              </div>
              <div className="plan-toggle">
                <button 
                  className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`} 
                  onClick={() => setBillingCycle('monthly')}
                >
                  Monthly
                </button>
                <button 
                  className={`toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`} 
                  onClick={() => setBillingCycle('yearly')}
                >
                  Yearly
                </button>
              </div>
            </div>

            <div className="plans-grid-home">
              {plans.map(plan => (
                <div key={plan._id} className="plan-card-v3">
                  <h3>{plan.name} Plan</h3>
                  <p className="plan-desc-v3">
                    {plan.name === 'Basic' && 'Best for casual viewers who want access to a wide range of content.'}
                    {plan.name === 'Standard' && 'Great for movie lovers who want better quality and more flexibility.'}
                    {plan.name === 'Premium' && 'Perfect for families and enthusiasts who want the ultimate experience.'}
                  </p>
                  
                  <div className="plan-price-v3">
                    <span className="price-amount-v3">${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}</span>
                    <span className="price-cycle-v3">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  </div>

                  <ul className="plan-features-v3" style={{ marginBottom: '40px', flex: 1, padding: 0, listStyle: 'none' }}>
                    {plan.features.map((feature, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '10px', color: '#999', fontSize: '0.9rem', marginBottom: '12px' }}>
                        <span style={{ color: '#E50914' }}>✓</span> {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="plan-card-actions-v3" style={{ display: 'flex', flexDirection: 'row', gap: '12px', marginTop: 'auto' }}>
                    <button className="btn-secondary-v3" onClick={() => navigate('/subscriptions')}>Start Free Trial</button>
                    <button 
                      className="btn-primary-v3" 
                      onClick={() => navigate('/subscriptions', { state: { selectedPlan: plan } })}
                    >
                      Choose Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Trial CTA */}
          <div className="trial-banner" style={{ marginTop: '80px' }}>
            <img 
              src="/src/assets/image.png" 
              alt="Free Trial Background" 
              className="trial-bg" 
            />
            <div className="trial-content">
              <h2>Start your free trial today!</h2>
              <p>This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.</p>
            </div>
            <button className="btn-primary" onClick={() => navigate('/subscriptions')}>Start a Free Trial</button>
          </div>
        </div>
      </div>
    </ul>
  );
};

export default Home;
