import React, { useState } from 'react';
import './SwapRequest.css';

const SwapRequests = () => {
  const [filter, setFilter] = useState('Pending');
  const [search, setSearch] = useState('');

  const requests = [
    {
      id: 1,
      name: 'Marc Demo',
      offered: 'Java Script',
      wanted: 'Photoshop',
      status: 'Pending',
      rating: 3.8,
    },
    {
      id: 2,
      name: 'name',
      offered: '',
      wanted: '',
      status: 'Rejected',
      rating: 3.9,
    },
  ];

  const handleStatusChange = (id, newStatus) => {
    alert(`Status for request ${id} changed to ${newStatus}`);
    // You can update backend or state here.
  };

  return (
    <div className="swap-requests-page">
      <header className="header">
        <h2>Skill Swap Platform</h2>
        <div className="nav-items">
          <span className="home-link">Home</span>
          <img src="https://via.placeholder.com/40" className="user-avatar" alt="User Profile" />
        </div>
      </header>

      <div className="filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>Pending</option>
          <option>Accepted</option>
          <option>Rejected</option>
        </select>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="request-list">
        {requests
          .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
          .filter((r) => filter === 'Pending' ? true : r.status === filter)
          .map((r) => (
            <div className="request-card" key={r.id}>
              <div className="profile-photo">Profile Photo</div>
              <div className="request-info">
                <div className="request-name">{r.name}</div>
                <div className="skills">
                  <div className="offered">
                    <span className="label-green">Skills Offered ⇒</span>
                    <span className="pill">{r.offered}</span>
                  </div>
                  <div className="wanted">
                    <span className="label-blue">Skill Wanted ⇒</span>
                    <span className="pill">{r.wanted}</span>
                  </div>
                </div>
                <div className="rating">rating {r.rating}/5</div>
              </div>
              <div className="status">
                <div>Status: <span>{r.status}</span></div>
                {r.status === 'Pending' && (
                  <div className="action-buttons">
                    <button className="accept" onClick={() => handleStatusChange(r.id, 'Accepted')}>Accept</button>
                    <button className="reject" onClick={() => handleStatusChange(r.id, 'Rejected')}>Reject</button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      <div className="pagination">
        <span>&lt;</span>
        <span className="page active">1</span>
        <span className="page">2</span>
        <span className="page">3</span>
        <span>&gt;</span>
      </div>
    </div>
  );
};

export default SwapRequests;