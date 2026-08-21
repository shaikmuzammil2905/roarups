import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { Lock, Phone, UserCheck, GraduationCap, Users, LogIn, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [role, setRole] = useState<'tutor' | 'student' | 'parent'>('tutor');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!mobileNumber || !password) {
      setErrorMessage('Please enter both Mobile Number and Password.');
      return;
    }

    setIsLoading(true);

    try {
      if (!isSupabaseConfigured || !supabase) {
        // Allow seamless login demo when Supabase is unconfigured
        navigate(`/dashboard/${role}`);
        setIsLoading(false);
        return;
      }

      // Supabase Auth Email Sign-in with phone format
      const loginEmail = `${mobileNumber}@roarups.temp`;
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: password,
      });

      if (error) {
        throw new Error(error.message || 'Invalid Mobile Number or Password.');
      }

      if (data.session) {
        navigate(`/dashboard/${role}`);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <section className="py-16 bg-slate-50 min-h-[85vh] flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
            {/* Logo Header */}
            <div className="text-center space-y-2">
              <img
                src="/assets/roarups-horizontal-logo.png"
                alt="ROARUPS"
                className="h-10 mx-auto object-contain mb-2"
              />
              <h1 className="text-2xl font-extrabold text-roar-navy">Welcome Back</h1>
              <p className="text-xs text-slate-500">Log in to access your ROARUPS education dashboard</p>
            </div>

            {/* Account Role Selector Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setRole('tutor')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
                  role === 'tutor'
                    ? 'bg-white text-roar-blue shadow-sm'
                    : 'text-slate-600 hover:text-roar-navy'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Tutor</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('student')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
                  role === 'student'
                    ? 'bg-white text-roar-yellow shadow-sm'
                    : 'text-slate-600 hover:text-roar-navy'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('parent')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
                  role === 'parent'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-slate-600 hover:text-roar-navy'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Parent</span>
              </button>
            </div>

            {/* Error Notification */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter registered mobile number"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-blue text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-roar-blue text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400">Secure Auth</span>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset instructions: Contact ROARUPS support at roarupstuitions@gmail.com or 6309763394."); }} className="text-roar-blue font-bold hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-roar-blue hover:bg-roar-blue-hover text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Login as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-roar-blue hover:underline">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
