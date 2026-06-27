import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, getFriendlyAuthErrorMessage } from '../../lib/firebase';
import { Loader2, Mail, Lock, LogIn, UserPlus, Eye, EyeOff, KeyRound } from 'lucide-react';

interface AuthFormProps {
  onSuccess?: () => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        if (displayName.trim()) {
          await updateProfile(userCred.user, { displayName: displayName.trim() });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onSuccess?.();
    } catch (err: any) {
      setError(getFriendlyAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Vui lòng nhập email trước.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err: any) {
      setError(getFriendlyAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (showReset) {
    return (
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-200 font-display text-center">{resetSent ? '✅ Email Đã Được Gửi' : '🔐 Đặt Lại Mật Khẩu'}</h4>
        {resetSent ? (
          <div className="space-y-4">
            <p className="text-xs text-slate-400 text-center">Vui lòng kiểm tra hộp thư đến (Inbox) hoặc mục Spam. Làm theo hướng dẫn trong email để đặt lại mật khẩu.</p>
            <button type="button" onClick={() => { setShowReset(false); setResetSent(false); }}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold font-display text-white transition-all cursor-pointer active:scale-[0.98]"
            >Quay Lại Đăng Nhập</button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-slate-400">Nhập email bạn đã đăng ký tài khoản. Chúng tôi sẽ gửi đường dẫn đặt lại mật khẩu.</p>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email của bạn"
                className="w-full bg-transparent text-xs text-slate-100 outline-none placeholder-slate-400" />
            </div>
            <button type="button" onClick={handleResetPassword} disabled={loading}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 rounded-xl text-xs font-bold font-display text-white transition-all cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
            >{loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <KeyRound className="w-3.5 h-3.5" />}Gửi Email Đặt Lại</button>
            <button type="button" onClick={() => setShowReset(false)}
              className="w-full text-center text-[11px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >← Quay lại đăng nhập</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
        <button type="button" onClick={() => setIsRegister(false)}
          className={`flex-1 py-2 text-xs font-bold font-display rounded-lg transition-all cursor-pointer ${!isRegister ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' : 'text-slate-400 hover:text-slate-200'}`}
        ><LogIn className="w-3.5 h-3.5 inline mr-1" /> ĐĂNG NHẬP</button>
        <button type="button" onClick={() => setIsRegister(true)}
          className={`flex-1 py-2 text-xs font-bold font-display rounded-lg transition-all cursor-pointer ${isRegister ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30' : 'text-slate-400 hover:text-slate-200'}`}
        ><UserPlus className="w-3.5 h-3.5 inline mr-1" /> ĐĂNG KÝ</button>
      </div>

      {isRegister && (
        <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-slate-400 shrink-0" />
          <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Tên hiển thị (ví dụ: Nguyễn Văn An)"
            className="w-full bg-transparent text-xs text-slate-100 outline-none placeholder-slate-400" />
        </div>
      )}

      <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
        <Mail className="w-4 h-4 text-slate-400 shrink-0" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email của bạn"
          className="w-full bg-transparent text-xs text-slate-100 outline-none placeholder-slate-400" />
      </div>

      <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
        <Lock className="w-4 h-4 text-slate-400 shrink-0" />
        <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Mật khẩu"
          className="w-full bg-transparent text-xs text-slate-100 outline-none placeholder-slate-400" />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-200 cursor-pointer">
          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
      </div>

      {!isRegister && (
        <button type="button" onClick={() => setShowReset(true)}
          className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer w-full text-right"
        >Quên mật khẩu?</button>
      )}

      {error && <p className="text-[11px] text-rose-400 bg-rose-950/20 border border-rose-800/30 p-2.5 rounded-lg">{error}</p>}

      <button type="submit" disabled={loading || !email || !password}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 rounded-xl text-xs font-bold font-display text-white tracking-wide shadow-lg shadow-indigo-900/40 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
      >{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : isRegister ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
        {isRegister ? 'TẠO TÀI KHOẢN' : 'ĐĂNG NHẬP'}
      </button>
    </form>
  );
}
