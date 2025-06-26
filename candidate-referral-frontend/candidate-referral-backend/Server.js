const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// File storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${uuidv4()}-${file.originalname}`)
});
const upload = multer({ storage });

// Read candidates from file
const getCandidates = () => {
  if (!fs.existsSync('candidates.json')) return [];
  const data = fs.readFileSync('candidates.json');
  return JSON.parse(data);
};

// Write candidates to file
const saveCandidates = (data) => {
  fs.writeFileSync('candidates.json', JSON.stringify(data, null, 2));
};

// Get all candidates
app.get('/candidates', (req, res) => {
  const candidates = getCandidates();
  res.json(candidates);
});

// Add new candidate
app.post('/candidates', upload.single('resume'), (req, res) => {
  const { name, email, phone, jobTitle } = req.body;
  const resumeUrl = req.file ? `/uploads/${req.file.filename}` : '';
  const newCandidate = {
    _id: uuidv4(),
    name,
    email,
    phone,
    jobTitle,
    resumeUrl,
    status: 'Pending'
  };
  const candidates = getCandidates();
  candidates.push(newCandidate);
  saveCandidates(candidates);
  res.status(201).json({ message: 'Candidate added successfully' });
});

// Update status
app.put('/candidates/:id/status', (req, res) => {
  const candidates = getCandidates();
  const updated = candidates.map(c => {
    if (c._id === req.params.id) {
      return { ...c, status: req.body.status };
    }
    return c;
  });
  saveCandidates(updated);
  res.json({ message: 'Status updated' });
});

