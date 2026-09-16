import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Key, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function AdminLoginGate({ onAuthenticated }) {
  const { adminLogin } = useAdmin();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [authMode, setAuthMode] = useState('password'); // 'password' or 'pin'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await adminLogin({
      username,
      password: authMode === 'password' ? password : '',
      pin: authMode === 'pin' ? pin : '',
    });

    setLoading(false);
    if (result.success) {
      if (onAuthenticated) onAuthenticated();
    } else {
      setError(result.error || 'Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E7DCD3] shadow-2xl space-y-6 relative overflow-hidden">
        {/* Subtle top gold stripe */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#B8860B]" />

        {/* Brand Lock Icon Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-[#FAF4ED] border-2 border-[#D4AF37]/50 flex items-center justify-center mx-auto text-[#2D1B16] shadow-sm">
            <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
            Management Access Only
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#2D1B16]">
            Owner & Admin Portal
          </h2>
          <p className="text-xs text-[#7A6A5D]">
            This section is strictly restricted to The Bread Basket bakery owners and staff. Customers cannot access order records or reviews management.
          </p>
        </div>

        {/* Tab switch: Password vs PIN */}
        <div className="flex bg-[#FAF6F0] p-1 rounded-xl border border-[#E7DCD3] text-xs font-bold">
          <button
            type="button"
            onClick={() => setAuthMode('password')}
            className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
              authMode === 'password' ? 'bg-[#2D1B16] text-white shadow-xs' : 'text-[#6D5D53]'
            }`}
          >
            Password Login
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('pin')}
            className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
              authMode === 'pin' ? 'bg-[#2D1B16] text-white shadow-xs' : 'text-[#6D5D53]'
            }`}
          >
            Quick PIN (1030)
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'password' ? (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-[#2D1B16]">Owner Username</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-[#2D1B16]">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8D7B68] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] focus:outline-none focus:border-[#2D1B16]"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#2D1B16]">Quick Owner PIN</label>
              <div className="relative">
                <Key className="w-4 h-4 text-[#8D7B68] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter 4-digit PIN (e.g. 1030)"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-[#E7DCD3] bg-[#FAF6F0] text-[#2D1B16] text-center tracking-widest text-base font-bold focus:outline-none focus:border-[#2D1B16]"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#2D1B16] hover:bg-[#4A2E18] text-[#FAF6F0] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 border border-[#D4AF37]/30 cursor-pointer disabled:opacity-50"
          >
            <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{loading ? 'Authenticating...' : 'Sign In to Admin Dashboard'}</span>
          </button>
        </form>

        {/* Credentials reminder badge for owner */}
        <div className="p-3 bg-[#FAF4ED] rounded-xl border border-[#DECBC0] text-[11px] text-[#5C4A3E] space-y-1">
          <p className="font-bold flex items-center gap-1 text-[#2D1B16]">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Default Owner Credentials:
          </p>
          <p>Username: <strong>admin</strong> | Password: <strong>breadbasket123</strong></p>
          <p>Quick Access PIN: <strong>1030</strong></p>
        </div>

        <div className="text-center pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8D7B68] hover:text-[#2D1B16]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Bakery Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
