import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CandidateForm from './CandidateForm';
import CandidateList from './CandidateList';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState('');

  const loadCandidates = async () => {
    try {
      const res = await axios.get('http://localhost:5000/candidates');
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/candidates/${id}/status`, { status });
      loadCandidates();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <h2 className="main-heading">🎯 Candidate Referral Management</h2>

        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search by job title or status"
          onChange={(e) => setSearch(e.target.value)}
        />

        <CandidateForm onSubmitSuccess={loadCandidates} />
        <CandidateList
          candidates={candidates}
          search={search}
          onStatusChange={handleStatusChange}
        />
      </div>
    </>
  );
};

export default Dashboard;
