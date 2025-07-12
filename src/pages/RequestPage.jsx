import React from 'react';
import './UserDetail.css';
import { useNavigate, useParams } from 'react-router-dom';

const RequestPage = () => {
  const navigate = useNavigate();
  const { name } = useParams(); // Get username from URL

  return (
    <div className="user-detail-page">
      <header className="detail-header">
        <h2 className="platform-title">Skill Swap Platform</h2>
        <div className="nav-links">
          <span className="link" onClick={() => navigate('/swap')}>Swap request</span>
          <span className="link" onClick={() => navigate('/')}>Home</span>
          <img src="https://via.placeholder.com/40" alt="Avatar" className="avatar" />
        </div>
      </header>

      <div className="detail-body">
        <div className="left-panel">
          <button className="btn-request" onClick={() => navigate('/swap')}>
            Request
          </button>

          <h3 className="username">{name}</h3> {/* Dynamically rendered name */}

          <div className="section">
            <h4>Skills Offered</h4>
            <div className="tags">
              <span className="tag">JavaScript</span>
              <span className="tag">Python</span>
            </div>
          </div>

          <div className="section">
            <h4>Skills Wanted</h4>
            <div className="tags">
              <span className="tag">Photoshop</span>
              <span className="tag">Graphic Designer</span>
            </div>
          </div>

          <div className="section">
            <h4>Rating and Feedback</h4>
            <p>⭐ 4.2/5</p>
            <p>"Great collaborator!"</p>
          </div>
        </div>

        <div className="right-panel">
          <div className="profile-photo">Profile Photo</div>
        </div>
      </div>
    </div>
  );
};

export default RequestPage;
