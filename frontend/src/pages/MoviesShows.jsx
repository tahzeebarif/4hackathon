import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { FaPlay, FaPlus, FaThumbsUp, FaChevronLeft, FaChevronRight, FaStar, FaVolumeUp, FaClock, FaEye } from 'react-icons/fa';
import './MoviesShows.css';

const MoviesShows = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const scrollRefs = useRef({});

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await API.get('/videos?limit=100');
      setVideos(res.data.videos || []);
    } catch (err) {
      console.error('Error fetching videos');
    } finally {
      setLoading(false);
    }
  };

  const scroll = (key, direction) => {
    const el = scrollRefs.current[key];
    if (el) {
      const scrollAmount = 300;
      el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const genreData = [
    { name: 'Action', posters: ['/assets/Image (38).png', '/assets/Image (43).png', '/assets/Image (47).png', '/assets/Image (51).png'] },
    { name: 'Adventure', posters: ['/assets/Image (38).png', '/assets/Image (39).png', '/assets/Image (40).png', '/assets/Image (41).png'] },
    { name: 'Comedy', posters: ['/assets/Image (43).png', '/assets/Image (44).png', '/assets/Image (45).png', '/assets/Image (46).png'] },
    { name: 'Drama', posters: ['/assets/Image (47).png', '/assets/Image (48).png', '/assets/Image (49).png', '/assets/Image (50).png'] },
    { name: 'Horror', posters: ['/assets/Image (45).png', '/assets/Image (51).png', '/assets/Image (53).png', '/assets/Image (54).png'] },
  ];
  
  // Categorize for carousels
  const movieVideos = videos.filter(v => v.type === 'movie');
  const showVideos = videos.filter(v => v.type === 'show');

  const trending = [...movieVideos].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 10);
  const newReleases = [...movieVideos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
  const mustWatch = [...movieVideos].filter(v => v.rating > 8).slice(0, 10);

  const trendingShows = [...showVideos].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 10);
  const newReleasesShows = [...showVideos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
  const mustWatchShows = [...showVideos].filter(v => v.rating > 8).slice(0, 10);

  const top10 = genreData.slice(0, 5);

  const featured = videos.find(v => v.title === 'Avengers: Endgame') || videos.find(v => v.featured) || {
    title: 'Avengers: Endgame',
    description: "With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face... Avenge the fallen.",
    bannerImage: '/assets/avengers_endgame_hero.png',
    _id: 'featured'
  };

  if (loading) return <div className="loading"><div className="spinner"></div></div>;

  const VideoCarousel = ({ title, data, type = 'standard' }) => (
    <section className="carousel-section">
      <div className="section-header flex-between">
        <h2 className="section-title">{title}</h2>
        <div className="carousel-controls">
          <button className="control-btn" onClick={() => scroll(title, 'left')}><FaChevronLeft /></button>
          <div className="carousel-indicator"><span></span><span className="active"></span><span></span><span></span></div>
          <button className="control-btn" onClick={() => scroll(title, 'right')}><FaChevronRight /></button>
        </div>
      </div>
      {type === 'top10-genres' ? (
        <div className="carousel-container" ref={el => scrollRefs.current[title] = el}>
          {data.map(genre => (
            <div key={genre.name} className="genre-card-v2" onClick={() => navigate(`/movies-shows?genre=${genre.name}`)}>
              <div className="genre-posters-v2">
                {genre.posters.map((p, i) => <img key={i} src={p} alt="" />)}
                <div className="top10-genre-badge">Top 10 In</div>
              </div>
              <div className="genre-info">
                <span className="genre-name-v2">{genre.name}</span>
                <FaChevronRight className="small-arrow" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="carousel-container" ref={el => scrollRefs.current[title] = el}>
          {data.map((video, idx) => (
            <div key={video._id} className={`video-card-v3`} onClick={() => navigate(`/movie/${video._id}`)}>
               <div className="card-poster-wrapper">
                 <img 
                   src={video.thumbnail || '/assets/Image (38).png'} 
                   alt={video.title || "Movie"} 
                   className="card-img" 
                   onError={(e) => { e.target.onerror = null; e.target.src = '/assets/Image (38).png'; }}
                 />
               </div>
               
               {type === 'new-releases' ? (
                 <div className="card-badges">
                   <div className="release-badge">Released at {new Date(video.createdAt || '2023-04-14').toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
                 </div>
               ) : type === 'must-watch' ? (
                 <div className="card-badges">
                   <span className="badge-item"><FaClock /> {video.duration || '1h 30min'}</span>
                   <div className="rating-badge">
                     <span className="stars">★★★★★</span>
                     <span className="view-count">{video.views > 1000 ? (video.views/1000).toFixed(1) + 'K' : video.views || '9K'}</span>
                   </div>
                 </div>
               ) : (
                 <div className="card-badges">
                   <span className="badge-item"><FaClock /> {video.duration || '1h 30min'}</span>
                   <span className="badge-item"><FaEye /> {video.views > 1000 ? (video.views/1000).toFixed(1) + 'K' : video.views || '2K'}</span>
                 </div>
               )}
            </div>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="movies-shows-page">
      {/* Featured Hero - Full Width */}
      <div className="featured-hero" style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 90%), url("${featured.bannerImage}")` 
      }}>
         <div className="hero-overlay-top"></div>
         <div className="featured-content">
          <h1>{featured.title}</h1>
          <p>{featured.description}</p>
          <div className="featured-actions">
            <button className="btn-primary" onClick={() => navigate(`/movie/${featured._id}`)}>
              <FaPlay /> Play Now
            </button>
            <button className="action-btn"><FaPlus /></button>
            <button className="action-btn"><FaThumbsUp /></button>
            <button className="action-btn"><FaVolumeUp /></button>
          </div>
        </div>
        <div className="hero-controls">
          <button className="hero-arrow"><FaChevronLeft /></button>
          <div className="hero-dots">
            <span></span>
            <span className="active"></span>
            <span></span>
            <span></span>
          </div>
          <button className="hero-arrow"><FaChevronRight /></button>
        </div>
      </div>

      <div className="container">
        <div className="content-sections">
          {/* Movie Tag */}
          <div className="movie-tag" style={{ marginBottom: '30px' }}>Movies</div>

          {/* Genres Carousel */}
          <section className="carousel-section">
            <div className="section-header flex-between">
              <h2 className="section-title">Our Genres</h2>
              <div className="carousel-controls">
                <button className="control-btn"><FaChevronLeft /></button>
                <div className="carousel-indicator"><span></span><span className="active"></span><span></span><span></span></div>
                <button className="control-btn"><FaChevronRight /></button>
              </div>
            </div>
            <div className="genre-grid-v2">
              {genreData.map(genre => (
                <div key={genre.name} className="genre-card-v2" onClick={() => navigate(`/movies-shows?genre=${genre.name}`)}>
                  <div className="genre-posters-v2">
                    {genre.posters.map((p, i) => <img key={i} src={p} alt="" />)}
                  </div>
                  <div className="genre-info">
                    <span className="genre-name-v2">{genre.name}</span>
                    <FaChevronRight className="small-arrow" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <VideoCarousel title="Popular Top 10 In Genres" data={top10} type="top10-genres" />
          <VideoCarousel title="Trending Now" data={trending} type="trending" />
          <VideoCarousel title="New Releases" data={newReleases} type="new-releases" />
          <VideoCarousel title="Must - Watch Movies" data={mustWatch} type="must-watch" />
        </div>

        {/* Shows Tag */}
        <span className="movie-tag" style={{ marginTop: '80px' }}>Shows</span>

        <div className="content-sections">
          {/* Shows Genres Carousel */}
          <section className="carousel-section">
            <div className="section-header flex-between">
              <h2 className="section-title">Our Genres</h2>
              <div className="carousel-controls">
                <button className="control-btn"><FaChevronLeft /></button>
                <div className="carousel-indicator"><span></span><span className="active"></span><span></span><span></span></div>
                <button className="control-btn"><FaChevronRight /></button>
              </div>
            </div>
            <div className="genre-grid-v2">
              {genreData.map(genre => (
                <div key={genre.name + 'shows'} className="genre-card-v2" onClick={() => navigate(`/movies-shows?genre=${genre.name}&type=show`)}>
                  <div className="genre-posters-v2">
                    {genre.posters.map((p, i) => <img key={i} src={p} alt="" />)}
                  </div>
                  <div className="genre-info">
                    <span className="genre-name-v2">{genre.name}</span>
                    <FaChevronRight className="small-arrow" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <VideoCarousel title="Popular Top 10 In Genres" data={top10} type="top10-genres" />
          <VideoCarousel title="Trending Shows Now" data={trendingShows} type="trending" />
          <VideoCarousel title="New Released Shows" data={newReleasesShows} type="new-releases" />
          <VideoCarousel title="Must - Watch Shows" data={mustWatchShows} type="must-watch" />
        </div>

        {/* Trial CTA */}
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
          <button className="btn-primary" onClick={() => navigate('/subscriptions')}>Start a Free Trial</button>
        </div>
      </div>
    </div>
  );
};

export default MoviesShows;
