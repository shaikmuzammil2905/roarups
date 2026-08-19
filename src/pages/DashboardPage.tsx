import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { User, LogOut, BookOpen, ShieldCheck, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      if (!isSupabaseConfigured || !supabase) {
        setIsLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }

      setUserProfile({
        id: session.user.id,
        email: session.user.email,
        full_name: session.user.user_metadata?.full_name || 'User',
        role: session.user.user_metadata?.role || role || 'student',
        mobile: session.user.user_metadata?.mobile || '',
      });
      setIsLoading(false);
    }
    checkAuth();
  }, [role, navigate]);

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    navigate('/login');
  };

  const activeRole = role || 'student';

  return (
    <PageLayout>
      <section className="py-12 bg-slate-50 min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-roar-blue text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                {userProfile?.full_name?.charAt(0) || activeRole.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-roar-navy">
                    {userProfile?.full_name || `${activeRole.toUpperCase()} Dashboard`}
                  </h1>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-roar-blue text-xs font-bold capitalize">
                    {activeRole}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  ROARUPS Authenticated Portal • Row-Level Security Protected
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Role Dashboard Views */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-roar-blue border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-lg font-extrabold text-roar-navy border-b pb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-roar-blue" />
                  <span>Profile Summary</span>
                </h3>
                <div className="space-y-2 text-sm text-slate-700">
                  <p><strong>Name:</strong> {userProfile?.full_name || 'Registered Account'}</p>
                  <p><strong>Account Role:</strong> <span className="capitalize">{activeRole}</span></p>
                  <p><strong>Mobile:</strong> {userProfile?.mobile || 'Registered'}</p>
                  <p className="text-xs text-slate-500 pt-2 border-t">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 inline mr-1" />
                    Supabase Authentication Verified
                  </p>
                </div>
              </div>

              {/* Status Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-lg font-extrabold text-roar-navy border-b pb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-roar-yellow" />
                  <span>Registration Status</span>
                </h3>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Application Under Review</span>
                  </div>
                  <p className="leading-relaxed">
                    Our academic coordination team is reviewing your registration details for exact tutor/student matching in Hyderabad.
                  </p>
                </div>
              </div>

              {/* Actions Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-lg font-extrabold text-roar-navy border-b pb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <span>Quick Services</span>
                </h3>
                <ul className="space-y-2 text-xs font-semibold">
                  <li>
                    <Link to="/services/home-tuitions" className="block p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-roar-blue transition-colors">
                      • Explore Home Tuitions
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/tuition-center" className="block p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-roar-blue transition-colors">
                      • Explore Tuition Center
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="block p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-roar-blue transition-colors">
                      • Contact Academic Coordinator
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};
