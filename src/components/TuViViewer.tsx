import { useState } from 'react';
import { TuViPalace } from '../types';
import { Eye, Award, ShieldAlert, Sparkles } from 'lucide-react';

interface TuViViewerProps {
  palaces: TuViPalace[];
  userName: string;
  gender: string;
  dob: string;
  time: string;
  bornPlace: string;
  aiInterpretation?: {
    personality: string;
    career: string;
    wealth: string;
    love: string;
  };
}

// Map 2D coordinates (0-3 for Row, 0-3 for Col) to the 12 Branch Indices (Tý=0 ... Hợi=11)
const COORDINATE_MAP: { [key: string]: number } = {
  '0,0': 5,  // Tỵ
  '0,1': 6,  // Ngọ
  '0,2': 7,  // Mùi
  '0,3': 8,  // Thân
  '1,3': 9,  // Dậu
  '2,3': 10, // Tuất
  '3,3': 11, // Hợi
  '3,2': 0,  // Tý
  '3,1': 1,  // Sửu
  '3,0': 2,  // Dần
  '2,0': 3,  // Mão
  '1,0': 4,  // Thìn
};

export default function TuViViewer({
  palaces,
  userName,
  gender,
  dob,
  time,
  bornPlace,
  aiInterpretation,
}: TuViViewerProps) {
  const [activeCell, setActiveCell] = useState<TuViPalace | null>(null);

  // Default to Mệnh palace when opening
  const defaultPalace = palaces.find(p => p.name.includes('Mệnh')) || palaces[0];
  const currentPalace = activeCell || defaultPalace;

  const elementColors: { [key: string]: string } = {
    Kim: 'text-amber-300 border-amber-800/60 bg-amber-950/5',
    Mộc: 'text-emerald-300 border-emerald-800/60 bg-emerald-950/5',
    Thủy: 'text-cyan-300 border-cyan-800/60 bg-cyan-950/5',
    Hỏa: 'text-rose-300 border-rose-800/60 bg-rose-950/5',
    Thổ: 'text-orange-350 border-orange-800/60 bg-orange-950/5',
  };

  // Convert Gregorian to a readable vietnamese format
  const formattedGregorian = dob.split('-').reverse().join('/');

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 4X4 AUTHENTIC VIETNAMESE BOARD AND DETAIL CARD SIDE BY SIDE */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* THE 4X4 BOARD GRID (7 cols on Desktop for balance) */}
        <div className="xl:col-span-7 glass-card p-3 rounded-2xl relative overflow-hidden hover:translate-y-0">
          <div className="absolute inset-0 bg-radial-gradient-to-br from-indigo-950/10 to-transparent pointer-events-none" />
          
          <div className="grid grid-cols-4 grid-rows-4 gap-1.5 aspect-square w-full">
            {Array.from({ length: 4 }).map((_, r) => (
              <div key={r} className="contents">
                {Array.from({ length: 4 }).map((_, c) => {
                  const coordKey = `${r},${c}`;
                  const isCenter = r >= 1 && r <= 2 && c >= 1 && c <= 2;

                  if (isCenter) {
                    // Merged centerpiece block at the actual center (handled by single absolute block, so return empty placeholders to avoid structure breaking except top-left center cell which houses the contents span 2x2)
                    if (r === 1 && c === 1) {
                      return (
                        <div
                          key={coordKey}
                          className="col-span-2 row-span-2 bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col justify-between text-center select-none shadow-inner"
                        >
                          <div className="space-y-1">
                            <span className="text-[9px] text-amber-400 font-mono tracking-widest block font-bold">LÁ SỐ TỬ VI</span>
                            <h4 className="font-display text-sm font-bold text-slate-150 truncate">{userName}</h4>
                            <div className="flex justify-center gap-1.5 mt-1.5">
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold font-mono ${gender === 'Nam' ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-900/40' : 'bg-pink-950/60 text-pink-300 border border-pink-900/40'}`}>
                                {gender}
                              </span>
                              <span className="text-[9px] glass-pill text-slate-300 px-1.5 py-0.5 rounded font-mono">
                                2026 Bính Ngọ
                              </span>
                            </div>
                          </div>

                          <div className="text-[9px] text-slate-400 space-y-0.5 font-mono">
                            <div>📅 {formattedGregorian}</div>
                            <div>🕒 Đứng giờ: {time}</div>
                            <div className="truncate">📍 {bornPlace}</div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }

                  // Retrieve standard palace
                  const branchIdx = COORDINATE_MAP[coordKey];
                  const palace = palaces.find((p) => p.index === branchIdx);
                  if (!palace) return <div key={coordKey} className="bg-black/20 border border-white/5 rounded-xl" />;

                  const isCellSelected = currentPalace.index === palace.index;

                  return (
                    <button
                      key={coordKey}
                      id={`tuvi-palace-cell-${palace.index}`}
                      type="button"
                      onClick={() => setActiveCell(palace)}
                      className={`relative flex flex-col justify-between p-2 rounded-xl border text-left transition-all cursor-pointer select-none group ${
                        isCellSelected
                          ? 'border-indigo-400 bg-indigo-950/40 shadow-md shadow-indigo-500/15 text-slate-100'
                          : 'border-white/5 hover:border-white/15 bg-white/2 hover:bg-white/5'
                      }`}
                    >
                      {/* Palace Name and Branch Name */}
                      <div className="flex items-start justify-between w-full border-b border-white/5 pb-1">
                        <span className="text-[9px] font-bold text-slate-100 font-display line-clamp-1">
                          {palace.name.split(' ')[0]}
                        </span>
                        <span className="text-[8px] font-mono text-slate-400">
                          {palace.branch}
                        </span>
                      </div>

                      {/* Major Stars (Chính tinh) */}
                      <div className="flex-1 py-1 space-y-0.5">
                        {palace.majorStars.map((ms, msIdx) => (
                          <div key={msIdx} className="text-[9px] font-bold text-amber-400/90 flex items-center gap-0.5">
                            <span className="text-[8px]">★</span>
                            <span className="line-clamp-1">{ms}</span>
                          </div>
                        ))}
                      </div>

                      {/* Minor Stars or Elements bottom list */}
                      <div className="flex items-center justify-between w-full text-[8px] border-t border-white/5 pt-0.5 mt-0.5 text-slate-400 font-mono">
                        <span className="truncate max-w-[40px]">{palace.minorStars[0]}</span>
                        <span className={`${palace.element === 'Kim' ? 'text-amber-300' : palace.element === 'Mộc' ? 'text-emerald-300' : palace.element === 'Thủy' ? 'text-cyan-300' : palace.element === 'Hỏa' ? 'text-rose-300' : 'text-orange-400'}`}>
                          {palace.element}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS OF SELECTED PALACE CELL (5 cols on Desktop) */}
        <div className="xl:col-span-5 flex flex-col justify-between space-y-6">
          <div className="glass-card rounded-2xl p-6 space-y-4 hover:translate-y-0">
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] text-indigo-400 font-mono font-bold tracking-widest block uppercase">CHI TIẾT CUNG PHÂN</span>
                <h4 className="font-display text-lg font-bold text-slate-100 flex items-center gap-2 mt-1">
                  Cung {currentPalace.name} ({currentPalace.branch})
                </h4>
              </div>
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-mono font-bold border ${elementColors[currentPalace.element]}`}>
                Mệnh: {currentPalace.element}
              </span>
            </div>

            <div className="space-y-4.5">
              {/* STAR LISTS */}
              <div>
                <span className="text-[10px] text-slate-500 font-mono block uppercase mb-1.5">Mạng lưới Sao chiếu</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentPalace.majorStars.map((star, sIdx) => (
                    <span key={sIdx} className="text-[10px] bg-amber-500/10 border border-amber-800/30 text-amber-300 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Award className="w-3 h-3" /> {star} (Chính tinh)
                    </span>
                  ))}
                  {currentPalace.minorStars.map((star, sIdx) => (
                    <span key={sIdx} className="text-[10px] bg-white/5 border border-white/10 text-slate-300 px-2 py-0.5 rounded-md">
                      {star}
                    </span>
                  ))}
                </div>
              </div>

              {/* DEFAULT DECORATIVE DIALOG ANALYSIS */}
              <div>
                <span className="text-[10px] text-slate-500 font-mono block uppercase mb-1.5">Luận giải bối cảnh</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cung {currentPalace.name} tọa lạc tại {currentPalace.branch} cấu thành bởi nguyên thể {currentPalace.element}. 
                  Sự tương hộ giữa các phụ tinh như {currentPalace.minorStars.join(', ')} mang lại bộ tài nguyên cá nhân hoàn hảo, 
                  phát tiết nghị lực mạnh mẽ giúp nâng đỡ cốt cách của thân chủ trong những thăng trầm đại vận.
                </p>
              </div>
            </div>
          </div>

          {/* MASTER AI INTERPRETATION CARD (IF EXISTS) */}
          {aiInterpretation && (
            <div className="glass-card rounded-2xl p-6 space-y-4 hover:translate-y-0">
              <h4 className="font-display text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Đại Sư Luận Giải Tử Vi
              </h4>

              <div className="space-y-4 text-xs leading-relaxed text-slate-300 max-h-[220px] overflow-y-auto pr-1">
                <div>
                  <h5 className="font-bold text-slate-200 mb-0.5 flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-indigo-400" /> Bản Tính & Cốt Cách:</h5>
                  <p className="p-3 bg-black/40 rounded-xl border border-white/5">{aiInterpretation.personality}</p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-200 mb-0.5 flex items-center gap-1"><Award className="w-3.5 h-3.5 text-indigo-400" /> Con Đường Sự Nghiệp:</h5>
                  <p className="p-3 bg-black/40 rounded-xl border border-white/5">{aiInterpretation.career}</p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-200 mb-0.5 flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5 text-indigo-400" /> Tài Bạch & Dư Địa Tiền Tụ:</h5>
                  <p className="p-3 bg-black/40 rounded-xl border border-white/5">{aiInterpretation.wealth}</p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-200 mb-0.5 flex items-center gap-1">💖 Tình Duyên & Gia Đạo:</h5>
                  <p className="p-3 bg-black/40 rounded-xl border border-white/5">{aiInterpretation.love}</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
