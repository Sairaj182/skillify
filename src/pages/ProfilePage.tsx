import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import { useParams } from "react-router-dom";

const dummyUserData = {
  "Marc Demo": {
    location: "Mumbai",
    skillsOffered: ["JavaScript", "React"],
    skillsWanted: ["Python", "Photoshop"],
    availability: "Weekdays",
    profileType: "Public",
  },
  Michell: {
    location: "Delhi",
    skillsOffered: ["Graphic Design"],
    skillsWanted: ["JavaScript"],
    availability: "Weekends",
    profileType: "Private",
  },
  // Add more users if needed
};

const EditProfile = () => {
  const { name } = useParams();

  const [location, setLocation] = useState("");
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [availability, setAvailability] = useState("");
  const [profileType, setProfileType] = useState("");

  //   s

  const handleRemoveSkill = (skill, type) => {
    if (type === "offered") {
      setSkillsOffered(skillsOffered.filter((s) => s !== skill));
    } else {
      setSkillsWanted(skillsWanted.filter((s) => s !== skill));
    }
  };

  return (
    <div className="edit-profile">
      <header className="profile-header">
        <div className="nav">
          <span className="save">Save</span>
          <span className="discard">Discard</span>
          <span>Swap request</span>
          <span>Home</span>
          <img
            src="https://via.placeholder.com/40"
            className="avatar"
            alt="Profile"
          />
        </div>
      </header>

      <div className="form-body">
        <div className="left-side">
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} disabled />
          </div>

          <div className="form-group location-row">
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Skills Offered</label>
            <div className="skill-tags">
              {skillsOffered.map((skill, idx) => (
                <span key={idx} className="tag">
                  {skill}
                  <button onClick={() => handleRemoveSkill(skill, "offered")}>
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Skills Wanted</label>
            <div className="skill-tags">
              {skillsWanted.map((skill, idx) => (
                <span key={idx} className="tag">
                  {skill}
                  <button onClick={() => handleRemoveSkill(skill, "wanted")}>
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Availability</label>
            <input
              type="text"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Profile Type</label>
            <input
              type="text"
              value={profileType}
              onChange={(e) => setProfileType(e.target.value)}
            />
          </div>
        </div>

        <div className="right-side">
          <div className="photo-box">
            <div className="photo-circle">Profile Photo</div>
            <div className="photo-actions">
              <span>Add/Edit</span>
              <span className="remove">Remove</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
