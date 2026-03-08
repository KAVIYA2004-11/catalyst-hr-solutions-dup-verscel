-- Catalyst HR Solutions Database Schema
-- Database: recipes_db | User: postgres | Password: postgres123 | Port: 5432
-- Run this in pgAdmin Query Tool on the 'recipes_db' database

-- 1. Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user', -- 'user', 'admin', 'recruiter'
    status VARCHAR(50) DEFAULT 'Approved',
    bio TEXT,
    phone VARCHAR(20),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    dept VARCHAR(100) NOT NULL,
    loc VARCHAR(100) NOT NULL,
    exp VARCHAR(100),
    type VARCHAR(50) DEFAULT 'Full-time',
    mode VARCHAR(50) DEFAULT 'WFO',
    interview VARCHAR(50) DEFAULT 'Virtual',
    salary VARCHAR(100),
    description TEXT,
    is_urgent BOOLEAN DEFAULT FALSE,
    needs_cert BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'Active',
    posted_at DATE DEFAULT CURRENT_DATE
);

-- 3. Create Applications Table
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    experience VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Applied',
    resume_url TEXT,
    timeline JSONB DEFAULT '["Applied"]'::jsonb,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Seed Data — All Job Listings
INSERT INTO jobs (title, dept, loc, exp, type, mode, interview, salary, description, is_urgent, needs_cert, posted_at) VALUES

-- URGENT OPENINGS
('Radiology Coder',          'Medical Coding',          'Chennai',                          'Min. 6 months', 'Full-time', 'WFO', 'Virtual',   '₹3–5 LPA',   'Certified Radiology Coder for a leading healthcare client. Proficient in CPT/ICD-10 radiology coding.',                          TRUE,  TRUE,  '2026-03-01'),
('IPDRG Coder',              'Medical Coding',          'Chennai, Bangalore, Hyderabad',    'Min. 1+ years', 'Full-time', 'WFO', 'Virtual',   '₹4–7 LPA',   'Experienced IPDRG Coder for inpatient DRG assignment and medical record review.',                                               TRUE,  TRUE,  '2026-03-01'),
('IPDRG QA Specialist',      'Quality Assurance',       'Chennai, Bangalore, Hyderabad',    'Min. 3+ years', 'Full-time', 'WFO', 'Virtual',   '₹7–12 LPA',  'Senior QA professional to audit IPDRG coded records and maintain quality benchmarks.',                                          TRUE,  TRUE,  '2026-03-01'),
('ED Coder',                 'Medical Coding',          'Chennai, Hyderabad',               'Min. 1+ years', 'Full-time', 'WFO', 'Virtual',   '₹4–6 LPA',   'Emergency Department Coder with experience in facility and professional coding.',                                              TRUE,  TRUE,  '2026-03-03'),
('Physician / Professional Fee Coder', 'Medical Coding','Chennai, Remote',                  'Min. 1+ years', 'Full-time', 'WFH', 'Virtual',   '₹3.5–6 LPA', 'Professional Fee Coder for physician practice billing. Multi-specialty coding knowledge required.',                             TRUE,  TRUE,  '2026-03-04'),
('Inpatient / Facility Coder','Medical Coding',         'Chennai, Bangalore',               'Min. 2+ years', 'Full-time', 'WFO', 'Virtual',   '₹5–8 LPA',   'Experienced Inpatient Facility Coder for complex hospital-based records. ICD-10-CM/PCS expertise required.',                    TRUE,  TRUE,  '2026-03-04'),
('Surgery Coder',            'Medical Coding',          'Chennai',                          'Min. 2+ years', 'Full-time', 'WFO', 'Virtual',   '₹5–9 LPA',   'Surgery Coder with expertise in coding complex surgical procedures across multiple specialties.',                               TRUE,  TRUE,  '2026-03-05'),
('Cardiology Coder',         'Medical Coding',          'Chennai, Hyderabad',               'Min. 1+ years', 'Full-time', 'WFO', 'Virtual',   '₹4–7 LPA',   'Cardiology Coder with knowledge of cardiovascular procedures, catheterization labs, and diagnostic coding.',                    TRUE,  TRUE,  '2026-03-06'),
('Orthopedic Coder',         'Medical Coding',          'Chennai',                          'Min. 1+ years', 'Full-time', 'WFO', 'Virtual',   '₹4–7 LPA',   'Orthopedic Coder specializing in musculoskeletal and joint procedures.',                                                       TRUE,  TRUE,  '2026-03-07'),
('Medical Coding Auditor',   'Quality Assurance',       'Chennai, Bangalore, Hyderabad',    'Min. 4+ years', 'Full-time', 'WFO', 'Virtual',   '₹8–14 LPA',  'Senior Medical Coding Auditor to review and audit coded records and provide coder education.',                                   TRUE,  TRUE,  '2026-03-07'),

-- REVENUE CYCLE MANAGEMENT
('AR Calling Executive',     'Revenue Cycle Mgmt',      'Chennai',                          '0–2 years',     'Full-time', 'WFO', 'In-person', '₹2–3.5 LPA', 'Handle insurance follow-ups and claim resolutions for healthcare billing clients.',                                             FALSE, FALSE, '2026-02-20'),
('Medical Billing Specialist','Medical Billing',         'Chennai',                          '1–3 years',     'Full-time', 'WFO', 'Virtual',   '₹3–5 LPA',   'End-to-end medical billing — claims creation, verifications, and reimbursements.',                                              FALSE, FALSE, '2026-02-15'),
('Denial Management Specialist','Revenue Cycle Mgmt',   'Chennai, Remote',                  '2–4 years',     'Full-time', 'WFH', 'Virtual',   '₹3.5–6 LPA', 'Review and resolve denied claims, identify denial trends, and implement corrective actions.',                                   FALSE, FALSE, '2026-02-25'),
('Payment Posting Executive','Medical Billing',          'Chennai',                          '0–2 years',     'Full-time', 'WFO', 'In-person', '₹2–3 LPA',   'Post insurance and patient payments accurately into billing systems. Reconcile EOBs and ERAs.',                                 FALSE, FALSE, '2026-02-28'),
('RCM Team Lead',            'Revenue Cycle Mgmt',      'Chennai',                          '5+ years',      'Full-time', 'WFO', 'In-person', '₹8–14 LPA',  'Lead a team of AR callers and billing specialists. Manage performance, workflow, and client reporting.',                         FALSE, FALSE, '2026-02-10'),

-- IT & NON-IT
('Healthcare IT Analyst',    'Information Technology',  'Chennai, Bangalore',               '2–5 years',     'Full-time', 'WFH', 'Virtual',   '₹6–10 LPA',  'Analyze and support healthcare IT systems including EHR, billing software, and payer portals.',                                  FALSE, FALSE, '2026-02-18'),
('HR Executive – Healthcare','Human Resources',          'Chennai',                          '1–3 years',     'Full-time', 'WFO', 'In-person', '₹3–5 LPA',   'Manage end-to-end recruitment for healthcare roles including medical coders, billers, and RCM specialists.',                     FALSE, FALSE, '2026-02-22'),
('Data Entry Operator – Medical Records','Operations',  'Chennai',                          '0–1 years',     'Full-time', 'WFO', 'In-person', '₹1.5–2.5 LPA','Accurately enter patient demographics, insurance details, and medical records into electronic systems.',                        FALSE, FALSE, '2026-03-01');

-- 5. Admin User Seed
INSERT INTO users (name, email, password_hash, role, status) VALUES
('Admin Secure', 'admin.secure@catalysthr.solutions', '$2b$10$placeholder_run_bcrypt_to_generate', 'admin', 'Approved')
ON CONFLICT (email) DO NOTHING;
