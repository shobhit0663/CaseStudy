// 📁 CandidateForm.jsx (Professional version)
import React, { useState } from 'react';
import axios from 'axios';
import './CandidateForm.css';

const CandidateForm = ({ onSubmitSuccess }) => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', jobTitle: '', resume: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    try {
      await axios.post('http://localhost:5000/candidates', formData);
      setForm({ name: '', email: '', phone: '', jobTitle: '', resume: null });
      onSubmitSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="candidate-form-container">
      <div className="candidate-form-card">
        <h4 className="form-title">Refer a Candidate</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="form-input"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="form-input"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="form-input"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              className="form-input"
              value={form.jobTitle}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              name="resume"
              className="form-input-file"
              onChange={handleChange}
              accept="application/pdf"
              required
            />
          </div>
          <button type="submit" className="submit-btn">Submit Referral</button>
        </form>
      </div>
    </div>
  );
};

export default CandidateForm;