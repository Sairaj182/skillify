import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

const users = [
  {
    name: 'Marc Demo',
    offered: ['JavaScript', 'Python'],
    wanted: ['Photoshop', 'Graphic designer'],
    rating: 3.9,
  },
  {
    name: 'Michell',
    offered: ['JavaScript', 'Python'],
    wanted: ['Photoshop', 'Graphic designer'],
    rating: 2.5,
  },
  {
    name: 'Joe Wills',
    offered: ['JavaScript', 'Python'],
    wanted: ['Photoshop', 'Graphic designer'],
    rating: 4.0,
  },
];

const SearchResults = () => {
  const navigate = useNavigate();
  const [availability, setAvailability] = useState('Availability');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="search-page">
      <header className="search-header">
        <h2>Skill Swap Platform</h2>
        <button className="login-btn" onClick={handleLogin}>Login</button>
      </header>

      <div className="filter-bar">
        <select
          className="availability-dropdown"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option>Availability</option>
          <option>Weekdays</option>
          <option>Weekends</option>
        </select>
        <input
          className="search-input"
          type="text"
          placeholder="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="user-list">
        {users.map((user, index) => (
          <div key={index} className="user-card">
            <div className="profile-photo">Profile Photo</div>
            <div className="user-info">
              <h3>{user.name}</h3>
              <div className="skills">
                <span className="skill-label-green">Skills Offered ⇒</span>
                {user.offered.map((skill, i) => (
                  <span key={i} className="skill-badge">{skill}</span>
                ))}
              </div>
              <div className="skills">
                <span className="skill-label-blue">Skill Wanted ⇒</span>
                {user.wanted.map((skill, i) => (
                  <span key={i} className="skill-badge">{skill}</span>
                ))}
              </div>
              <div className="rating">Rating: {user.rating}/5</div>
            </div>
            <div className="request-button">
              <button className="btn-request" onClick={() => navigate(`/request/${encodeURIComponent(user.name)}`)}>Request</button>
              <button className="btn-request" onClick={() => navigate(`/profile/${encodeURIComponent(user.name)}`)}>Profile</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <span key={num} className="page-number">{num}</span>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
