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
        <h4 className="text-sm font-bold text-white font-display text-center">{resetSent ? 'Email Đã Được Gửi' : 'Đặt Lại Mật Khẩu'}</h4>
        {resetSent ? (
          <div className="space-y-4">
            <p className="text-xs text-white/50 text-center">Vui lòng kiểm tra hộp thư đến (Inbox) hoặc mục Spam. Làm theo hướng dẫn trong email để đặt lại mật khẩu.</p>
            <button type="button" onClick={() => { setShowReset(false); setResetSent(false); }}
              className="w-full py-2.5 bg-gradient-to-r from-warm-amber to-warm-teal hover:opacity-90 rounded-xl text-xs font-bold font-display text-white transition-all cursor-pointer active:scale-[0.98]"
            >Quay Lại Đăng Nhập</button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-white/50">Nhập email bạn đã đăng ký tài khoản. Chúng tôi sẽ gửi đường dẫn đặt lại mật khẩu.</p>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
              <Mail className="w-4 h-4 text-white/40 shrink-0" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email của bạn"
                className="w-full bg-transparent text-xs text-white outline-none placeholder-white/30" />
            </div>
            <button type="button" onClick={handleResetPassword} disabled={loading}
              className="w-full py-2.5 bg-warm-amber hover:bg-warm-amber/80 disabled:opacity-50 rounded-xl text-xs font-bold font-display text-white transition-all cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
            >{loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <KeyRound className="w-3.5 h-3.5" />}Gửi Email Đặt Lại</button>
            <button type="button" onClick={() => setShowReset(false)}
              className="w-full text-center text-[11px] text-white/40 hover:text-white/70 transition-colors cursor-pointer"
            >← Quay lại đăng nhập</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Tab toggle */}
      <div className="flex gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
        <button type="button" onClick={() => setIsRegister(false)}
          className={`flex-1 py-2 text-xs font-bold font-display rounded-lg transition-all cursor-pointer ${!isRegister ? 'bg-gradient-to-r from-warm-amber to-warm-teal text-white shadow-md' : 'text-white/40 hover:text-white/70'}`}
        ><LogIn className="w-3.5 h-3.5 inline mr-1" /> ĐĂNG NHẬP</button>
        <button type="button" onClick={() => setIsRegister(true)}
          className={`flex-1 py-2 text-xs font-bold font-display rounded-lg transition-all cursor-pointer ${isRegister ? 'bg-gradient-to-r from-warm-teal to-warm-amber text-white shadow-md' : 'text-white/40 hover:text-white/70'}`}
        ><UserPlus className="w-3.5 h-3.5 inline mr-1" /> ĐĂNG KÝ</button>
      </div>

      {/* Display name (register only) */}
      {isRegister && (
        <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-white/40 shrink-0" />
          <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Tên hiển thị (ví dụ: Nguyễn Văn An)"
            className="w-full bg-transparent text-xs text-white outline-none placeholder-white/30" />
        </div>
      )}

      {/* Email */}
      <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
        <Mail className="w-4 h-4 text-white/40 shrink-0" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email của bạn"
          className="w-full bg-transparent text-xs text-white outline-none placeholder-white/30" />
      </div>

      {/* Password */}
      <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
        <Lock className="w-4 h-4 text-white/40 shrink-0" />
        <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Mật khẩu"
          className="w-full bg-transparent text-xs text-white outline-none placeholder-white/30" />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/40 hover:text-white/70 cursor-pointer">
          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Forgot password */}
      {!isRegister && (
        <button type="button" onClick={() => setShowReset(true)}
          className="text-[11px] text-warm-amber/70 hover:text-warm-amber transition-colors cursor-pointer w-full text-right"
        >Quên mật khẩu?</button>
      )}

      {/* Error */}
      {error && <p className="text-[11px] text-red-400 bg-red-950/20 border border-red-800/30 p-2.5 rounded-lg">{error}</p>}

      {/* Submit */}
      <button type="submit" disabled={loading || !email || !password}
        className="w-full py-3 bg-gradient-to-r from-warm-amber to-warm-teal hover:opacity-90 disabled:opacity-40 rounded-xl text-xs font-bold font-display text-white tracking-wide shadow-lg transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
      >{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : isRegister ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
        {isRegister ? 'TẠO TÀI KHOẢN' : 'ĐĂNG NHẬP'}
      </button>
    </form>
  );
}
