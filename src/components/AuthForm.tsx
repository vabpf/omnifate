import { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType, getFriendlyAuthErrorMessage } from '../lib/firebase';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  Loader2 
} from 'lucide-react';

interface AuthFormProps {
  defaultIsRegister?: boolean;
  onSuccess?: () => void;
}

export default function AuthForm({ defaultIsRegister = false, onSuccess }: AuthFormProps) {
  const [isRegister, setIsRegister] = useState(defaultIsRegister);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Status states
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      if (isRegister) {
        if (!name.trim()) throw new Error('Vui lòng nhập họ và tên của bạn.');
        if (password.length < 6) {
          throw { code: 'auth/weak-password', message: 'Mật khẩu quá ngắn.' };
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        if (userCredential.user) {
          // Update display name
          await updateProfile(userCredential.user, { displayName: name.trim() });
          
          // Save user record to /users/{userId}
          try {
            await setDoc(doc(db, 'users', userCredential.user.uid), {
              uid: userCredential.user.uid,
              name: name.trim(),
              email: email.trim(),
              createdAt: new Date().toISOString()
            });
          } catch (err) {
            handleFirestoreError(err, OperationType.CREATE, `users/${userCredential.user.uid}`);
          }
        }
        
        setAuthSuccess('Tạo tài khoản thành công! Đã tự động đăng nhập.');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setAuthSuccess('Đăng nhập thành công!');
      }

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
          // Clear fields
          setEmail('');
          setPassword('');
          setName('');
          setAuthSuccess(null);
        }, 1500);
      }

    } catch (err: any) {
      console.error(err);
      const msg = getFriendlyAuthErrorMessage(err);
      setAuthError(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Tab Switcher */}
      <div className="grid grid-cols-2 bg-white/2 p-1 rounded-xl border border-white/5">
        <button
          type="button"
          onClick={() => {
            setIsRegister(false);
            setAuthError(null);
            setAuthSuccess(null);
          }}
          className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            !isRegister 
              ? 'bg-purple-600/20 border border-purple-500/30 text-white shadow-md' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          ĐĂNG NHẬP
        </button>
        <button
          type="button"
          onClick={() => {
            setIsRegister(true);
            setAuthError(null);
            setAuthSuccess(null);
          }}
          className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            isRegister 
              ? 'bg-purple-600/20 border border-purple-500/30 text-white shadow-md' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          ĐĂNG KÝ
        </button>
      </div>

      <form onSubmit={handleAuthSubmit} className="space-y-4">
        {isRegister && (
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">Họ và tên của bạn</label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Minh Quân"
                className="w-full bg-white/2 border border-white/10 rounded-xl py-2.5 px-10 text-xs text-white focus:outline-none focus:border-purple-500/60 transition-all font-display"
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">Địa chỉ Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ten_cua_ban@gmail.com"
              className="w-full bg-white/2 border border-white/10 rounded-xl py-2.5 px-10 text-xs text-white focus:outline-none focus:border-purple-500/60 transition-all font-mono"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">Mật khẩu bảo mật</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/2 border border-white/10 rounded-xl py-2.5 px-10 text-xs text-white focus:outline-none focus:border-purple-500/60 transition-all font-mono"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {authError && (
          <div className="p-3 bg-rose-950/30 border border-rose-500/20 text-rose-300 text-xs rounded-xl text-center leading-relaxed font-mono">
            ⚠️ {authError}
          </div>
        )}

        {authSuccess && (
          <div className="p-3 bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 text-xs rounded-xl text-center leading-relaxed">
            ✨ {authSuccess}
          </div>
        )}

        <button
          type="submit"
          disabled={authLoading}
          className="w-full py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white font-bold font-display text-xs rounded-xl tracking-wider shadow-lg shadow-purple-900/40 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
        >
          {authLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>ĐANG XỬ LÝ...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{isRegister ? 'ĐĂNG KÝ TÀI KHOẢN' : 'ĐĂNG NHẬP NGAY'}</span>
            </>
          )}
        </button>
      </form>

      {/* Switcher Link for additional ease */}
      <div className="text-center pt-2 border-t border-white/5 text-xs">
        <span className="text-slate-400">
          {isRegister ? 'Đã có tài khoản? ' : 'Chưa có tài khoản? '}
        </span>
        <button
          type="button"
          onClick={() => {
            setIsRegister(!isRegister);
            setAuthError(null);
            setAuthSuccess(null);
          }}
          className="text-indigo-400 hover:text-indigo-300 font-bold underline cursor-pointer"
        >
          {isRegister ? 'Đăng nhập ngay' : 'Đăng ký tài khoản mới'}
        </button>
      </div>
    </div>
  );
}
