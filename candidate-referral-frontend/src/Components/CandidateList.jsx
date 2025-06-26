// 📁 CandidateList.jsx (Professional Styled)
import React from 'react';
import CandidateCard from './CandidateCard';
import './CandidateList.css';

const CandidateList = ({ candidates, search, onStatusChange }) => {
  const filtered = candidates.filter(c =>
    c.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
    c.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="candidate-list-container">
      {filtered.length > 0 ? (
        filtered.map(candidate => (
          <CandidateCard
            key={candidate._id}
            candidate={candidate}
            onStatusChange={onStatusChange}
          />
        ))
      ) : (
        <p className="no-candidates">No candidates found.</p>
      )}
    </div>
  );
};

export default CandidateList;
