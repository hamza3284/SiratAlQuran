import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import BaseLayout from '../components/BaseLayout';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Passwords don't match");
      return;
    }

    try {
      // Register
      await registerUser({
        name,
        email,
        password,
        password_confirmation: passwordConfirm,
      });

      // Auto login
      const { data } = await loginUser({ email, password });
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <BaseLayout>
      <div className="flex items-center justify-center min-h-[70vh] mt-12">
        <div className="w-full max-w-md bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)] shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-8 text-[var(--primary)]">Create Account</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--muted-foreground)]">Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="w-full bg-[#020617] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--muted-foreground)]">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full bg-[#020617] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--muted-foreground)]">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full bg-[#020617] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--muted-foreground)]">Confirm Password</label>
              <input 
                type="password" 
                value={passwordConfirm} 
                onChange={e => setPasswordConfirm(e.target.value)} 
                className="w-full bg-[#020617] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-900/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-[var(--muted-foreground)]">
            Already have an account?{' '}
            <Link to="/login" className="text-[var(--primary)] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </BaseLayout>
  );
}
