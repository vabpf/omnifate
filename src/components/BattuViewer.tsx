import { BattuData } from '../types';
import { HelpCircle, Star, Sparkles } from 'lucide-react';

interface BattuViewerProps {
  data: BattuData;
  aiInterpretation?: {
    elementAnalysis: string;
    favourableElements: string;
    unfavourableElements: string;
    advice: string;
  };
}

const ELEMENT_LABELS: { [key: string]: { name: string; color: string; bg: string; text: string; desc: string } } = {
  Kim: { name: 'Mạnh Kim (Metal)', color: 'bg-amber-400', bg: 'bg-amber-950/20', text: 'text-amber-300', desc: 'Đại diện cho sự kiên trì, cương trực, óc phân lý tuyệt vời và sắc sảo.' },
  Mộc: { name: 'Vượng Mộc (Wood)', color: 'bg-emerald-500', bg: 'bg-emerald-950/20', text: 'text-emerald-300', desc: 'Đại diện cho tính nhân từ, tinh thần sinh sôi nảy nở vững bền.' },
  Thủy: { name: 'Nhuận Thủy (Water)', color: 'bg-cyan-500', bg: 'bg-cyan-950/20', text: 'text-cyan-300', desc: 'Đại diện cho trí tuệ cao, sự linh hoạt uốn lượn và khả năng giao thiệp.' },
  Hỏa: { name: 'Hừng Hỏa (Fire)', color: 'bg-rose-500', bg: 'bg-rose-950/20', text: 'text-rose-300', desc: 'Đại diện cho niềm đam mê rực cháy, tính bộc phát dũng cảm và hiếu khách.' },
  Thổ: { name: 'Chân Thổ (Earth)', color: 'bg-orange-500', bg: 'bg-orange-950/20', text: 'text-orange-400', desc: 'Đại diện cho lòng bao dung tín cẩn, sự điềm tĩnh kiên trì dẻo dai.' },
};

export default function BattuViewer({ data, aiInterpretation }: BattuViewerProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 4 PILLARS OF DESTINY DISPLAY PANEL */}
      <div className="glass-card rounded-2xl p-6 hover:translate-y-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-display text-base font-bold text-slate-205 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-450" />
              Lá Số Tứ Trụ Bát Tự (4 Pillars of Destiny)
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">Xác cấu trúc Thiên Can và Địa Chi bổ trợ từ thời khắc sinh.</p>
          </div>
          <span id="tooltip-battu-pill" title="Can ngày hiển thị vị chủ (Nhật Nguyên) là hạt nhân bản thể năng lượng của bạn." className="tooltip cursor-pointer">
            <HelpCircle className="w-4 h-4 text-slate-500" />
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* YEAR PILLAR */}
          <div className="bg-black/30 rounded-xl p-4 border border-white/5 text-center space-y-3 hover:border-white/15 transition duration-300">
            <span className="text-[10px] text-slate-400 font-mono">TRỤ NĂM (YEAR)</span>
            <div className="space-y-1">
              <h5 className="text-xl font-display font-bold text-amber-300 leading-none">{data.pillars.year.split(' ')[0]}</h5>
              <p className="text-sm font-mono text-slate-300 leading-none">{data.pillars.year.split(' ')[1]}</p>
            </div>
            <span className="text-[10px] text-slate-500 block">Thế hệ / Tổ tiên</span>
          </div>

          {/* MONTH PILLAR */}
          <div className="bg-black/30 rounded-xl p-4 border border-white/5 text-center space-y-3 hover:border-white/15 transition duration-300">
            <span className="text-[10px] text-slate-400 font-mono">TRỤ THÁNG (MONTH)</span>
            <div className="space-y-1">
              <h5 className="text-xl font-display font-bold text-amber-300 leading-none">{data.pillars.month.split(' ')[0]}</h5>
              <p className="text-sm font-mono text-slate-300 leading-none">{data.pillars.month.split(' ')[1]}</p>
            </div>
            <span className="text-[10px] text-slate-500 block">Cha mẹ / Xã hội</span>
          </div>

          {/* DAY PILLAR : THE DAY MASTER */}
          <div className="bg-gradient-to-b from-indigo-950/40 to-black/30 rounded-xl p-4 border-2 border-indigo-400 text-center space-y-3 relative overflow-hidden shadow-lg shadow-indigo-500/10 hover:border-indigo-300 transition duration-300">
            <div className="absolute top-0 right-0 bg-indigo-500 text-[8px] text-slate-100 font-bold px-1.5 py-0.5 rounded-bl">
              NHẬT NGUYÊN
            </div>
            <span className="text-[10px] text-indigo-300 font-mono font-bold">TRỤ NGÀY (DAY)</span>
            <div className="space-y-1">
              <h5 className="text-xl font-display font-bold text-indigo-300 leading-none">{data.pillars.day.split(' ')[0]}</h5>
              <p className="text-sm font-mono text-slate-300 leading-none">{data.pillars.day.split(' ')[1]}</p>
            </div>
            <span className="text-[10px] text-indigo-300 font-bold block">Chủ thể / Thân mệnh ({data.dayMaster})</span>
          </div>

          {/* HOUR PILLAR */}
          <div className="bg-black/30 rounded-xl p-4 border border-white/5 text-center space-y-3 hover:border-white/15 transition duration-300">
            <span className="text-[10px] text-slate-400 font-mono">TRỤ GIỜ (HOUR)</span>
            <div className="space-y-1">
              <h5 className="text-xl font-display font-bold text-amber-300 leading-none">{data.pillars.hour.split(' ')[0]}</h5>
              <p className="text-sm font-mono text-slate-300 leading-none">{data.pillars.hour.split(' ')[1]}</p>
            </div>
            <span className="text-[10px] text-slate-500 block">Con cái / Hậu bối</span>
          </div>
        </div>
      </div>

      {/* ELEMENT BALANCE & EXPLANATION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* FIVE ELEMENTS PERCENTAGES GRAPHICS */}
        <div className="glass-card rounded-2xl p-6 hover:translate-y-0">
          <h4 className="font-display text-base font-bold text-slate-205 mb-5">Biểu Đồ Sinh Khí Ngũ Hành (Energy Balance)</h4>
          
          <div className="space-y-4">
            {Object.entries(data.elementsPercentage).map(([element, percentage]) => {
              const el = ELEMENT_LABELS[element];
              return (
                <div key={element} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-bold ${el.text}`}>{el.name}</span>
                    <span className="font-mono font-bold text-slate-300">{percentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/40 rounded-full border border-white/5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${el.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-450">{el.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* DETAILS OR AI OPINIONS */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between hover:translate-y-0">
          <div>
            <h4 className="font-display text-base font-bold text-slate-200 mb-3 uppercase">Ứng xử Ngũ Hành cát hung</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dựa vào Bát Tự, Nhật chủ mang thiên can <span className="text-indigo-450 font-bold">{data.dayMaster}</span> liên kết hài hòa với các ngũ hành xung quanh. Việc thấu hiểu sự thừa thiếu trong ngũ hành bản thể cho phép thân chủ điều phối môi trường sống, sự nghiệp, thậm chí là chọn lựa lương duyên tốt lành.
            </p>
          </div>

          {/* AI INTERPRETATION CARD (IF POPULATED) */}
          {aiInterpretation ? (
            <div className="mt-6 pt-4 border-t border-white/10 space-y-4">
              <h5 className="font-display text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-purple-400" />
                Đại Sư Luận Giải Bát Tự
              </h5>

              <div className="space-y-4 text-xs leading-relaxed text-slate-300 max-h-[170px] overflow-y-auto pr-1">
                <div>
                  <h6 className="font-bold text-slate-200 mb-0.5">Phân Tích Thừa Thiếu Ngũ Hành:</h6>
                  <p className="p-3 bg-black/40 rounded-xl border border-white/5">{aiInterpretation.elementAnalysis}</p>
                </div>
                <div>
                  <h6 className="font-bold text-slate-200 mb-0.5">Dụng Thần / Hỷ Thần trợ giúp (Vũ khí cát tinh):</h6>
                  <p className="p-3 bg-black/40 rounded-xl border border-white/5 text-emerald-300">{aiInterpretation.favourableElements}</p>
                </div>
                <div>
                  <h6 className="font-bold text-slate-200 mb-0.5">Kỵ Thần tránh né (Thế lực xung sát):</h6>
                  <p className="p-3 bg-black/40 rounded-xl border border-white/5 text-rose-300">{aiInterpretation.unfavourableElements}</p>
                </div>
                <div>
                  <h6 className="font-bold text-slate-200 mb-0.5">Phương Pháp Cải Vận Trực Tiếp:</h6>
                  <p className="p-3 bg-black/40 rounded-xl border border-white/5">{aiInterpretation.advice}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 bg-black/20 p-4 rounded-xl border border-white/5 text-xs text-slate-400 italic text-center">
              Vận hành tính năng "Xem kết quả đại sư" kích hoạt gói tinh vân AI để nhận phân tích Dụng Thần cải vận đặc biệt.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
