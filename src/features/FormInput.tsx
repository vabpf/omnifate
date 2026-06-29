import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { UserProfile } from '../types';
import { User as UserIcon, Calendar, Clock, MapPin, Sparkles, Trash2, Heart } from 'lucide-react';

interface FormInputProps {
  onSubmit: (profile: UserProfile, runAI: boolean) => void;
  isLoading: boolean;
  localLoading?: boolean;
  user?: User | null;
}

const PRESET_PROFILES: UserProfile[] = [
  { name: 'Khánh An', dob: '1995-11-05', time: '14:30', place: 'Hà Nội', gender: 'Nam' },
  { name: 'Thanh Nhã', dob: '1998-05-18', time: '08:45', place: 'Đà Nẵng', gender: 'Nữ' },
  { name: 'Minh Đức', dob: '1990-03-23', time: '21:15', place: 'TP. Hồ Chí Minh', gender: 'Nam' },
];

export default function FormInput({ onSubmit, isLoading, localLoading, user }: FormInputProps) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [time, setTime] = useState('12:00');
  const [place, setPlace] = useState('');
  const [gender, setGender] = useState<'Nam' | 'Nữ'>('Nam');
  const [savedProfiles, setSavedProfiles] = useState<UserProfile[]>([]);

  useEffect(() => {
    loadProfiles();
  }, [user]);

  const loadProfiles = async () => {
    if (user) {
      try {
        const q = query(collection(db, 'history'), where('userId', '==', user.uid));
        const snap = await getDocs(q);
        const items: UserProfile[] = [];
        snap.forEach(docSnap => {
          items.push(docSnap.data().profile as UserProfile);
        });
        if (items.length > 0) {
          const seen = new Set<string>();
          const unique = items.filter(p => {
            const key = p.name.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
          setSavedProfiles(unique);
          return;
        }
        setSavedProfiles([]);
        return;
      } catch (err) {
        console.warn('Could not load cloud profiles, falling back to localStorage:', err);
      }
    }
    const raw = localStorage.getItem('SAVED_OMNIFATE_PROFILES');
    if (raw) {
      try {
        setSavedProfiles(JSON.parse(raw));
      } catch {
        setSavedProfiles(PRESET_PROFILES);
      }
    } else {
      setSavedProfiles(PRESET_PROFILES);
      localStorage.setItem('SAVED_OMNIFATE_PROFILES', JSON.stringify(PRESET_PROFILES));
    }
  };

  const handleSaveProfile = async () => {
    if (!name || !dob || !place) return;
    const newProfile: UserProfile = { name, dob, time, place, gender };
    const exists = savedProfiles.findIndex(p => p.name.toLowerCase() === name.toLowerCase());
    let updated: UserProfile[] = [];
    if (exists >= 0) {
      updated = [...savedProfiles];
      updated[exists] = newProfile;
    } else {
      updated = [newProfile, ...savedProfiles];
    }
    setSavedProfiles(updated);

    if (user) {
      try {
        const q = query(collection(db, 'history'), where('userId', '==', user.uid));
        const snap = await getDocs(q);
        const deletePromises: Promise<void>[] = [];
        snap.forEach(docSnap => {
          const data = docSnap.data();
          if ((data.profile as UserProfile).name.toLowerCase() === name.toLowerCase()) {
            deletePromises.push(deleteDoc(doc(db, 'history', docSnap.id)));
          }
        });
        await Promise.all(deletePromises);
        await addDoc(collection(db, 'history'), {
          userId: user.uid,
          profile: newProfile,
          createdAt: new Date().toISOString(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, 'history');
      }
    } else {
      localStorage.setItem('SAVED_OMNIFATE_PROFILES', JSON.stringify(updated));
    }
  };

  const handleDeleteProfile = async (profileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedProfiles.filter(p => p.name !== profileName);
    setSavedProfiles(updated);

    if (user) {
      try {
        const q = query(collection(db, 'history'), where('userId', '==', user.uid));
        const snap = await getDocs(q);
        const del: Promise<void>[] = [];
        snap.forEach(docSnap => {
          const data = docSnap.data();
          if ((data.profile as UserProfile).name === profileName) {
            del.push(deleteDoc(doc(db, 'history', docSnap.id)));
          }
        });
        await Promise.all(del);
      } catch (err) {
        console.warn('Could not delete cloud profile:', err);
      }
    } else {
      localStorage.setItem('SAVED_OMNIFATE_PROFILES', JSON.stringify(updated));
    }
  };

  const handleSelectProfile = (p: UserProfile) => {
    setName(p.name);
    setDob(p.dob);
    setTime(p.time);
    setPlace(p.place);
    setGender(p.gender);
  };

  const handleSubmitWithAI = async () => {
    if (!name || !dob || !time || !place) return;
    await handleSaveProfile();
    onSubmit({ name, dob, time, place, gender }, true);
  };

  const handleSubmitLocalOnly = async () => {
    if (!name || !dob || !time || !place) return;
    await handleSaveProfile();
    onSubmit({ name, dob, time, place, gender }, false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="glass-card p-6 rounded-2xl flex flex-col h-full justify-between hover:translate-y-0">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold text-amber-400 flex items-center gap-2">
              <Heart className="w-5 h-5 text-amber-400 fill-amber-400/20" />Thân Chủ Đã Lưu
            </h3>
            <span className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-full text-white/60 font-mono">{savedProfiles.length} hồ sơ</span>
          </div>
          {user && <span className="text-[10px] text-emerald-400 mb-3 block font-mono">☁️ Đã đồng bộ đám mây</span>}
          <p className="text-white/40 text-xs mb-4">Chọn nhanh hồ sơ mẫu hoặc nhấp vào để khởi chạy tức khắc biểu đồ thần học.</p>
          <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
            {savedProfiles.map((p, idx) => (
              <div key={idx} id={`profile-card-${p.name.replace(/\s+/g, '-')}`} onClick={() => handleSelectProfile(p)}
                className={`group flex items-center justify-between p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                  name === p.name ? 'border-warm-amber bg-white/10 shadow-md shadow-warm-amber/10' : 'border-white/5 hover:border-white/15 bg-white/2 hover:bg-white/5'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{p.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${p.gender === 'Nam' ? 'bg-warm-amber/10 text-warm-amber border border-amber-900/40' : 'bg-pink-950/60 text-pink-300 border border-pink-900/40'}`}>{p.gender}</span>
                  </div>
                  <div className="text-[11px] text-white/40 mt-1 flex flex-wrap gap-x-2">
                    <span>📅 {p.dob.split('-').reverse().join('/')}</span>
                    <span>🕒 {p.time}</span>
                    <span>📍 {p.place}</span>
                  </div>
                </div>
                <button id={`btn-del-${p.name.replace(/\s+/g, '-')}`} type="button" onClick={(e) => handleDeleteProfile(p.name, e)}
                  className="p-1 rounded-lg text-white/30 hover:text-rose-400 hover:bg-white/5 transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            {savedProfiles.length === 0 && <div className="text-center py-8 text-xs text-white/30 border border-dashed border-white/5 rounded-xl">Chưa có hồ sơ lưu trữ.</div>}
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-white/5 text-xs text-white/40 italic">💡 Nhấp vào bất kỳ thẻ hồ sơ nào phía trên để điền nhanh dữ liệu vào biểu mẫu tính toán bên cạnh.</div>
      </div>

      <div className="glass-container rounded-2xl p-6 lg:col-span-2 space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-warm-amber" />Nhập Dữ Liệu Khởi Tạo Tinh Vân
          </h3>
          <p className="text-xs text-white/40 mt-1">Chỉ cần cung cấp dữ liệu cơ bản một lần, thuật tử vi và bản đồ sao sẽ tự động giao quy chiếu đồng điệu.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/60 flex items-center gap-1.5"><UserIcon className="w-3.5 h-3.5 text-warm-amber" /> Họ và tên (phục vụ Thần số học) <span className="text-rose-500">*</span></label>
            <input id="input-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ví dụ: Nguyễn Văn Hoàng"
              className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/60">Giới tính (phục vụ Tử vi & Tứ Trụ) <span className="text-rose-500">*</span></label>
            <div className="grid grid-cols-2 gap-2">
              <button id="btn-gender-nam" type="button" onClick={() => setGender('Nam')}
                className={`py-2 px-3 text-sm rounded-xl font-medium border transition-all cursor-pointer ${gender === 'Nam' ? 'border-warm-amber bg-warm-amber/30 text-white shadow-md shadow-warm-amber/10' : 'border-white/5 bg-white/2 text-white/40 hover:border-white/15'}`}>♂ Nam</button>
              <button id="btn-gender-nu" type="button" onClick={() => setGender('Nữ')}
                className={`py-2 px-3 text-sm rounded-xl font-medium border transition-all cursor-pointer ${gender === 'Nữ' ? 'border-pink-400 bg-pink-600/40 text-pink-200 shadow-md shadow-pink-500/10' : 'border-white/5 bg-white/2 text-white/40 hover:border-white/15'}`}>♀ Nữ</button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/60 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-warm-amber" /> Ngày tháng năm sinh (Dương lịch) <span className="text-rose-500">*</span></label>
            <input id="input-dob" type="date" required value={dob} onChange={(e) => setDob(e.target.value)}
              className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-white transition-all outline-none" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/60 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-warm-amber" /> Giờ sinh chính xác (24 giờ) <span className="text-rose-500">*</span></label>
            <input id="input-time" type="time" required value={time} onChange={(e) => setTime(e.target.value)}
              className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-white transition-all outline-none" />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-medium text-white/60 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-warm-amber" /> Nơi sinh (Thành phố / Tỉnh thành) <span className="text-rose-500">*</span></label>
            <input id="input-place" type="text" required value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Nhập tỉnh thành sinh, ví dụ: Quảng Ninh"
              className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button id="btn-local-calc" type="button" onClick={handleSubmitLocalOnly}
            disabled={isLoading || localLoading || !name || !dob || !time || !place}
            className="flex-1 font-display glass-btn text-white/80 hover:text-white rounded-xl py-3 px-4 font-bold text-sm tracking-wide transition-all shadow-md active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">📊 Lập Bản Đồ Bản Mệnh</button>
          <button id="btn-ai-calc" type="button" onClick={handleSubmitWithAI}
            disabled={isLoading || localLoading || !name || !dob || !time || !place}
            className="flex-[1.2] font-display glass-btn-active text-white rounded-xl py-3 px-4 font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">🔮 Luận Giải Bản Mệnh (Tích Hợp AI)</button>
        </div>
      </div>
    </div>
  );
}
