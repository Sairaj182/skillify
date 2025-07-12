import React, { useState, useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

const USERS_PER_PAGE = 5;

const SearchResults = ({ users }) => {
  const navigate = useNavigate();
  const [availability, setAvailability] = useState('Availability');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [availability, searchTerm]);

  const handleLogin = () => {
    navigate('/login');
  };

  // Filter users by availability and search term
  const filteredUsers = users
    ? users.filter(user => {
        const matchesAvailability =
          availability === 'Availability' ||
          user.availability === availability;
        const matchesSearch =
          user.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesAvailability && matchesSearch;
      })
    : [];

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIdx = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIdx, startIdx + USERS_PER_PAGE);

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
        {paginatedUsers && paginatedUsers.length > 0 ? (
          paginatedUsers.map((user, index) => (
            <div key={index} className="user-card">
              <div className="profile-photo">Profile Photo</div>
              <div className="user-info">
                <h3>{user.name}</h3>
                <div>Location: {user.location}</div>
                <div>Availability: {user.availability}</div>
                <div>Profile Type: {user.profileType}</div>
                <div className="skills">
                  <span className="skill-label-green">Skills Offered ⇒</span>
                  {(user.offered?.length ? user.offered : user.skillsOffered?.length ? user.skillsOffered : []).map((skill, i) => (
                    <span key={i} className="skill-badge">{skill}</span>
                  ))}
                </div>
                <div className="skills">
                  <span className="skill-label-blue">Skills Wanted ⇒</span>
                  {(user.wanted?.length ? user.wanted : user.skillsWanted?.length ? user.skillsWanted : []).map((skill, i) => (
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
          ))
        ) : (
          <div>No users found.</div>
        )}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <span
            key={num}
            className={`page-number${num === currentPage ? ' active' : ''}`}
            onClick={() => setCurrentPage(num)}
            style={{ cursor: 'pointer', margin: '0 4px' }}
          >
            {num}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
