const express = require('express');
const app = express();
const path = require('path');
// Load environment variables from .env located next to this file
try {
  require('dotenv').config({ path: path.join(__dirname, '.env') });
} catch (e) {}
const PORT = process.env.PORT || 5000;
const connectDB = require('./db');

app.use(express.json());

// serve uploaded documents
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const bcrypt = require('bcryptjs');
const Institute = require('./models/institute');
const User = require('./models/user');
const Otp = require('./models/otp');
const { signToken } = require('./utils/jwt');
const Staff = require('./models/staff');
const { upload } = require('./utils/uploads');

app.get('/', (req, res) => {
  res.json({ status: 'ok', port: PORT });
});

// Create a new institute (admin usage)
app.post('/add-institute', async (req, res) => {
  try {
    const { name, slug } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });

    const instituteSlug =
      (slug && slug.toString().trim()) ||
      name.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');

    const existing = await Institute.findOne({ slug: instituteSlug });
    if (existing) return res.status(400).json({ error: 'Institute already exists' });

    const inst = new Institute({ name, slug: instituteSlug });
    await inst.save();
    res.json({ ok: true, institute: inst });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Public: list all institutes
app.get('/institutes', async (req, res) => {
  try {
    const list = await Institute.find({}).sort({ createdAt: -1 }).limit(500);
    res.json({ ok: true, institutes: list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Public: get single institute by slug
app.get('/institutes/:slug', async (req, res) => {
  try {
    const inst = await Institute.findOne({ slug: req.params.slug });
    if (!inst) return res.status(404).json({ error: 'Institute not found' });
    res.json({ ok: true, institute: inst });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});



// Middleware to load institute by slug for API routes
async function loadInstitute(req, res, next) {
  try {
    const slug = req.params.instituteSlug || req.body.instituteSlug || req.headers['x-institute-slug'] || req.query.instituteSlug;
    if (!slug) return res.status(400).json({ error: 'instituteSlug is required (body/header/query)' });
    const institute = await Institute.findOne({ slug });
    if (!institute) return res.status(404).json({ error: 'Institute not found' });
    req.institute = institute;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
}

const apiBase = '/:instituteSlug/api';

// Create staff handler (used by /staff and /add-staff)
async function createStaffHandler(req, res) {
  try {
    const headerUserId = req.headers['x-user-id'];
    let owner = null;
    if (headerUserId) {
      owner = await User.findOne({ _id: headerUserId, institute: req.institute._id });
      if (!owner || owner.role !== 'owner') return res.status(403).json({ error: 'Only owner can add staff' });
    }

    const { name, phone, email, role, branch, salaryType, salaryAmount } = req.body;
    if (!name || !phone || !role) return res.status(400).json({ error: 'name, phone and role are required' });

    const allowedRoles = ['Teacher','HR','Reception','Manager'];
    if (!allowedRoles.includes(role)) return res.status(400).json({ error: 'Invalid role' });

    const documents = (req.files || []).map(f => ({ filename: f.originalname, url: `/uploads/${f.filename}`, mimetype: f.mimetype }));

    const staff = new Staff({
      name,
      phone,
      email,
      role,
      branch,
      salary: salaryType ? { type: salaryType, amount: salaryAmount ? Number(salaryAmount) : undefined } : undefined,
      documents,
      institute: req.institute._id,
      instituteId: req.institute._id.toString(),
      instituteName: req.institute.name,
      createdBy: owner ? owner._id : undefined
    });

    await staff.save();
    res.json({ ok: true, staff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
}

// Add staff (alias)
app.post(`${apiBase}/add-staff`, loadInstitute, upload.array('documents', 10), createStaffHandler);
// Create staff
app.post(`${apiBase}/staff`, loadInstitute, upload.array('documents', 10), createStaffHandler);

// Edit staff (update fields, optionally upload new documents which will be appended)
app.put(`${apiBase}/staff/:id`, loadInstitute, upload.array('documents', 10), async (req, res) => {
  try {
    const id = req.params.id;
    const staff = await Staff.findOne({ _id: id, institute: req.institute._id });
    if (!staff) return res.status(404).json({ error: 'Staff not found' });

    const headerUserId = req.headers['x-user-id'];
    if (headerUserId) {
      const owner = await User.findOne({ _id: headerUserId, institute: req.institute._id });
      if (!owner || owner.role !== 'owner') return res.status(403).json({ error: 'Only owner can edit staff' });
    }

    const { name, phone, email, role, branch, salaryType, salaryAmount } = req.body;
    if (name) staff.name = name;
    if (phone) staff.phone = phone;
    if (email) staff.email = email;
    if (role) {
      const allowedRoles = ['Teacher','HR','Reception','Manager'];
      if (!allowedRoles.includes(role)) return res.status(400).json({ error: 'Invalid role' });
      staff.role = role;
    }
    if (branch) staff.branch = branch;
    if (salaryType) staff.salary = { type: salaryType, amount: salaryAmount ? Number(salaryAmount) : undefined };

    const newDocs = (req.files || []).map(f => ({ filename: f.originalname, url: `/uploads/${f.filename}`, mimetype: f.mimetype }));
    if (newDocs.length) staff.documents = (staff.documents || []).concat(newDocs);

    await staff.save();
    res.json({ ok: true, staff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Get single staff
app.get(`${apiBase}/staff/:id`, loadInstitute, async (req, res) => {
  try {
    const staff = await Staff.findOne({ _id: req.params.id, institute: req.institute._id });
    if (!staff) return res.status(404).json({ error: 'Staff not found' });
    res.json({ ok: true, staff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// List staff (supports optional query: role, branch)
app.get(`${apiBase}/staff`, loadInstitute, async (req, res) => {
  try {
    const q = { institute: req.institute._id };
    if (req.query.role) q.role = req.query.role;
    if (req.query.branch) q.branch = req.query.branch;
    const list = await Staff.find(q).sort({ createdAt: -1 }).limit(200);
    res.json({ ok: true, staff: list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Signup under an institute (provide instituteSlug in body/header/query)
app.post(`${apiBase}/signup`, loadInstitute, async (req, res) => {
  try {
    const { name, email, password, mobile, role } = req.body;
    if (!name || !email || !password || !mobile) return res.status(400).json({ error: 'name, email, mobile, password are required' });

    const allowedRoles = ['owner', 'manager', 'teacher', 'techfly_admin'];
    if (role && !allowedRoles.includes(role)) return res.status(400).json({ error: 'Invalid role. Allowed: owner, manager, teacher' });

    // Prevent same email/mobile being registered in a different institute
    const conflict = await User.findOne({ $or: [{ mobile }, { email }], institute: { $ne: req.institute._id } });
    if (conflict) return res.status(400).json({ error: 'User with same mobile/email already exists in another institute' });

    // Check if a user already exists for this mobile/email in this institute
    let user = await User.findOne({ $or: [{ mobile }, { email }], institute: req.institute._id });
    if (user && user.verified) return res.status(400).json({ error: 'User already exists and verified for this institute' });

    const passwordHash = await bcrypt.hash(password, 8);
    if (user) {
      // Update existing unverified user
      user.name = name;
      user.email = email;
      user.passwordHash = passwordHash;
      user.verified = false;
      user.role = role || user.role || 'teacher';
      user.institute = req.institute._id;
      user.instituteId = req.institute._id.toString();
      user.instituteName = req.institute.name;
      await user.save();
    } else {
      user = new User({
        name,
        email,
        mobile,
        passwordHash,
        institute: req.institute._id,
        instituteId: req.institute._id.toString(),
        instituteName: req.institute.name,
        verified: false,
        role: role || 'teacher'
      });
      await user.save();
    }

    // Send OTP for signup verification
    let twilioUnverified = false;
    try {
      const { sendVerification } = require('./utils/twilio');
      if (process.env.TWILIO_VERIFY_SERVICE_SID) {
        await sendVerification(mobile, 'sms');
        return res.json({ ok: true, message: 'OTP sent via Twilio Verify' });
      }
    } catch (err) {
      const msg = err && err.message ? err.message : String(err);
      console.error('Twilio Verify error (falling back to local OTP):', msg);
      if (/unverified|trial accounts cannot send messages/i.test(msg)) {
        twilioUnverified = true;
        console.warn('Twilio trial/unverified number detected — using default OTP 123456');
      }
    }

    // Fallback local OTP
    const code = twilioUnverified ? '123456' : Math.floor(100000 + Math.random() * 900000).toString();
    const codeHash = await bcrypt.hash(code, 8);
    const expiresAt = new Date(Date.now() + (parseInt(process.env.OTP_EXPIRES_MINUTES || '5') * 60 * 1000));
    const otp = new Otp({ mobile, institute: req.institute._id, codeHash, purpose: 'signup', expiresAt });
    await otp.save();
    try {
      const { sendSms } = require('./utils/twilio');
      await sendSms(mobile, `Your signup OTP for ${req.institute.name} is ${code}`);
    } catch (e) {}

    const response = { ok: true, message: 'OTP generated (local)' };
    if (process.env.NODE_ENV !== 'production' || twilioUnverified) response.code = code;
    return res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Login under an institute (provide instituteSlug in body/header/query)
app.post(`${apiBase}/login`, loadInstitute, async (req, res) => {
  try {
    console.log('Login Request Body:', req.body);
    const { mobile, password } = req.body;
    if (!mobile || !password) return res.status(400).json({ error: 'mobile and password required' });

    const user = await User.findOne({ mobile, institute: req.institute._id });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const ok = await bcrypt.compare(password, user.passwordHash || '');
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    // Send OTP for login verification
    let twilioUnverified = false;
    try {
      const { sendVerification } = require('./utils/twilio');
      if (process.env.TWILIO_VERIFY_SERVICE_SID) {
        await sendVerification(mobile, 'sms');
        return res.json({ ok: true, message: 'OTP sent via Twilio Verify' });
      }
    } catch (err) {
      const msg = err && err.message ? err.message : String(err);
      console.error('Twilio Verify error (falling back to local OTP):', msg);
      if (/unverified|trial accounts cannot send messages/i.test(msg)) {
        twilioUnverified = true;
        console.warn('Twilio trial/unverified number detected — using default OTP 123456');
      }
    }

    // Fallback local OTP
    const code = twilioUnverified ? '123456' : Math.floor(100000 + Math.random() * 900000).toString();
    const codeHash = await bcrypt.hash(code, 8);
    const expiresAt = new Date(Date.now() + (parseInt(process.env.OTP_EXPIRES_MINUTES || '5') * 60 * 1000));
    const otp = new Otp({ mobile, institute: req.institute._id, codeHash, purpose: 'login', expiresAt });
    await otp.save();
    try {
      const { sendSms } = require('./utils/twilio');
      await sendSms(mobile, `Your login OTP for ${req.institute.name} is ${code}`);
    } catch (e) {}

    const response = { ok: true, message: 'OTP generated (local)' };
    if (process.env.NODE_ENV !== 'production' || twilioUnverified) response.code = code;
    return res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Request OTP (signup/login) — returns code in response for development (not for production)
app.post(`${apiBase}/request-otp`, loadInstitute, async (req, res) => {
  try {
    const { mobile, purpose = 'login' } = req.body;
    if (!mobile) return res.status(400).json({ error: 'mobile is required' });

    let twilioUnverified = false;
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    let code = randomCode;
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // If Twilio Verify is configured, use it instead of storing OTP locally
    try {
      const { sendVerification } = require('./utils/twilio');
      if (process.env.TWILIO_VERIFY_SERVICE_SID) {
        await sendVerification(mobile, 'sms');
        return res.json({ ok: true, message: 'OTP sent via Twilio Verify', sent: true });
      }
    } catch (err) {
      const msg = err && err.message ? err.message : String(err);
      console.error('Twilio Verify error (falling back to local OTP):', msg);
      if (/unverified|trial accounts cannot send messages/i.test(msg)) {
        twilioUnverified = true;
        console.warn('Twilio trial/unverified number detected — using default OTP 123456');
      }
    }

    // Fallback: save OTP locally and (optionally) send via Messaging Service
    if (twilioUnverified) code = '123456';
    const codeHash = await bcrypt.hash(code, 8);
    const otp = new Otp({ mobile, institute: req.institute._id, codeHash, purpose, expiresAt });
    await otp.save();

    let sent = false;
    try {
      const { sendSms } = require('./utils/twilio');
      await sendSms(mobile, `Your OTP for ${req.institute.name} is ${code}`);
      sent = true;
    } catch (err) {
      // ignore send errors; keep OTP stored for manual verification
    }

    const response = { ok: true, message: 'OTP generated (local)', sent };
    if (process.env.NODE_ENV !== 'production' || twilioUnverified) response.code = code;

    console.log(`OTP for ${mobile} (${purpose}) = ${code}`);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Verify OTP — for signup or login
app.post(`${apiBase}/verify-otp`, loadInstitute, async (req, res) => {
  try {
    const { mobile, code, purpose = 'login', name } = req.body;
    if (!mobile || !code) return res.status(400).json({ error: 'mobile and code are required' });

    // If Twilio Verify is configured, try validate via Verify API —
    // but if the check fails or is not approved, fall back to local OTP verification.
    let twilioVerified = false;
    if (process.env.TWILIO_VERIFY_SERVICE_SID) {
      try {
        const { checkVerification } = require('./utils/twilio');
        const check = await checkVerification(mobile, code);
        if (check && check.status === 'approved') {
          twilioVerified = true;
        }
      } catch (err) {
        console.error('Twilio Verify check error — falling back to local OTP:', err.message || err);
        if (code === '123456') {
          console.warn('Twilio check error, but using default OTP 123456 for verification.');
          twilioVerified = true;
        }
      }
    }

    if (twilioVerified) {
      // Verified — proceed with signup or login
      if (purpose === 'signup') {
        // Prevent same mobile/email in other institutes
        const conditions = [{ mobile }];
        if (req.body.email) conditions.push({ email: req.body.email });
        const other = await User.findOne({ $or: conditions, institute: { $ne: req.institute._id } });
        if (other) return res.status(400).json({ error: 'User with same mobile/email already exists in another institute' });

        let user = await User.findOne({ mobile, institute: req.institute._id });
        if (!user) {
          const userRole = req.body.role && ['owner', 'manager', 'teacher', 'techfly_admin'].includes(req.body.role) ? req.body.role : 'teacher';
          user = new User({
            name: name || 'User',
            mobile,
            institute: req.institute._id,
            instituteId: req.institute._id.toString(),
            instituteName: req.institute.name,
            verified: true,
            role: userRole
          });
          await user.save();
        } else {
          user.verified = true;
          user.institute = req.institute._id;
          user.instituteId = req.institute._id.toString();
          user.instituteName = req.institute.name;
          await user.save();
        }
        const token = signToken({ userId: user._id.toString(), instituteId: req.institute._id.toString(), role: user.role || 'teacher' });
        return res.json({ ok: true, token, user: { id: user._id, name: user.name, mobile: user.mobile, role: user.role, instituteId: req.institute.slug, instituteName: req.institute.name } });
      }

      const user = await User.findOne({ mobile, institute: req.institute._id });
      if (!user) return res.status(404).json({ error: 'User not found for this mobile — signup first' });
      const token = signToken({ userId: user._id.toString(), instituteId: req.institute._id.toString(), role: user.role || 'teacher' });
      return res.json({ ok: true, token, user: { id: user._id, name: user.name, mobile: user.mobile, role: user.role, instituteId: req.institute.slug, instituteName: req.institute.name } });
    }

    // Fallback local OTP verification (only when Twilio Verify not configured)
    const otp = await Otp.findOne({ mobile, institute: req.institute._id, purpose, used: false }).sort({ createdAt: -1 });
    if (!otp) return res.status(400).json({ error: 'OTP not found' });
    if (otp.expiresAt < new Date()) return res.status(400).json({ error: 'OTP expired' });

    const ok = await bcrypt.compare(code, otp.codeHash);
    if (!ok) return res.status(401).json({ error: 'Invalid OTP' });

    otp.used = true;
    await otp.save();

    // If signup, create or mark user verified
    if (purpose === 'signup') {
      // Prevent same mobile/email in other institutes
      const conditions = [{ mobile }];
      if (req.body.email) conditions.push({ email: req.body.email });
      const other = await User.findOne({ $or: conditions, institute: { $ne: req.institute._id } });
      if (other) return res.status(400).json({ error: 'User with same mobile/email already exists in another institute' });

      let user = await User.findOne({ mobile, institute: req.institute._id });
        if (!user) {
          const userRole = req.body.role && ['owner', 'manager', 'teacher', 'techfly_admin'].includes(req.body.role) ? req.body.role : 'teacher';
          user = new User({
            name: name || 'User',
            mobile,
            institute: req.institute._id,
            instituteId: req.institute._id.toString(),
            instituteName: req.institute.name,
            verified: true,
            role: userRole
          });
          await user.save();
        } else {
          user.verified = true;
          user.institute = req.institute._id;
          user.instituteId = req.institute._id.toString();
          user.instituteName = req.institute.name;
          await user.save();
        }
      const token = signToken({ userId: user._id.toString(), instituteId: req.institute._id.toString(), role: user.role || 'teacher' });
      return res.json({ ok: true, token, user: { id: user._id, name: user.name, mobile: user.mobile, role: user.role, instituteId: req.institute.slug, instituteName: req.institute.name } });
    }

    // login
    const user = await User.findOne({ mobile, institute: req.institute._id });
    if (!user) return res.status(404).json({ error: 'User not found for this mobile — signup first' });
    const token = signToken({ userId: user._id.toString(), instituteId: req.institute._id.toString(), role: user.role || 'teacher' });
    return res.json({ ok: true, token, user: { id: user._id, name: user.name, mobile: user.mobile, role: user.role, instituteId: req.institute.slug, instituteName: req.institute.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})();

module.exports = app;
