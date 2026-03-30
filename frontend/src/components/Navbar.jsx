import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSearch, FaBars, FaTimes, FaBell } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/movies-shows', label: 'Movies & Shows' },
    { path: '/support', label: 'Support' },
    { path: '/subscriptions', label: 'Subscriptions' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies-shows?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/assets/Vector (7).png" alt="" className="logo-img" style={{height: "35px"}} />
          <span>Stream<span className="logo-text">Vibe</span></span>
        </Link>

        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <div className={`search-wrapper ${searchOpen ? 'active' : ''}`}>
            {searchOpen && (
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search movies, shows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </form>
            )}
            <button className="icon-btn" onClick={() => setSearchOpen(!searchOpen)}>
              <FaSearch />
            </button>
          </div>

          {isAuthenticated ? (
            <>
              <button className="icon-btn notification-btn">
                <FaBell />
                <span className="notification-dot"></span>
              </button>
              <div className="profile-wrapper">
                <button 
                  className="profile-btn"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <div className="profile-avatar">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                </button>
                {profileOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-info">
                      <div className="profile-avatar-lg">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="profile-name">{user?.name}</p>
                        <p className="profile-email">{user?.email}</p>
                      </div>
                    </div>
                    <div className="profile-divider"></div>
                    {isAdmin && (
                      <Link to="/admin" className="profile-link" onClick={() => setProfileOpen(false)}>
                        Admin Panel
                      </Link>
                    )}
                    <Link to="/subscriptions" className="profile-link" onClick={() => setProfileOpen(false)}>
                      My Subscription
                    </Link>
                    <button className="profile-link logout-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login" className="btn-primary nav-login-btn">
              Sign In
            </Link>
          )}

          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
