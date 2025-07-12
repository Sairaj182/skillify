// useEffect hook ke andar fetching hogi aur ye sara fetching should be done in app.jsx


import React from 'react';

const API_BASE = "http://localhost:5001";

const BackendTest = ({
  users,
  singleUser,
  skills,
  searchResult,
  userId,
  setUserId,
  skillName,
  setSkillName,
  addSkillMsg,
  allSkills,
  adminMsg,
  banMsg,
  rejectMsg,
  swapList,
  feedbackList,
  announcement,
  setAnnouncement,
  announceMsg,
  exportData,
  skillId,
  setSkillId,
  feedbackMsg,
  feedbackFrom,
  setFeedbackFrom,
  feedbackTo,
  setFeedbackTo,
  feedbackRating,
  setFeedbackRating,
  feedbackComment,
  setFeedbackComment,
  userFeedbackList,
  feedbackUserId,
  setFeedbackUserId,
  swapRequestMsg,
  swapId,
  setSwapId,
  pendingSwaps,
  fetchUsers,
  fetchUser,
  fetchUserSkills,
  searchSkill,
  addOfferedSkill,
  listAllSkills,
  banUser,
  rejectSkill,
  viewSwaps,
  viewFeedback,
  sendAnnouncement,
  exportReports,
  submitFeedback,
  viewUserFeedback,
  sendSwapRequest,
  acceptSwap,
  rejectSwap,
  cancelSwap,
  viewSwapsForUser,
  viewPendingSwaps
}) => {
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
