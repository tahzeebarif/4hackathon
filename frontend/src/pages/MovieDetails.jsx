import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import ReactPlayer from 'react-player';
import { FaPlay, FaPlus, FaHeart, FaStar, FaCalendar, FaClock, FaGlobe, FaVolumeUp } from 'react-icons/fa';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, hasActiveSubscription } = useAuth();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const fetchVideo = async () => {
    try {
      const res = await API.get(`/videos/${id}`);
      setVideo(res.data.video);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        // Active subscription required
        navigate('/subscriptions', { state: { message: err.response.data.message } });
      } else {
        navigate('/movies-shows');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePlayNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (video.isPremium && !hasActiveSubscription) {
      navigate('/subscriptions');
      return;
    }
    setShowPlayer(true);
    setPlaying(true);
  };

  if (loading) return <div className="loading" style={{ minHeight: '100vh' }}><div className="spinner"></div></div>;
  if (!video) return null;

  return (
    <div className="movie-details">
      {showPlayer ? (
        <div className="player-fullscreen">
          <div className="player-wrapper">
            <ReactPlayer
              url={video.videoUrl}
              width="100%"
              height="100%"
              playing={playing}
              controls
              onEnded={() => { setPlaying(false); setShowPlayer(false); }}
            />
          </div>
          <button className="close-player btn-secondary" onClick={() => { setShowPlayer(false); setPlaying(false); }}>
            Close Player
          </button>
        </div>
      ) : (
        <>
          <div
            className="movie-hero"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(15,15,15,0.2), rgba(15,15,15,0.95)), url("${video.bannerImage || video.thumbnail}")`
            }}
          >
            <div className="movie-hero-content container">
              <h1 className="movie-title">{video.title}</h1>
              <div className="movie-actions">
                <button className="btn-primary hero-play-btn" onClick={handlePlayNow}>
                  <FaPlay /> Play Now
                </button>
                <button className="action-btn"><FaPlus /></button>
                <button className="action-btn"><FaHeart /></button>
                <button className="action-btn"><FaVolumeUp /></button>
              </div>
            </div>
          </div>

          <div className="movie-content container">
            <div className="movie-grid">
              <div className="movie-main">
                {/* Meta tags */}
                <div className="movie-meta-tags">
                  <span className="meta-tag"><FaClock /> {video.duration}</span>
                  <span className="meta-tag"><FaCalendar /> {video.releaseYear}</span>
                  <span className="meta-tag rating-tag"><FaStar /> {video.rating}/10</span>
                  <span className="meta-tag"><FaGlobe /> {video.language}</span>
                </div>

                {/* Genres */}
                <div className="movie-genres">
                  {video.genre.map(g => (
                    <span key={g} className="genre-tag">{g}</span>
                  ))}
                </div>

                {/* Description */}
                <div className="movie-section">
                  <h3>Description</h3>
                  <p className="movie-description">{video.description}</p>
                </div>

                {/* Cast */}
                {video.cast && video.cast.length > 0 && (
                  <div className="movie-section">
                    <h3>Cast</h3>
                    <div className="cast-grid">
                      {video.cast.map((member, i) => (
                        <div key={i} className="cast-card">
                          <div className="cast-avatar">
                            {member.name?.charAt(0)}
                          </div>
                          <div className="cast-info">
                            <p className="cast-name">{member.name}</p>
                            <p className="cast-character">{member.character}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="movie-sidebar">
                <div className="sidebar-card">
                  <img src={video.thumbnail} alt={video.title} className="sidebar-poster" />
                  <div className="sidebar-info">
                    <div className="sidebar-row">
                      <span className="sidebar-label">Director</span>
                      <span className="sidebar-value">{video.director || 'N/A'}</span>
                    </div>
                    <div className="sidebar-row">
                      <span className="sidebar-label">Type</span>
                      <span className="sidebar-value">{video.type === 'movie' ? 'Movie' : 'TV Show'}</span>
                    </div>
                    <div className="sidebar-row">
                      <span className="sidebar-label">Views</span>
                      <span className="sidebar-value">{video.views?.toLocaleString()}</span>
                    </div>
                    {video.isPremium && (
                      <div className="premium-badge">Premium Content</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
