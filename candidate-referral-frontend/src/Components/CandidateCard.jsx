import React from 'react';


const CandidateCard = ({ candidate, onStatusChange }) => {
  return (
    <div className="candidate-card">
      <div className="card-header">
        <h5 className="candidate-name">{candidate.name}</h5>
        <span className={`status-pill ${candidate.status.toLowerCase()}`}>
          {candidate.status}
        </span>
      </div>

      <div className="card-content">
        <p className="job-title">{candidate.jobTitle}</p>
        <div className="card-actions">
          <select
            className="status-select"
            value={candidate.status}
            onChange={(e) => onStatusChange(candidate._id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Hired">Hired</option>
          </select>

          {candidate.resumeUrl && (
            <a
              href={`http://localhost:5000${candidate.resumeUrl}`}
              className="resume-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 View Resume
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
