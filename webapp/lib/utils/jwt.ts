import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'change_this_to_secure_secret';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';

export function signToken(payload: any) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN as any });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
}
