import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { FaEdit, FaTrash, FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Admin.css';

const VideoManagement = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    duration: '',
    releaseYear: '',
    thumbnail: '',
    bannerImage: '',
    videoUrl: '',
    type: 'movie',
    isPremium: false,
    featured: false
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await API.get('/videos/admin/all');
      setVideos(res.data.videos);
    } catch (err) {
      console.error('Error fetching videos');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisibility = async (id) => {
    try {
      await API.patch(`/videos/${id}/visibility`);
      setVideos(videos.map(v => v._id === id ? { ...v, isVisible: !v.isVisible } : v));
    } catch (err) {
      alert('Failed to toggle visibility');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      await API.delete(`/videos/${id}`);
      setVideos(videos.filter(v => v._id !== id));
    } catch (err) {
      alert('Failed to delete video');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Process genres string to array
      const genresArray = formData.genre.split(',').map(g => g.trim());
      const dataToSubmit = { ...formData, genre: genresArray };

      if (editingVideo) {
        await API.put(`/videos/${editingVideo._id}`, dataToSubmit);
      } else {
        await API.post('/videos', dataToSubmit);
      }
      
      fetchVideos();
      setShowForm(false);
      setEditingVideo(null);
      resetForm();
    } catch (err) {
      alert('Failed to save video');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description,
      genre: video.genre.join(', '),
      duration: video.duration,
      releaseYear: video.releaseYear,
      thumbnail: video.thumbnail,
      bannerImage: video.bannerImage,
      videoUrl: video.videoUrl,
      type: video.type,
      isPremium: video.isPremium,
      featured: video.featured
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      genre: '',
      duration: '',
      releaseYear: '',
      thumbnail: '',
      bannerImage: '',
      videoUrl: '',
      type: 'movie',
      isPremium: false,
      featured: false
    });
  };

  if (loading && videos.length === 0) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <div className="admin-content">
      <div className="admin-header flex-header">
        <div>
          <h1>Video Management</h1>
          <p>Add, edit, or remove movies and shows from the platform.</p>
        </div>
        <button className="btn-primary" onClick={() => { resetForm(); setEditingVideo(null); setShowForm(true); }}>
          <FaPlus /> Add New Video
        </button>
      </div>

      {showForm && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <h2>{editingVideo ? 'Edit Video' : 'Add New Video'}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="movie">Movie</option>
                    <option value="show">Show</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Genre (comma separated)</label>
                  <input type="text" value={formData.genre} onChange={e => setFormData({...formData, genre: e.target.value})} placeholder="Action, Drama, Sci-Fi" required />
                </div>
                <div className="form-group">
                  <label>Duration / Episodes</label>
                  <input type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="2h 15m or 10 Episodes" required />
                </div>
                <div className="form-group">
                  <label>Release Year</label>
                  <input type="number" value={formData.releaseYear} onChange={e => setFormData({...formData, releaseYear: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Thumbnail URL</label>
                  <input type="text" value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Banner URL</label>
                  <input type="text" value={formData.bannerImage} onChange={e => setFormData({...formData, bannerImage: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Video URL</label>
                  <input type="text" value={formData.videoUrl} onChange={e => setFormData({...formData, videoUrl: e.target.value})} required />
                </div>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="3" required></textarea>
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" checked={formData.isPremium} onChange={e => setFormData({...formData, isPremium: e.target.checked})} />
                  Premium Content
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} />
                  Featured on Home
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Video</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Video</th>
              <th>Type</th>
              <th>Genre</th>
              <th>Views</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map(video => (
              <tr key={video._id}>
                <td>
                  <div className="video-info-cell">
                    <img src={video.thumbnail} alt="" className="table-thumb" />
                    <div>
                      <p className="user-name">{video.title}</p>
                      <p className="user-email">{video.releaseYear}</p>
                    </div>
                  </div>
                </td>
                <td>{video.type.toUpperCase()}</td>
                <td>{video.genre.join(', ')}</td>
                <td>{video.views}</td>
                <td>
                  <span className={`status-badge ${video.isVisible ? 'active' : 'blocked'}`}>
                    {video.isVisible ? 'Visible' : 'Hidden'}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <button className="action-icon-btn" onClick={() => handleToggleVisibility(video._id)}>
                      {video.isVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <button className="action-icon-btn" onClick={() => handleEdit(video)}>
                      <FaEdit />
                    </button>
                    <button className="action-icon-btn block" onClick={() => handleDelete(video._id)}>
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VideoManagement;
