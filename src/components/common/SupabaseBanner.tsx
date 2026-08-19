import React from 'react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { AlertTriangle, Database } from 'lucide-react';

export const SupabaseBanner: React.FC = () => {
  if (isSupabaseConfigured) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-xs sm:text-sm py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Supabase Setup Required:</strong> Live database features require <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-amber-900">VITE_SUPABASE_URL</code> and <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-amber-900">VITE_SUPABASE_ANON_KEY</code>.
          </span>
        </div>
        <a 
          href="file:///c:/Users/muzam/Desktop/Roarups/supabase/schema.sql"
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-1 font-semibold text-amber-800 underline hover:text-amber-950"
        >
          <Database className="w-3.5 h-3.5" /> View SQL Schema
        </a>
      </div>
    </div>
  );
};
