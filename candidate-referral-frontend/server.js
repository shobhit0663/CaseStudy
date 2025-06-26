// 📁 server.js (Node.js + Express backend for Candidate Referral System)

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

// Setup storage for resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});
const upload = multer({ storage });

const dataFile = path.join(__dirname, 'candidates.json');

// Read candidates from JSON file
const readCandidates = () => {
  if (!fs.existsSync(dataFile)) return [];
  const data = fs.readFileSync(dataFile);
  return JSON.parse(data);
};

// Write candidates to JSON file
const writeCandidates = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

// 📥 POST: Submit a new candidate
app.post('/candidates', upload.single('resume'), (req, res) => {
  const { name, email, phone, jobTitle } = req.body;
  const resumeUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const newCandidate = {
    _id: uuidv4(),
    name,
    email,
    phone,
    jobTitle,
    resumeUrl,
    status: 'Pending'
  };
  const candidates = readCandidates();
  candidates.push(newCandidate);
  writeCandidates(candidates);
  res.status(201).json({ message: 'Candidate submitted' });
});

// 📤 GET: Fetch all candidates
app.get('/candidates', (req, res) => {
  const candidates = readCandidates();
  res.json(candidates);
});

// 🔄 PUT: Update status
app.put('/candidates/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const candidates = readCandidates();
  const index = candidates.findIndex(c => c._id === id);
  if (index !== -1) {
    candidates[index].status = status;
    writeCandidates(candidates);
    res.json({ message: 'Status updated' });
  } else {
    res.status(404).json({ message: 'Candidate not found' });
  }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
