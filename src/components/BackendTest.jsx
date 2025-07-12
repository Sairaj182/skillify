// useEffect hook ke andar fetching hogi aur ye sara fetching should be done in app.jsx


import React, { useState } from 'react';

const API_BASE = "http://localhost:5001";

const BackendTest = () => {
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState(null);
  const [skills, setSkills] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [userId, setUserId] = useState('');
  const [skillName, setSkillName] = useState('');
  const [addSkillMsg, setAddSkillMsg] = useState('');
  const [allSkills, setAllSkills] = useState([]);
  // Admin states
  const [adminMsg, setAdminMsg] = useState('');
  const [banMsg, setBanMsg] = useState('');
  const [rejectMsg, setRejectMsg] = useState('');
  const [swapList, setSwapList] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [announcement, setAnnouncement] = useState('');
  const [announceMsg, setAnnounceMsg] = useState('');
  const [exportData, setExportData] = useState('');
  const [skillId, setSkillId] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackFrom, setFeedbackFrom] = useState('');
  const [feedbackTo, setFeedbackTo] = useState('');
  const [feedbackRating, setFeedbackRating] = useState('');
  const [feedbackComment, setFeedbackComment] = useState('');
  const [userFeedbackList, setUserFeedbackList] = useState([]);
  const [feedbackUserId, setFeedbackUserId] = useState('');
  const [swapRequestMsg, setSwapRequestMsg] = useState('');
  const [swapId, setSwapId] = useState('');
  const [pendingSwaps, setPendingSwaps] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };


  // Fetch single user
  const fetchUser = async () => {
    if (!userId) {
      alert("Please enter a valid user ID!");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/users/${userId}`);
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      setSingleUser(data);
    } catch (err) {
      setSingleUser({ error: err.message });
    }
  };

  // List user skills
  const fetchUserSkills = async () => {
    if (!userId) {
      alert("Please enter a valid user ID!");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/skills/user/${userId}`);
      if (!res.ok) throw new Error("User or skills not found");
      const data = await res.json();
      setSkills(data);
    } catch (err) {
      setSkills({ error: err.message });
    }
  };

  // Search users by skill
  const searchSkill = async () => {
    if (!skillName) {
      alert("Please enter a skill name!");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/skills/search?skill=${skillName}`);
      const data = await res.json();
      setSearchResult(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add offered skill
  const addOfferedSkill = async () => {
    if (!userId || !skillName) {
      alert("Please enter both user ID and skill name!");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/skills/offered/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, skill_name: skillName })
      });
      const data = await res.json();
      setAddSkillMsg(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  // List all skills
  const listAllSkills = async () => {
    try {
      const res = await fetch(`${API_BASE}/skills/all`);
      const data = await res.json();
      setAllSkills(data);
    } catch (err) {
      setAllSkills([{ error: "Error fetching skills" }]);
    }
  };

  // --- ADMIN ROUTES ---

  // Ban user
  const banUser = async () => {
    if (!userId) {
      alert("Enter user ID to ban");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/admin/ban/${userId}`, { method: "PUT" });
      const data = await res.json();
      setBanMsg(data.message);
    } catch (err) {
      setBanMsg("Error banning user");
    }
  };

  // Reject skill
  const rejectSkill = async () => {
    if (!skillId) {
      alert("Enter skill ID to reject");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/admin/reject_skill/${skillId}`, { method: "PUT" });
      const data = await res.json();
      setRejectMsg(data.message);
    } catch (err) {
      setRejectMsg("Error rejecting skill");
    }
  };

  // View all swaps
  const viewSwaps = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/swaps`);
      const data = await res.json();
      setSwapList(data);
    } catch (err) {
      setSwapList([{ error: "Error fetching swaps" }]);
    }
  };

  // View all feedback
  const viewFeedback = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/feedback`);
      const data = await res.json();
      setFeedbackList(data);
    } catch (err) {
      setFeedbackList([{ error: "Error fetching feedback" }]);
    }
  };

  // Send announcement
  const sendAnnouncement = async () => {
    if (!announcement) {
      alert("Enter announcement message");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/admin/announce`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: announcement })
      });
      const data = await res.json();
      setAnnounceMsg(data.message);
    } catch (err) {
      setAnnounceMsg("Error sending announcement");
    }
  };

  // Export reports
  const exportReports = async (type = "json") => {
    try {
      const res = await fetch(`${API_BASE}/admin/export?type=${type}`);
      const data = await res.json();
      setExportData(type === "csv" ? data.csv : JSON.stringify(data, null, 2));
    } catch (err) {
      setExportData("Error exporting data");
    }
  };

  // Submit feedback
  const submitFeedback = async () => {
    if (!feedbackFrom || !feedbackTo || !feedbackRating) {
      alert("Fill all feedback fields!");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/feedback/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from_user_id: feedbackFrom,
          to_user_id: feedbackTo,
          rating: feedbackRating,
          comment: feedbackComment
        })
      });
      const data = await res.json();
      setFeedbackMsg(data.message || data.error);
    } catch (err) {
      setFeedbackMsg("Error submitting feedback");
    }
  };

  // View feedback for a user
  const viewUserFeedback = async () => {
    if (!feedbackUserId) {
      alert("Enter user ID to view feedback");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/feedback/user/${feedbackUserId}`);
      const data = await res.json();
      setUserFeedbackList(data);
    } catch (err) {
      setUserFeedbackList([{ error: "Error fetching feedback" }]);
    }
  };

  // Send Swap Request
  const sendSwapRequest = async (fromUserId, toUserId, skillOffered, skillRequested) => {
    try {
      const res = await fetch(`${API_BASE}/swaps/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from_user_id: fromUserId,
          to_user_id: toUserId,
          skill_offered: skillOffered,
          skill_requested: skillRequested
        })
      });
      const data = await res.json();
      setSwapRequestMsg(data.message || data.error);
    } catch (err) {
      setSwapRequestMsg("Error sending swap request");
    }
  };

  // Accept Swap
  const acceptSwap = async () => {
    if (!swapId) {
      alert("Enter swap ID to accept");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/swaps/accept/${swapId}`, { method: "PUT" });
      const data = await res.json();
      setSwapRequestMsg(data.message || data.error);
    } catch (err) {
      setSwapRequestMsg("Error accepting swap");
    }
  };

  // Reject Swap
  const rejectSwap = async () => {
    if (!swapId) {
      alert("Enter swap ID to reject");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/swaps/reject/${swapId}`, { method: "PUT" });
      const data = await res.json();
      setSwapRequestMsg(data.message || data.error);
    } catch (err) {
      setSwapRequestMsg("Error rejecting swap");
    }
  };

  // Cancel Swap
  const cancelSwap = async () => {
    if (!swapId) {
      alert("Enter swap ID to cancel");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/swaps/cancel/${swapId}`, { method: "DELETE" });
      const data = await res.json();
      setSwapRequestMsg(data.message || data.error);
    } catch (err) {
      setSwapRequestMsg("Error cancelling swap");
    }
  };

  // View Swaps for User
  const viewSwapsForUser = async () => {
    if (!userId) {
      alert("Enter user ID to view swaps");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/swaps/user/${userId}`);
      const data = await res.json();
      setSwapList(data);
    } catch (err) {
      setSwapList([{ error: "Error fetching swaps" }]);
    }
  };

  // View Pending Swaps
  const viewPendingSwaps = async () => {
    if (!userId) {
      alert("Enter user ID to view pending swaps");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/swaps/pending/${userId}`);
      const data = await res.json();
      setPendingSwaps(data);
    } catch (err) {
      setPendingSwaps([{ error: "Error fetching pending swaps" }]);
    }
  };

  return (
    <div>
      <h2>Backend Test</h2>
      <button onClick={fetchUsers}>Fetch All Users</button>
      <div>
        <input
          placeholder="User ID"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <button onClick={fetchUser}>Fetch Single User</button>
        <button onClick={fetchUserSkills}>List User Skills</button>
      </div>
      <div>
        <input
          placeholder="Skill Name"
          value={skillName}
          onChange={e => setSkillName(e.target.value)}
        />
        <button onClick={searchSkill}>Search Users by Skill</button>
        <button onClick={addOfferedSkill}>Add Offered Skill</button>
      </div>
      <hr />
      <h3>Admin Actions</h3>
      <div>
        <button onClick={viewSwaps}>View All Swaps</button>
        <button onClick={viewFeedback}>View All Feedback</button>
        <button onClick={() => exportReports("json")}>Export Reports (JSON)</button>
        <button onClick={() => exportReports("csv")}>Export Reports (CSV)</button>
      </div>
      <div>
        <input
          placeholder="User ID to Ban"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <button onClick={banUser}>Ban User</button>
        <span>{banMsg}</span>
      </div>
      <div>
        <input
          placeholder="Skill ID to Reject"
          value={skillId}
          onChange={e => setSkillId(e.target.value)}
        />
        <button onClick={rejectSkill}>Reject Skill</button>
        <span>{rejectMsg}</span>
      </div>
      <div>
        <input
          placeholder="Announcement Message"
          value={announcement}
          onChange={e => setAnnouncement(e.target.value)}
        />
        <button onClick={sendAnnouncement}>Send Announcement</button>
        <span>{announceMsg}</span>
      </div>
      <div>
        <button onClick={listAllSkills}>List All Skills</button>
      </div>
      <hr />
      <h3>Feedback Actions</h3>
      <div>
        <h4>Submit Feedback</h4>
        <input
          placeholder="From User ID"
          value={feedbackFrom}
          onChange={e => setFeedbackFrom(e.target.value)}
        />
        <input
          placeholder="To User ID"
          value={feedbackTo}
          onChange={e => setFeedbackTo(e.target.value)}
        />
        <input
          placeholder="Rating (1-5)"
          value={feedbackRating}
          onChange={e => setFeedbackRating(e.target.value)}
          type="number"
          min="1"
          max="5"
        />
        <input
          placeholder="Comment"
          value={feedbackComment}
          onChange={e => setFeedbackComment(e.target.value)}
        />
        <button onClick={submitFeedback}>Submit Feedback</button>
        <span>{feedbackMsg}</span>
      </div>
      <div>
        <h4>View Feedback for User</h4>
        <input
          placeholder="User ID"
          value={feedbackUserId}
          onChange={e => setFeedbackUserId(e.target.value)}
        />
        <button onClick={viewUserFeedback}>View Feedback</button>
        <pre>{JSON.stringify(userFeedbackList, null, 2)}</pre>
      </div>
      <hr />
      <h3>Swap Actions</h3>
      <div>
        <h4>Send Swap Request</h4>
        <input placeholder="From User ID" id="fromUserId" />
        <input placeholder="To User ID" id="toUserId" />
        <input placeholder="Skill Offered" id="skillOffered" />
        <input placeholder="Skill Requested" id="skillRequested" />
        <button onClick={() => {
          const fromUserId = document.getElementById('fromUserId').value;
          const toUserId = document.getElementById('toUserId').value;
          const skillOffered = document.getElementById('skillOffered').value;
          const skillRequested = document.getElementById('skillRequested').value;
          sendSwapRequest(fromUserId, toUserId, skillOffered, skillRequested);
        }}>Send Swap Request</button>
      </div>
      <div>
        <input
          placeholder="Swap ID"
          value={swapId}
          onChange={e => setSwapId(e.target.value)}
        />
        <button onClick={acceptSwap}>Accept Swap</button>
        <button onClick={rejectSwap}>Reject Swap</button>
        <button onClick={cancelSwap}>Cancel Swap</button>
      </div>
      <div>
        <button onClick={viewSwapsForUser}>View Swaps for User</button>
        <button onClick={viewPendingSwaps}>View Pending Swaps</button>
      </div>
      <div>
        <span>{swapRequestMsg}</span>
        <h4>Pending Swaps:</h4>
        <pre>{JSON.stringify(pendingSwaps, null, 2)}</pre>
      </div>
      <hr />
      <div>
        <h3>All Users:</h3>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </div>
      <div>
        <h3>Single User:</h3>
        <pre>{JSON.stringify(singleUser, null, 2)}</pre>
      </div>
      <div>
        <h3>User Skills:</h3>
        <pre>{JSON.stringify(skills, null, 2)}</pre>
      </div>
      <div>
        <h3>Search Result:</h3>
        <pre>{JSON.stringify(searchResult, null, 2)}</pre>
      </div>
      <div>
        <h3>Add Skill Message:</h3>
        <pre>{addSkillMsg}</pre>
      </div>
      <div>
        <h3>Swap List:</h3>
        <pre>{JSON.stringify(swapList, null, 2)}</pre>
      </div>
      <div>
        <h3>Feedback List:</h3>
        <pre>{JSON.stringify(feedbackList, null, 2)}</pre>
      </div>
      <div>
        <h3>Exported Data:</h3>
        <pre>{exportData}</pre>
      </div>
      <div>
        <h3>All Skills:</h3>
        <pre>{JSON.stringify(allSkills, null, 2)}</pre>
      </div>
    </div>
  );
};

export default BackendTest;
