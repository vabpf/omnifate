import { useState, useEffect } from 'react';
import {
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { UserProfile } from '../../types';
import {
  LogIn,
  LogOut,
  ShieldCheck,
  History,
  Trash2,
  Bookmark,
  Sparkles,
  X,
  Loader2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AuthForm from './AuthForm';

interface AuthManagerProps {
  currentProfile: UserProfile | null;
  onSelectSavedProfile: (profile: UserProfile) => void;
}

export default function AuthManager({ currentProfile, onSelectSavedProfile }: AuthManagerProps) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [savedLookups, setSavedLookups] = useState<Array<{ id: string; profile: UserProfile; createdAt: string }>>([]);
  const [lookupsLoading, setLookupsLoading] = useState(false);
  const [isSavingCurrent, setIsSavingCurrent] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchSavedLookups(currentUser.uid);
      } else {
        setSavedLookups([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchSavedLookups = async (uid: string) => {
    setLookupsLoading(true);
    try {
      const q = query(collection(db, 'history'), where('userId', '==', uid));
      const querySnapshot = await getDocs(q);

      const items: any[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        items.push({ id: docSnap.id, profile: data.profile, createdAt: data.createdAt || '' });
      });

      items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setSavedLookups(items);

      if (items.length > 0 && !currentProfile) {
        onSelectSavedProfile(items[0].profile);
      }
    } catch (err) {
      console.error('Error fetching lookups:', err);
    } finally {
      setLookupsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleSaveCurrentProfile = async () => {
    if (!user || !currentProfile) return;
    setIsSavingCurrent(true);

    const exists = savedLookups.some(
      item =>
        item.profile.name === currentProfile.name &&
        item.profile.dob === currentProfile.dob &&
        item.profile.time === currentProfile.time
    );

    if (exists) {
      setIsSavingCurrent(false);
      alert('Hồ sơ này đã được lưu trước đó.');
      return;
    }

    try {
      let docRef;
      try {
        docRef = await addDoc(collection(db, 'history'), {
          userId: user.uid,
          profile: currentProfile,
          createdAt: new Date().toISOString(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, 'history');
      }

      setSavedLookups(prev => [
        { id: docRef.id, profile: currentProfile, createdAt: new Date().toISOString() },
        ...prev,
      ]);
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setIsSavingCurrent(false);
    }
  };

  const handleDeleteProfile = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      try {
        await deleteDoc(doc(db, 'history', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `history/${id}`);
      }
      setSavedLookups(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting profile:', err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
      {user ? (
        <div className="flex items-center gap-3 bg-warm-amber/10 border border-warm-amber/20 px-3.5 py-1.5 rounded-xl text-xs">
          <div className="flex items-center gap-1.5 text-warm-amber">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-medium hidden sm:inline">Đã đồng bộ:</span>
            <strong className="text-white max-w-[110px] truncate">{user.email}</strong>
          </div>

          {currentProfile && (
            <button
              onClick={handleSaveCurrentProfile}
              disabled={isSavingCurrent}
              className="inline-flex items-center gap-1 bg-warm-amber hover:bg-warm-teal disabled:opacity-50 text-white font-medium py-1 px-2.5 rounded-lg cursor-pointer transition-all active:scale-95 text-[11px]"
            >
              {isSavingCurrent ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Bookmark className="w-3 h-3 fill-white/10" />
              )}
              <span>Lưu hồ sơ</span>
            </button>
          )}

          <button
            onClick={handleSignOut}
            title="Đăng xuất"
            className="text-white/40 hover:text-rose-400 transition-colors cursor-pointer p-0.5 ml-1"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/40 max-w-[180px] leading-snug hidden lg:inline-block">
            🔮 Đăng nhập để lưu trữ 29 mục Thần Số Học & lịch sử tra cứu của bạn.
          </span>
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-3 py-1.5 bg-gradient-to-r from-warm-amber to-warm-teal hover:from-warm-teal hover:to-warm-amber text-white text-xs font-bold font-display rounded-lg tracking-wide shadow-md shadow-warm-amber/30 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>ĐĂNG NHẬP / ĐĂNG KÝ</span>
          </button>
        </div>
      )}

      {user && savedLookups.length > 0 && (
        <div className="relative group">
          <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-white/60 flex items-center gap-1.5 transition cursor-pointer">
            <History className="w-3.5 h-3.5 text-warm-amber" />
            <span>Hồ Sơ Đã Lưu ({savedLookups.length})</span>
          </button>

          <div className="absolute right-0 top-full mt-2 w-72 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl p-2.5 hidden group-focus-within:block hover:block z-50 animate-fade-in max-h-96 overflow-y-auto">
            <h6 className="text-[11px] font-mono tracking-wider text-white/40 uppercase border-b border-white/5 pb-1.5 mb-2 px-1 flex items-center justify-between">
              <span>Danh sách hồ sơ</span>
              <span className="text-[10px] text-warm-amber">Đồng bộ Cloud</span>
            </h6>
            <div className="space-y-1">
              {savedLookups.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectSavedProfile(item.profile)}
                  className="w-full flex items-center justify-between p-2 rounded-lg bg-white/2 hover:bg-white/5 cursor-pointer transition-all text-left text-xs group/item"
                >
                  <div className="truncate pr-2">
                    <div className="font-bold text-white/80 truncate">{item.profile.name}</div>
                    <div className="text-[10px] text-white/40 font-mono">{item.profile.dob} • {item.profile.time} • {item.profile.gender}</div>
                  </div>
                  <button
                    onClick={(e) => handleDeleteProfile(item.id, e)}
                    className="p-1 rounded bg-rose-950/20 border border-rose-900/30 text-rose-400 hover:bg-rose-900/40 opacity-0 group-hover/item:opacity-100 transition-opacity cursor-pointer"
                    title="Xóa hồ sơ"
                  ><Trash2 className="w-3 h-3" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0a0a0a]/95 border border-warm-amber/20 max-w-md w-full rounded-2xl shadow-2xl overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-gradient-to-bl from-warm-amber/10 to-transparent pointer-events-none rounded-full blur-3xl" />
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-warm-amber flex items-center justify-center"><Sparkles className="w-4 h-4 text-amber-300" /></div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">Đồng Bộ Thiên Mệnh</h4>
                      <p className="text-[10px] text-white/40 font-mono uppercase">Hệ thống tài khoản OmniFate</p>
                    </div>
                  </div>
                  <button onClick={() => setShowAuthModal(false)} className="p-1 text-white/40 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer transition-all"><X className="w-4 h-4" /></button>
                </div>
                <AuthForm onSuccess={() => setShowAuthModal(false)} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
