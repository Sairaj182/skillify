import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import BackendTest from './components/BackendTest';
import Home from './Home';
import Login from './pages/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const API_BASE = "http://localhost:5001";

function App() {
  // --- State ---
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState(null);
  const [skills, setSkills] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [userId, setUserId] = useState('');
  const [skillName, setSkillName] = useState('');
  const [addSkillMsg, setAddSkillMsg] = useState('');
  const [allSkills, setAllSkills] = useState([]);
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

  // --- API Functions ---
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUser = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`${API_BASE}/api/users/${userId}`);
      const data = await res.json();
      setSingleUser(data);
    } catch (err) {
      setSingleUser({ error: err.message });
    }
  };

  const fetchUserSkills = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`${API_BASE}/skills/user/${userId}`);
      const data = await res.json();
      setSkills(data);
    } catch (err) {
      setSkills({ error: err.message });
    }
  };

  const searchSkill = async () => {
    if (!skillName) return;
    try {
      const res = await fetch(`${API_BASE}/skills/search?skill=${skillName}`);
      const data = await res.json();
      setSearchResult(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addOfferedSkill = async () => {
    if (!userId || !skillName) return;
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

  const listAllSkills = async () => {
    try {
      const res = await fetch(`${API_BASE}/skills/all`);
      const data = await res.json();
      setAllSkills(data);
    } catch (err) {
      setAllSkills([{ error: "Error fetching skills" }]);
    }
  };

  const banUser = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`${API_BASE}/admin/ban/${userId}`, { method: "PUT" });
      const data = await res.json();
      setBanMsg(data.message);
    } catch (err) {
      setBanMsg("Error banning user");
    }
  };

  const rejectSkill = async () => {
    if (!skillId) return;
    try {
      const res = await fetch(`${API_BASE}/admin/reject_skill/${skillId}`, { method: "PUT" });
      const data = await res.json();
      setRejectMsg(data.message);
    } catch (err) {
      setRejectMsg("Error rejecting skill");
    }
  };

  const viewSwaps = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/swaps`);
      const data = await res.json();
      setSwapList(data);
    } catch (err) {
      setSwapList([{ error: "Error fetching swaps" }]);
    }
  };

  const viewFeedback = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/feedback`);
      const data = await res.json();
      setFeedbackList(data);
    } catch (err) {
      setFeedbackList([{ error: "Error fetching feedback" }]);
    }
  };

  const sendAnnouncement = async () => {
    if (!announcement) return;
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

  const exportReports = async (type = "json") => {
    try {
      const res = await fetch(`${API_BASE}/admin/export?type=${type}`);
      const data = await res.json();
      setExportData(type === "csv" ? data.csv : JSON.stringify(data, null, 2));
    } catch (err) {
      setExportData("Error exporting data");
    }
  };

  const submitFeedback = async () => {
    if (!feedbackFrom || !feedbackTo || !feedbackRating) return;
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

  const viewUserFeedback = async () => {
    if (!feedbackUserId) return;
    try {
      const res = await fetch(`${API_BASE}/feedback/user/${feedbackUserId}`);
      const data = await res.json();
      setUserFeedbackList(data);
    } catch (err) {
      setUserFeedbackList([{ error: "Error fetching feedback" }]);
    }
  };

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

  const acceptSwap = async () => {
    if (!swapId) return;
    try {
      const res = await fetch(`${API_BASE}/swaps/accept/${swapId}`, { method: "PUT" });
      const data = await res.json();
      setSwapRequestMsg(data.message || data.error);
    } catch (err) {
      setSwapRequestMsg("Error accepting swap");
    }
  };

  const rejectSwap = async () => {
    if (!swapId) return;
    try {
      const res = await fetch(`${API_BASE}/swaps/reject/${swapId}`, { method: "PUT" });
      const data = await res.json();
      setSwapRequestMsg(data.message || data.error);
    } catch (err) {
      setSwapRequestMsg("Error rejecting swap");
    }
  };

  const cancelSwap = async () => {
    if (!swapId) return;
    try {
      const res = await fetch(`${API_BASE}/swaps/cancel/${swapId}`, { method: "DELETE" });
      const data = await res.json();
      setSwapRequestMsg(data.message || data.error);
    } catch (err) {
      setSwapRequestMsg("Error cancelling swap");
    }
  };

  const viewSwapsForUser = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`${API_BASE}/swaps/user/${userId}`);
      const data = await res.json();
      setSwapList(data);
    } catch (err) {
      setSwapList([{ error: "Error fetching swaps" }]);
    }
  };

  const viewPendingSwaps = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`${API_BASE}/swaps/pending/${userId}`);
      const data = await res.json();
      setPendingSwaps(data);
    } catch (err) {
      setPendingSwaps([{ error: "Error fetching pending swaps" }]);
    }
  };

  // --- Initial Data Fetch ---
  useEffect(() => {
    fetchUsers();
    listAllSkills();
    // You can add more fetches here if needed
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/test"
          element={
            <BackendTest
              users={users}
              singleUser={singleUser}
              skills={skills}
              searchResult={searchResult}
              userId={userId}
              setUserId={setUserId}
              skillName={skillName}
              setSkillName={setSkillName}
              addSkillMsg={addSkillMsg}
              allSkills={allSkills}
              adminMsg={adminMsg}
              banMsg={banMsg}
              rejectMsg={rejectMsg}
              swapList={swapList}
              feedbackList={feedbackList}
              announcement={announcement}
              setAnnouncement={setAnnouncement}
              announceMsg={announceMsg}
              exportData={exportData}
              skillId={skillId}
              setSkillId={setSkillId}
              feedbackMsg={feedbackMsg}
              feedbackFrom={feedbackFrom}
              setFeedbackFrom={setFeedbackFrom}
              feedbackTo={feedbackTo}
              setFeedbackTo={setFeedbackTo}
              feedbackRating={feedbackRating}
              setFeedbackRating={setFeedbackRating}
              feedbackComment={feedbackComment}
              setFeedbackComment={setFeedbackComment}
              userFeedbackList={userFeedbackList}
              feedbackUserId={feedbackUserId}
              setFeedbackUserId={setFeedbackUserId}
              swapRequestMsg={swapRequestMsg}
              swapId={swapId}
              setSwapId={setSwapId}
              pendingSwaps={pendingSwaps}
              fetchUsers={fetchUsers}
              fetchUser={fetchUser}
              fetchUserSkills={fetchUserSkills}
              searchSkill={searchSkill}
              addOfferedSkill={addOfferedSkill}
              listAllSkills={listAllSkills}
              banUser={banUser}
              rejectSkill={rejectSkill}
              viewSwaps={viewSwaps}
              viewFeedback={viewFeedback}
              sendAnnouncement={sendAnnouncement}
              exportReports={exportReports}
              submitFeedback={submitFeedback}
              viewUserFeedback={viewUserFeedback}
              sendSwapRequest={sendSwapRequest}
              acceptSwap={acceptSwap}
              rejectSwap={rejectSwap}
              cancelSwap={cancelSwap}
              viewSwapsForUser={viewSwapsForUser}
              viewPendingSwaps={viewPendingSwaps}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
