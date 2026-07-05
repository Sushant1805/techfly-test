'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL, fetchInstitutes, setupAuthOptions } from '@/lib/api';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [institutes, setInstitutes] = useState<any[]>([]);
  const [selectedInstitute, setSelectedInstitute] = useState<string>('');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('teacher');
  const [otpFullCode, setOtpFullCode] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadInstitutes = async () => {
      const data = await fetchInstitutes();
      if (data?.ok && data.institutes) {
        setInstitutes(data.institutes);
        if (data.institutes.length > 0) {
          setSelectedInstitute(data.institutes[0].slug);
        }
      }
    };
    loadInstitutes();
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);
    setOtpFullCode(newOtp.join(''));

    if (value && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!selectedInstitute) {
      setError('Please select an institute');
      return;
    }

    setLoading(true);
    const payloadMobile = mobile.startsWith('+91') ? mobile : `+91${mobile}`;

    try {
      const res = await fetch(`${API_BASE_URL}/${selectedInstitute}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, mobile: payloadMobile, password, role })
      });
      const data = await res.json();
      
      if (!res.ok || !data.ok) {
        setError(data.error || 'Signup failed');
      } else {
        setIsOtpMode(true);
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const payloadMobile = mobile.startsWith('+91') ? mobile : `+91${mobile}`;

    try {
      const res = await fetch(`${API_BASE_URL}/${selectedInstitute}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: payloadMobile, code: otpFullCode, purpose: 'signup', name, role })
      });
      const data = await res.json();
      
      if (!res.ok || !data.ok) {
        setError(data.error || 'Invalid OTP');
      } else {
        setupAuthOptions().setToken(data.token, data.user);
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 py-12">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {!isOtpMode ? 'Create Account' : 'Verify Signup OTP'}
        </h1>

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 p-3 rounded text-sm">
            {error}
          </div>
        )}

        {!isOtpMode ? (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institute</label>
              <select 
                value={selectedInstitute} 
                onChange={e => setSelectedInstitute(e.target.value)}
                className="w-full px-4 text-black py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                {institutes.map(inst => (
                  <option key={inst.slug} value={inst.slug}>{inst.name}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  className="w-full text-black px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select 
                  value={role} 
                  onChange={e => setRole(e.target.value)}
                  className="w-full px-4 text-black py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="owner">Owner</option>
                  <option value="manager">Manager</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full text-black px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 font-bold">
                  +91
                </span>
                <input 
                  type="text" 
                  value={mobile} 
                  onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="9876543210"
                  className="w-full text-black px-4 py-2 border rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                placeholder="Create password"
                className="w-full px-4 text-black py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium mt-2"
            >
              {loading ? 'Processing...' : 'Sign Up'}
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Sign in</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">Enter 6-digit OTP code</label>
              <div className="flex justify-between max-w-xs mx-auto gap-2">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { otpRefs.current[index] = el; }} // Ensure returning void
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-black text-black border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 uppercase shadow-inner"
                    required
                  />
                ))}
              </div>
              <p className="text-xs text-center text-gray-500 mt-4">
                An OTP was just generated (check server console in local).
              </p>
            </div>
            
            <button 
              type="submit" 
              disabled={loading || otpFullCode.length < 6}
              className="w-full mt-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Signup'}
            </button>
            <button 
              type="button" 
              onClick={() => setIsOtpMode(false)}
              className="w-full text-gray-500 py-2 border rounded-lg hover:bg-gray-50 transition"
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
