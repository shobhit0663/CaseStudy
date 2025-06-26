// 📁 src/Components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CandidateForm from './CandidateForm';
import CandidateList from './CandidateList';
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
    <div className="main-wrapper py-5">
      <div className="container">
        <h2 className="app-heading text-center mb-5">🎯 Candidate Referral Management</h2>

        <div className="row justify-content-center mb-4">
          <div className="col-md-8 col-lg-6">
            <input
              type="text"
              className="form-control form-control-lg shadow-sm"
              placeholder="🔍 Search by job title or status"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-md-8 col-lg-6">
            <CandidateForm onSubmitSuccess={loadCandidates} />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-10">
            <CandidateList
              candidates={candidates}
              search={search}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
