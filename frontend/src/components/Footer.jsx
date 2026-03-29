import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4 className="footer-title">Home</h4>
            <ul className="footer-links">
              <li><Link to="/">Categories</Link></li>
              <li><Link to="/">Devices</Link></li>
              <li><Link to="/">Pricing</Link></li>
              <li><Link to="/">FAQ</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-title">Movies</h4>
            <ul className="footer-links">
              <li><Link to="/movies-shows">Genres</Link></li>
              <li><Link to="/movies-shows">Trending</Link></li>
              <li><Link to="/movies-shows">New Release</Link></li>
              <li><Link to="/movies-shows">Popular</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-title">Shows</h4>
            <ul className="footer-links">
              <li><Link to="/movies-shows">Genres</Link></li>
              <li><Link to="/movies-shows">Trending</Link></li>
              <li><Link to="/movies-shows">New Release</Link></li>
              <li><Link to="/movies-shows">Popular</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><Link to="/support">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-title">Subscription</h4>
            <ul className="footer-links">
              <li><Link to="/subscriptions">Plans</Link></li>
              <li><Link to="/subscriptions">Features</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-title">Connect with Us</h4>
            <div className="social-links">
              <a href="#" className="social-icon"><FaFacebook /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaLinkedin /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>@2026 StreamVibe, All Rights Reserved</p>
          <div className="footer-legal">
            <Link to="/">Terms of Use</Link>
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
