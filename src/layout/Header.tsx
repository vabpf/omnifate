import { UserProfile } from '../types';
import { AuthManager } from '../features/auth';
import { Printer } from 'lucide-react';

interface HeaderProps {
  profile: UserProfile | null;
  onSelectSavedProfile: (p: UserProfile) => void;
  onPrint: () => void;
}

export default function Header({ profile, onSelectSavedProfile, onPrint }: HeaderProps) {
  return (
    <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-40 navbar-container select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="font-display text-lg font-bold text-slate-100">Ω</span>
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-slate-100 tracking-wide">OmniFate</h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Cổng Huyền Học Toàn Diện</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {profile && (
            <span className="hidden lg:inline-flex items-center gap-1.5 text-xs glass-pill rounded-full px-3 py-1 text-slate-350">
              👤 Đang tra cứu: <strong className="text-slate-100">{profile.name}</strong>
            </span>
          )}

          <AuthManager currentProfile={profile} onSelectSavedProfile={onSelectSavedProfile} />

          <button
            id="btn-print-dossier"
            onClick={onPrint}
            disabled={!profile}
            className="px-3 py-1.5 text-xs glass-btn rounded-lg text-slate-300 font-medium flex items-center gap-1.5 transition disabled:opacity-40"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">In Báo Cáo (PDF)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
