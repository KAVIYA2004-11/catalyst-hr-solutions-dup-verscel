const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app  = express();
const port = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for simplicity in this project, or configure properly
}));
app.use(morgan(isProduction ? 'combined' : 'dev'));

// CORS Configuration
const corsOptions = {
  origin: isProduction 
    ? [process.env.FRONTEND_URL].filter(Boolean) 
    : ['http://localhost:3000', 'http://localhost:3001'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Postgres Connection
const poolConfig = process.env.DATABASE_URL 
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: isProduction ? { rejectUnauthorized: false } : false
    }
  : {
      host:     process.env.DB_HOST     || 'localhost',
      port:     Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME     || 'hr-catalyst',
      user:     process.env.DB_USER     || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres123',
    };

const pool = new Pool(poolConfig);

// Test connection on startup
pool.connect((err, client, done) => {
  if (err) {
    console.error('❌ PostgreSQL connection error:', err.message);
  } else {
    console.log('✅ Connected to PostgreSQL database');
    done();
  }
});

// Auth Middleware
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  
  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

/* ─── AUTH ENDPOINTS ────────────────────────────────────────── */

// Register
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, role || 'user']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(400).json({ error: 'User not found' });
    
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });
    
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─── JOBS ENDPOINTS ─────────────────────────────────────────── */

// Get all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY posted_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a new job (Admin only)
app.post('/api/jobs', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });
  const { title, dept, loc, exp, type, mode, interview, salary, description, is_urgent } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO jobs (title, dept, loc, exp, type, mode, interview, salary, description, is_urgent) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [title, dept, loc, exp, type, mode, interview, salary, description, is_urgent]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─── APPLICATIONS ENDPOINTS ─────────────────────────────────── */

// Submit application
app.post('/api/apps', authenticate, async (req, res) => {
  const { jobId, name, email, phone, experience, resume_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO applications (job_id, user_id, name, email, phone, experience, resume_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [jobId, req.user.id, name, email, phone, experience, resume_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's applications
app.get('/api/apps/user', authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT a.*, j.title as job_title, j.title as jobTitle FROM applications a JOIN jobs j ON a.job_id = j.id WHERE a.user_id = $1',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all applications (Admin only)
app.get('/api/apps/all', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });
  try {
    const result = await pool.query(
      'SELECT a.*, j.title as job_title, j.title as jobTitle, u.name as applicant_name FROM applications a JOIN jobs j ON a.job_id = j.id JOIN users u ON a.user_id = u.id'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update application status (Admin only)
app.put('/api/apps/:id/status', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });
  const { status, timeline } = req.body;
  try {
    const result = await pool.query(
      'UPDATE applications SET status = $1, timeline = $2 WHERE id = $3 RETURNING *',
      [status, JSON.stringify(timeline), req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Static files in production (disabled on Vercel to let CDN handle it)
if (isProduction && !process.env.VERCEL) {
  const buildPath = path.join(__dirname, '..', 'build');
  app.use(express.static(buildPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port} in ${isProduction ? 'production' : 'development'} mode`);
  });
}

// Export the app for Vercel serverless functions
module.exports = app;
