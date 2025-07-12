import React, { useState } from "react";
import "./RequestForm.css";
import { useNavigate } from "react-router-dom";
const RequestForm = () => {
  const [offeredSkill, setOfferedSkill] = useState("");
  const [wantedSkill, setWantedSkill] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Request Submitted:\nOffered: ${offeredSkill}\nWanted: ${wantedSkill}\nMessage: ${message}`
    );
    navigate("/swap-request");
  }; // ✅ Added missing closing brace

  return (
    <div className="swap-form-container">
      <form className="swap-form" onSubmit={handleSubmit}>
        <label htmlFor="offered">Choose one of your offered skills</label>
        <select
          id="offered"
          value={offeredSkill}
          onChange={(e) => setOfferedSkill(e.target.value)}
          required
        >
          <option value="">-- Select Skill --</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Photoshop">Photoshop</option>
        </select>

        <label htmlFor="wanted">Choose one of their wanted skills</label>
        <select
          id="wanted"
          value={wantedSkill}
          onChange={(e) => setWantedSkill(e.target.value)}
          required
        >
          <option value="">-- Select Skill --</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="JavaScript">JavaScript</option>
        </select>

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
        />

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
