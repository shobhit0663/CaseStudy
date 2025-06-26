import React, { useState } from 'react';
import axios from 'axios';


const CandidateForm = ({ onSubmitSuccess }) => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', jobTitle: '', resume: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value
    });
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
      console.log(err);
    }
  };

  return (
    <div className="form-card">
      <h5 className="text-center mb-3">🎯 Refer a Candidate</h5>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
        <input type="text" name="jobTitle" placeholder="Job Title" value={form.jobTitle} onChange={handleChange} required />
        <input type="file" name="resume" accept="application/pdf" onChange={handleChange} required />
        <button type="submit">Submit Referral</button>
      </form>
    </div>
  );
};

export default CandidateForm;
