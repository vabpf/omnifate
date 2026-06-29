import { useState, memo } from 'react';
import { TuViPalace, UserProfile } from '../../types';
import { Eye, Award, ShieldAlert, Sparkles, Loader2 } from 'lucide-react';
import { MarkdownRenderer } from '../../ui';
import { fetchAiTuVi } from '../../api/ai-tuvi';
import { getLunarYear } from '../../constants';

interface TuViViewerProps {
  palaces: TuViPalace[];
  userName: string;
  gender: string;
  dob: string;
  time: string;
  bornPlace: string;
  profile: UserProfile;
  aiInterpretation?: {
    personality: string;
    career: string;
    wealth: string;
    love: string;
  };
}

const COORDINATE_MAP: { [key: string]: number } = {
  '0,0': 5, '0,1': 6, '0,2': 7, '0,3': 8,
  '1,3': 9, '2,3': 10, '3,3': 11,
  '3,2': 0, '3,1': 1, '3,0': 2,
  '2,0': 3, '1,0': 4,
};

export default memo(function TuViViewer({ palaces, userName, gender, dob, time, bornPlace, profile, aiInterpretation }: TuViViewerProps) {
  const [activeCell, setActiveCell] = useState<TuViPalace | null>(null);
  const [localAiContent, setLocalAiContent] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleFetchAi = async () => {
    setIsLoadingAi(true);
    setAiError(null);
    try {
      const content = await fetchAiTuVi(profile, palaces);
      setLocalAiContent(content);
    } catch (e: any) {
      setAiError(e.message || 'Không thể liên lạc với AI.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  const defaultPalace = palaces.find(p => p.name.includes('Mệnh')) || palaces[0];
  const currentPalace = activeCell || defaultPalace;

  const elementColors: { [key: string]: string } = {
    Kim: 'text-amber-300 border-amber-800/60 bg-amber-950/5',
    Mộc: 'text-emerald-300 border-emerald-800/60 bg-emerald-950/5',
    Thủy: 'text-cyan-300 border-cyan-800/60 bg-cyan-950/5',
    Hỏa: 'text-rose-300 border-rose-800/60 bg-rose-950/5',
    Thổ: 'text-orange-400 border-orange-800/60 bg-orange-950/5',
  };

  const formattedGregorian = dob.split('-').reverse().join('/');

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-7 glass-card p-3 rounded-2xl relative overflow-hidden hover:translate-y-0">
          <div className="absolute inset-0 bg-radial-gradient-to-br from-warm-amber/10 to-transparent pointer-events-none" />
          <div className="grid grid-cols-4 grid-rows-4 gap-1.5 aspect-square w-full">
            {Array.from({ length: 4 }).map((_, r) => (
              <div key={r} className="contents">
                {Array.from({ length: 4 }).map((_, c) => {
                  const coordKey = `${r},${c}`;
                  const isCenter = r >= 1 && r <= 2 && c >= 1 && c <= 2;

                  if (isCenter) {
                    if (r === 1 && c === 1) {
                      return (
                        <div key={coordKey} className="col-span-2 row-span-2 bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col justify-between text-center select-none shadow-inner">
                          <div className="space-y-1">
                            <span className="text-[9px] text-amber-400 font-mono tracking-widest block font-bold">LÁ SỐ TỬ VI</span>
                            <h4 className="font-display text-sm font-bold text-white/80 truncate">{userName}</h4>
                            <div className="flex justify-center gap-1.5 mt-1.5">
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold font-mono ${gender === 'Nam' ? 'bg-warm-amber/10 text-warm-amber border border-amber-900/40' : 'bg-pink-950/60 text-pink-300 border border-pink-900/40'}`}>{gender}</span>
                              <span className="text-[9px] glass-pill text-white/60 px-1.5 py-0.5 rounded font-mono">{new Date().getFullYear()} {getLunarYear(new Date().getFullYear())}</span>
                            </div>
                          </div>
                          <div className="text-[9px] text-white/40 space-y-0.5 font-mono">
                            <div>📅 {formattedGregorian}</div>
                            <div>🕒 Đứng giờ: {time}</div>
                            <div className="truncate">📍 {bornPlace}</div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }

                  const branchIdx = COORDINATE_MAP[coordKey];
                  const palace = palaces.find((p) => p.index === branchIdx);
                  if (!palace) return <div key={coordKey} className="bg-black/20 border border-white/5 rounded-xl" />;

                  const isCellSelected = currentPalace.index === palace.index;

                  return (
                    <button key={coordKey} id={`tuvi-palace-cell-${palace.index}`} type="button" onClick={() => setActiveCell(palace)}
                      className={`relative flex flex-col justify-between p-2 rounded-xl border text-left transition-all cursor-pointer select-none group ${
                        isCellSelected
                          ? 'border-warm-amber bg-warm-amber/10 shadow-md shadow-warm-amber/15 text-white'
                          : 'border-white/5 hover:border-white/15 bg-white/2 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-start justify-between w-full border-b border-white/5 pb-1">
                        <span className="text-[9px] font-bold text-white font-display line-clamp-1">{palace.name.split(' ')[0]}</span>
                        <span className="text-[8px] font-mono text-white/40">{palace.branch}</span>
                      </div>
                      <div className="flex-1 py-1 space-y-0.5">
                        {palace.majorStars.map((ms, msIdx) => (
                          <div key={msIdx} className="text-[9px] font-bold text-amber-400/90 flex items-center gap-0.5">
                            <span className="text-[8px]">★</span>
                            <span className="line-clamp-1">{ms}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between w-full text-[8px] border-t border-white/5 pt-0.5 mt-0.5 text-white/40 font-mono">
                        <span className="truncate max-w-[40px]">{palace.minorStars[0]}</span>
                        <span className={`${palace.element === 'Kim' ? 'text-amber-300' : palace.element === 'Mộc' ? 'text-emerald-300' : palace.element === 'Thủy' ? 'text-cyan-300' : palace.element === 'Hỏa' ? 'text-rose-300' : 'text-orange-400'}`}>{palace.element}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-5 flex flex-col justify-between space-y-6">
          <div className="glass-card rounded-2xl p-6 space-y-4 hover:translate-y-0">
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] text-warm-amber font-mono font-bold tracking-widest block uppercase">CHI TIẾT CUNG PHÂN</span>
                <h4 className="font-display text-lg font-bold text-white flex items-center gap-2 mt-1">Cung {currentPalace.name} ({currentPalace.branch})</h4>
              </div>
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-mono font-bold border ${elementColors[currentPalace.element]}`}>Mệnh: {currentPalace.element}</span>
            </div>
            <div className="space-y-4.5">
              <div>
                <span className="text-[10px] text-white/30 font-mono block uppercase mb-1.5">Mạng lưới Sao chiếu</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentPalace.majorStars.map((star, sIdx) => (
                    <span key={sIdx} className="text-[10px] bg-amber-500/10 border border-amber-800/30 text-amber-300 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"><Award className="w-3 h-3" /> {star} (Chính tinh)</span>
                  ))}
                  {currentPalace.minorStars.map((star, sIdx) => (
                    <span key={sIdx} className="text-[10px] bg-white/5 border border-white/10 text-white/60 px-2 py-0.5 rounded-md">{star}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-white/30 font-mono block uppercase mb-1.5">Luận giải bối cảnh</span>
                <p className="text-xs text-white/60 leading-relaxed">
                  Cung {currentPalace.name} tọa lạc tại {currentPalace.branch} cấu thành bởi nguyên thể {currentPalace.element}. 
                  Sự tương hộ giữa các phụ tinh như {currentPalace.minorStars.join(', ')} mang lại bộ tài nguyên cá nhân hoàn hảo, 
                  phát tiết nghị lực mạnh mẽ giúp nâng đỡ cốt cách của thân chủ trong những thăng trầm đại vận.
                </p>
              </div>
            </div>
          </div>

          {aiInterpretation || localAiContent ? (
            <div className="glass-card rounded-2xl p-6 space-y-4 hover:translate-y-0">
              <h4 className="font-display text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-warm-amber to-warm-teal flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-warm-amber" />Đại Sư Luận Giải Tử Vi
              </h4>
              <div className="space-y-4 text-xs leading-relaxed text-white/60 max-h-[220px] overflow-y-auto pr-1">
                {aiInterpretation ? (
                  <>
                    <div><h5 className="font-bold text-white/80 mb-0.5 flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-warm-amber" /> Bản Tính & Cốt Cách:</h5><div className="p-3 bg-black/40 rounded-xl border border-white/5"><MarkdownRenderer content={aiInterpretation.personality} theme="amber" /></div></div>
                    <div><h5 className="font-bold text-white/80 mb-0.5 flex items-center gap-1"><Award className="w-3.5 h-3.5 text-warm-amber" /> Con Đường Sự Nghiệp:</h5><div className="p-3 bg-black/40 rounded-xl border border-white/5"><MarkdownRenderer content={aiInterpretation.career} theme="amber" /></div></div>
                    <div><h5 className="font-bold text-white/80 mb-0.5 flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5 text-warm-amber" /> Tài Bạch & Dư Địa Tiền Tụ:</h5><div className="p-3 bg-black/40 rounded-xl border border-white/5"><MarkdownRenderer content={aiInterpretation.wealth} theme="amber" /></div></div>
                    <div><h5 className="font-bold text-white/80 mb-0.5 flex items-center gap-1">💖 Tình Duyên & Gia Đạo:</h5><div className="p-3 bg-black/40 rounded-xl border border-white/5"><MarkdownRenderer content={aiInterpretation.love} theme="amber" /></div></div>
                  </>
                ) : localAiContent && (
                  <div><div className="p-3 bg-black/40 rounded-xl border border-white/5"><MarkdownRenderer content={localAiContent} theme="amber" /></div></div>
                )}
              </div>
            </div>
          ) : isLoadingAi ? (
            <div className="glass-card rounded-2xl p-8 flex items-center justify-center hover:translate-y-0">
              <Loader2 className="w-6 h-6 animate-spin text-warm-amber" />
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-6 text-center hover:translate-y-0">
              <p className="text-xs text-white/40 mb-4">Chưa có luận giải AI. Kích hoạt luận giải riêng cho Tử Vi ngay bây giờ.</p>
              {aiError && <p className="text-xs text-rose-400 mb-3">{aiError}</p>}
              <button type="button" onClick={handleFetchAi}
                className="inline-flex items-center gap-2 py-2.5 px-5 bg-gradient-to-r from-warm-amber to-warm-teal hover:from-warm-teal hover:to-warm-amber text-white text-xs font-bold font-display rounded-xl tracking-wide shadow-lg shadow-warm-amber/30 transition-all active:scale-95 cursor-pointer">
                <Sparkles className="w-4 h-4" /> Luận Giải Tử Vi (AI)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});


