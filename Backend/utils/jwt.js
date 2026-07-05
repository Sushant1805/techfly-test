try { require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') }); } catch (e) {}
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'change_this_to_secure_secret';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

module.exports = { signToken };
